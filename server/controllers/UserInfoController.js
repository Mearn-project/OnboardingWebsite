const User = require('../models/User');
const EmergencyContact = require('../models/EmergencyContact');
const { decodeToken } = require('../utils/generateToken')

const getUserInfo = async (req, res) => {
    try {
        let userId;

        if (req.headers.cookie) {
            const cookie = req.headers.cookie;
            const token = cookie.slice(6);
            userId = decodeToken(token);
        }

        console.log(userId)
        
        const user = await User.findById(userId).populate({
            path: 'application',
            populate: { path: 'emergencyContacts' }
        }).populate('visa');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error'});
    }
}

const updateUserInfo = async (req, res) => {
    try {
        const { body, files } = req;
        
        let userId;

        if (req.headers.cookie) {
            const cookie = req.headers.cookie;
            const token = cookie.slice(6);
            userId = decodeToken(token);
        }

        const user = await User.findById(userId).populate({
            path: 'application',
            populate: { path: 'emergencyContacts' }
        });
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
        const application = user.application;

        let addressData;
        let emergencyContacts;
        let carInfo;
        if (req.body.address) {
            addressData = JSON.parse(body.address);
        }
        if (req.body.emergencyContacts) {
            emergencyContacts = JSON.parse(body.emergencyContacts);
        }
        if (req.body.carInfo) {
            carInfo = JSON.parse(body.carInformation);
        }

        const updatedEmergencyContacts = [];

        if (emergencyContacts.length > 0) {
            application.emergencyContacts = [];
            for (const contactData of emergencyContacts) {
                const emergencyContact = new EmergencyContact(contactData);
                const savedEmergencyContact = await emergencyContact.save();
                updatedEmergencyContacts.push(savedEmergencyContact._id);
            }
        }

        application.firstName = body.firstName || application.firstName;
        application.lastName = body.lastName || application.lastName;
        application.middleName = body.middleName || application.middleName;
        application.preferredName = body.preferredName || application.preferredName;
        application.profilePictureUrl = application.profilePictureUrl || '';

        application.address = {
            buildingApt: addressData.buildingApt || application.address.buildingApt,
            street: addressData.street || application.address.street,
            city: addressData.city || application.address.city,
            state: addressData.state || application.address.state,
            zip: addressData.zip || application.address.zip,
        };
        application.cellPhone = body.cellPhone || application.cellPhone;
        application.workPhone = body.workPhone || application.workPhone;
        application.carInformation = {
            make: carInfo.make || application.carInformation.make,
            model: carInfo.model || application.carInformation.model,
            color: carInfo.color || application.carInformation.color,
        };
        application.email = body.email || application.email;
        application.ssn = body.ssn || application.ssn;
        application.dateOfBirth = body.dateOfBirth || application.dateOfBirth;
        application.gender = body.gender || application.gender;
        application.workAuthorization = body.workAuthorization || application.workAuthorization;
        application.optReceiptUrl = application.optReceiptUrl || '';
        application.optReceiptUrlPreview = application.optReceiptUrlPreview || '';
        application.visaTitle = body.visaTitle || application.visaTitle;
        application.startDate = body.startDate || application.startDate;
        application.endDate = body.endDate || application.endDate;
        application.licenseNumber = body.licenseNumber || application.licenseNumber;
        application.licenseExpirationDate = body.licenseExpirationDate || application.licenseExpirationDate;
        application.licenseCopyUrl = application.licenseCopyUrl || '';
        application.licenseCopyUrlPreview = application.licenseCopyUrlPreview || '';
        application.reference = JSON.parse(body.reference) || application.reference;
        emergencyContacts = updatedEmergencyContacts;

        if (body.hasOwnProperty('isUSCitizen')) {
            applicationDetails.isUSCitizen = body.isUSCitizen === 'true';
        } else {
            applicationDetails.isUSCitizen = application.isUSCitizen;
        }

        if (body.hasOwnProperty('hasDriverLicense')) {
            applicationDetails.hasDriverLicense = body.hasDriverLicense === 'true';
        } else {
            applicationDetails.hasDriverLicense = application.hasDriverLicense;
        }
        

        const uploadPromises = Object.keys(files).map(async (key) => {
			if (Array.isArray(files[key])) {
				const file = files[key][0];
				// console.log(file)
				const fileName = file.fieldname;
				if (fileName === 'optReceiptUrl') {

					const params = {
						Bucket: 'my-onboarding-project',
						Key: `${file.originalname}`,
						Body: fs.createReadStream(path.normalize(file.path)),
						ACL: 'public-read'
					};

					return new Promise((resolve, reject) => {
						s3.upload(params, async (err, data) => {
							if (err) {
								// console.log(params);
								console.error('Error uploading file:', err);
								reject(err);
							} else {
								console.log('File uploaded successfully:', data.Location);
	
								applicationDetails[`${fileName}`] = data.Location;
	
								const previewParams = {
									Bucket: 'my-onboarding-project',
									Key: `${file.originalname}`,
									ResponseContentType: 'application/pdf',
									ResponseContentDisposition: 'inline'
								};
						
								const previewUrl = s3.getSignedUrl('getObject', previewParams);
								applicationDetails[`optReceiptUrlPreview`] = previewUrl;
								resolve();
							}
						});
					})  
				} else {
					const fileData = fs.readFileSync(file.path);
					const params = {
						Bucket: 'my-onboarding-project',
						Key: `${file.originalname}`,
						Body: fileData,
						ContentType: file.mimetype,
						ACL: 'public-read'
					};

					return new Promise((resolve, reject) => {
						s3.upload(params, async (err, data) => {
							if (err) {
								// console.log(params);
								console.error('Error uploading file:', err);
								reject(err);
							} else {
								console.log('File uploaded successfully:', data.Location);
	
								applicationDetails[`${fileName}`] = data.Location;
								if (fileName === 'licenseCopyUrl') {
									const previewParams = {
										Bucket: 'my-onboarding-project',
										Key: `${file.originalname}`,
										ResponseContentType: 'image/jpeg',
										ResponseContentDisposition: 'inline'
									};
							
									const previewUrl = s3.getSignedUrl('getObject', previewParams);
									applicationDetails[`${fileName}Preview`] = previewUrl;
									
								}
								resolve();
							//   console.log(applicationDetails);
					
							}
						});
					}) 
				}

			}
		})
		// );
		try {
			await Promise.all(uploadPromises);
			// console.log(applicationDetails)
			// await application.save();
            await user.save();
			// console.log(savedApplication.optReceiptUrl);
			res.status(201).json({ message: 'Personal information updated successfully' });
		} catch (error) {
			console.error('Error updating personal information:', error);
			res.status(500).json({ message: 'Failed to update personal information' });
		}
        
        // res.json({ message: 'Personal information updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = { getUserInfo, updateUserInfo }