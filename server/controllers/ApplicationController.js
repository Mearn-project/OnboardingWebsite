// const { application } = require('express');
const path = require('path');
const fs = require('fs');
const User = require('../models/User');
const Application = require('../models/Application');
const Visa = require('../models/Visa');
const EmergencyContact = require('../models/EmergencyContact');
const { decodeToken } = require('../utils/generateToken')

const s3 = require('../utils/aws');

const submitApplication = async (req, res) => {
    try {
        const { body, files } = req;

		let userId;


        if (req.headers.cookie) {
            const cookie = req.headers.cookie;
            const token = cookie.slice(6);
            userId = decodeToken(token);
        }

		const user = await User.findById(userId)
		// console.log(req.headers)

		if (!user) {
			res.status(404).json({ message: 'User not found' });
		}

		const addressData = JSON.parse(body.address);
		const emergencyContacts = JSON.parse(body.emergencyContacts);
		const carInfo = JSON.parse(body.carInformation);

		// console.log(Object.values(files))
		const createdEmergencyContacts = [];


		for (const contactData of emergencyContacts) {
			const emergencyContact = new EmergencyContact(contactData);
			const savedEmergencyContact = await emergencyContact.save();
			createdEmergencyContacts.push(savedEmergencyContact._id);
		}

		let applicationDetails = {
			firstName: body.firstName,
			lastName: body.lastName,
			middleName: body.middleName,
			preferredName: body.preferredName,
			profilePictureUrl: '',

			address: {
				buildingApt: addressData.buildingApt,
				street: addressData.street,
				city: addressData.city,
				state: addressData.state,
				zip: addressData.zip,
			},
			cellPhone: body.cellPhone,
			workPhone: body.workPhone,
			carInformation: {
				make: carInfo.make || '',
				model: carInfo.model || '',
				color: carInfo.color || '',
			},
			email: body.email,
			ssn: body.ssn,
			dateOfBirth: body.dateOfBirth,
			gender: body.gender || 'I do not wish to answer',
			isUSCitizen: body.isUSCitizen === 'true',
			workAuthorization: body.workAuthorization || '',
			optReceiptUrl: '',
			optReceiptUrlPreview: '',
			visaTitle: body.visaTitle || '',
			startDate: body.startDate || '',
			endDate: body.endDate || '',
			hasDriverLicense: body.hasDriverLicense === 'true',
			licenseNumber: body.licenseNumber || '',
			licenseExpirationDate: body.licenseExpirationDate || '',
			licenseCopyUrl: '',
			licenseCopyUrlPreview: '',
			reference: JSON.parse(body.reference || '{}'),
			emergencyContacts: createdEmergencyContacts
		};

		let visaData = {
			optReceipt: {
				feedback: '',
				url: '',
				previewUrl: ''
			},
			optEAD: {
				feedback: '',
				url: '',
				previewUrl: ''
			},
			i983: {
				feedback: '',
				filledFormUrl: '',
				previewUrl: ''
			},
			i20: {
				feedback: '',
				url: '',
				previewUrl: ''
			}
		}

		// console.log(files)

		// await Promise.all(
		const uploadPromises = Object.keys(files).map(async (key) => {
			if (Array.isArray(files[key])) {
				const file = files[key][0];
				// console.log(file)

				const fileName = file.fieldname;
				if (fileName === 'optReceiptUrl') {

					const params = {
						Bucket: 'revsawsbucket',
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

								visaData['optReceipt'].url = data.Location;
								visaData['optReceipt'].status = 'Pending';

								const previewParams = {
									Bucket: 'revsawsbucket',
									Key: `${file.originalname}`,
									ResponseContentType: 'application/pdf',
									ResponseContentDisposition: 'inline',
									Expires: 3600,
								};

								const previewUrl = s3.getSignedUrl('getObject', previewParams);
								applicationDetails[`optReceiptUrlPreview`] = previewUrl;
								visaData['optReceipt'].previewUrl = previewUrl;
								resolve();
							}
						});
					})
				} else {
					const fileData = fs.readFileSync(file.path);
					const params = {
						Bucket: 'revsawsbucket',
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
										Bucket: 'revsawsbucket',
										Key: `${file.originalname}`,
										ResponseContentType: 'image/jpeg',
										ResponseContentDisposition: 'inline',
										Expires: 3600
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
		// try {
		await Promise.all(uploadPromises);
		// console.log(applicationDetails)
		const application = new Application(applicationDetails);
		const savedApplication = await application.save();

		const visa = new Visa(visaData);
		const savedVisa = await visa.save();

		user.application = savedApplication._id;
		user.applicationStatus = "Pending";
		user.visa = savedVisa._id;
		if (applicationDetails.workAuthorization !== 'F1(CPT/OPT)') {
			user.visaStatus = 'US Citizen';
		}
		await user.save();

		res.status(201).json({ message: 'Application submitted successfully' });

    } catch (error) {
        console.error('Error submitting application:', error);
        res.status(500).json({ message: 'Failed to submit application' });
    }
}

const getApplicationDetails = async (req, res) => {
    try {

        const {applicationId} = req.params;
        const application = await Application.findById(applicationId).populate('emergencyContacts');

        if (!application) {
            return res.status(404).json({ message: 'Application not found' });
        }
        res.json({ application });

    } catch (error) {
        console.error('Error retrieving application details:', error);
        res.status(500).json({ message: 'Failed to retrieve application details' });
    }
}

module.exports = { submitApplication, getApplicationDetails };