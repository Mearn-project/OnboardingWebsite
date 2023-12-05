const s3 = require('../utils/aws');

const downloadDocument = async (req, res) => {
	const { filename } = req.params;

	const params = {
		Bucket: 'onbording',
		Key: filename
	};

	s3.getObject(params, (err, data) => {
		if (err) {
			console.error('Error downloading file:', err);
			res.status(500).send('Error downloading file.');
		} else {
			const fileStream = fs.createReadStream(data.Body);
			res.setHeader('Content-disposition', 'attachment; filename=' + filename);
			res.setHeader('Content-type', data.ContentType);
			fileStream.pipe(res);
		}
	});

}


function previewDocument(req, res) {
	const filename = req.params.filename;

	const params = {
		Bucket: 'onbording',
		Key: filename
	};

	s3.getSignedUrl('getObject', params, (err, url) => {
		if (err) {
			console.error('Error generating preview URL:', err);
			res.status(500).send('Error generating preview URL.');
		} else {
			res.send(url);
		}
	});
}

module.exports = { downloadDocument, previewDocument };