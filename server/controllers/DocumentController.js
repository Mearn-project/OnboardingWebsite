const s3 = require('../utils/aws');
// const PDFJS = require('pdfjs-dist');
// const { createCanvas } = require('canvas')

const downloadDocument = async (req, res) => {
    const { filename } = req.params;

    try {
        document = getDocumentFromS3(filename);

        if(!document) {
            console.error('Error retrieving file from S3:', error);
            return res.status(500).json({ message: 'Failed to retrieve file fromS3'});
        }

        res.attachmen(filename);
        res.send(document)

    } catch (error) {
        console.error('Error retrieving file from S3:', error);
            return res.status(500).json({ message: 'Failed to retrieve file fromS3'});
    }
    
}


const previewDocument = async (req, res) => {
  try {
    const { documentKey } = req.params;

    const document = await getDocumentFromS3(documentKey);

    if (!document) {
      return res.status(404).json({ message: 'Document not found' });
    }

    const textContent = await extractTextFromPDF(document);

    const preview = generatePreview(textContent);

    res.json({ preview });
  } catch (error) {
    console.error('Error generating document preview:', error);
    res.status(500).json({ message: 'Failed to generate document preview' });
  }
};


const getDocumentFromS3 = async (filename) => {
  try {
    const params = {
      Bucket: 'onbording',
      Key: filename
    };
    const response = await s3.getObject(params).promise();

    return response.Body;
  } catch (error) {
    console.error('Error retrieving document from S3:', error);
    return null;
  }
};


// const extractTextFromPDF = async (pdfDocument) => {
//   try {

//     const pdf = await PDFJS.getDocument(pdfDocument).promise;

//     const page = await pdf.getPage(1);
//     const textContent = await page.getTextContent();
//     const pageText = textContent.items.map((item) => item.str).join(' ');

//     return pageText;
//   } catch (error) {
//     console.error('Error extracting text content from PDF:', error);
//     return null;
//   }
// };


// const generatePreview = async (textContent) => {

//     const pdf = await PDFJS.getDocument({ data: textContent }).promise;

//     const page = await pdf.getPage(1);
//     const viewport = page.getViewport({ scale: 1.0 });
//     const canvas = createCanvas(viewport.width, viewport.height);
//     const context = canvas.getContext('2d');
//     await page.render({ canvasContext: context, viewport }).promise;

//     const imageDataUrl = canvas.toDataURL();
  
//     return imageDataUrl;
//   };

module.exports = { downloadDocument, previewDocument };