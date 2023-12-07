// const { application } = require('express');
const path = require('path');
const fs = require('fs');
const User = require('../models/User');
const Application = require('../models/Application');
const Visa = require('../models/Visa');
const EmergencyContact = require('../models/EmergencyContact');

const s3 = require('../utils/aws');

const submitApplication = async (req, res) => {
    try {
        const { body, files } = req;

		// console.log(files)

		const addressData = JSON.parse(body.address);
		const emergencyContacts = JSON.parse(body.emergencyContacts);

		// console.log(Object.values(files))
		const createdEmergencyContacts = [];


		for (const contactData of emergencyContacts) {
			const emergencyContact = new EmergencyContact(contactData);
			const savedEmergencyContact = await emergencyContact.save();
			createdEmergencyContacts.push(savedEmergencyContact._id);
		}

		const applicationDetails = {
			firstName: body.firstName,
			lastName: body.lastName,
			middleName: body.middleName,
			preferredName: body.preferredName,
			profilePicture: files.profilePicture ? files.profilePicture[0] : '',

			address: {
			buildingApt: addressData.buildingApt,
			street: addressData.street,
			city: addressData.city,
			state: addressData.state,
			zip: addressData.zip,
			},
			cellPhone: body.cellPhone,
			workPhone: body.workPhone,
			carInformation: JSON.parse(body.carInformation || '{}'),
			email: body.email,
			ssn: body.ssn,
			dateOfBirth: body.dateOfBirth,
			gender: body.gender || 'I do not wish to answer',
			isUSCitizen: body.isUSCitizen === 'true',
			workAuthorization: body.workAuthorization || '',
			optReceipt: files.optReceipt ? files.optReceipt[0] : '',
			visaTitle: body.visaTitle || '',
			startDate: body.startDate || '',
			endDate: body.endDate || '',
			hasDriverLicense: body.hasDriverLicense === 'true',
			licenseNumber: body.licenseNumber || '',
			licenseExpirationDate: body.licenseExpirationDate || '',
			licenseCopy: files.licenseCopy ? files.licenseCopy[0] : '',
			reference: JSON.parse(body.reference || '{}'),
			emergencyContacts: createdEmergencyContacts
		};
		

        const uploadedFiles = await Promise.all(
            Object.keys(files).map(async (key) => {
				if (Array.isArray(files[key])) {
				  const file = files[key][0];
				//   console.log(file)

				  const params = {
					Bucket: 'my-onboarding-project',
					Key: `${file.originalname}`,
					Body: fs.createReadStream(path.normalize(file.path)),
					ACL: 'public-read'
				  };
			
				  const uploadedFile = s3.upload(params, (err, data) => {
					if (err) {
					  console.log(params);
					  console.error('Error uploading file:', err);
					  res.status(500).send('Error uploading file.');
					} else {
					  console.log('File uploaded successfully:', data.Location);
					  res.json({ fileUrl: data.Location });
					}
				  });
			
				  return uploadedFile;
				}
			  })
        );

        // let userId;
        // if (req.headers.cookie) {
        //     const cookie = req.headers.cookie;
        //     const token = cookie.slice(6);
        //     userId = decodeToken(token);
        // }
        // const user = await User.findById(userId);

        // if (!user) {
        //     res.status(404).json({ message: 'User not found' });
        // }

        // const application = new Application(applicationDetails);
        // const savedApplication = await application.save();

        // const visa = new Visa({})
        // const savedVisa = await visa.save();

        // user.application = savedApplication._id;
        // user.applicationStatus = "Pending";
        // user.visa = savedVisa._id;
        // await user.save();
        // // const applicationId = savedApplication._id;

        // res.status(201).json(user.application);

    } catch (error) {
        console.error('Error submitting application:', error);
        res.status(500).json({ message: 'Failed to submit application' });
    }
}

const getApplicationDetails = async (req, res) => {
    try {

        const {applicationId} = req.params;
        const application = await Application.findById(applicationId);

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