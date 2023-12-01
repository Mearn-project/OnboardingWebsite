// const { application } = require('express');
// const path = require('path');
const User = require('../models/User');
const Application = require('../models/Application');

const s3 = require('../utils/aws');

const submitApplication = async (req, res) => {
    try {
        const { body, files } = req;
        const uploadedFiles = await Promise.all(
            files.map(async (file) => {
                const params = {
                    Bucket: 'onbording',
                    Key: file.orginalname,
                    Body: file.buffer,
                    ACL: 'public-read'
                };

                const uploadedFile = await s3.upload(params).promise();
                console.log('File uploaded to S3:', uploadedFile.Location);
                return uploadedFile;
            })
        );

        const applicationDetails = {
            status: body.firstName,
            firstName: body.lastName,
            middleName: body.middleName || '',
            preferredName: body.preferredName || '',
            profilePicture: uploadedFiles.find((file) => file.orginalname === 'profilePicture')?.Location || '',
            currentAddress: body.currentAddress,
            cellPhone: body.cellPhone,
            workPhone: body.workPhone || '',
            carInformation: body.carInformation || {'make': '', 'model': '', 'color': ''},
            email: body.email,
            ssn: body.ssn,
            dateOfBirth: body.dateOfBirth,
            gender: body.gender || 'I do not wish to answer',
            isUSCitizen: body.isUSCitizen,
            workAuthorization: body.workAuthorization,
            workAuthorizationUrl: uploadedFiles.find((file) => file.orginalname === 'workAuthorization')?.Location || '',
            optReceiptUrl:uploadedFiles.find((file) => file.orginalname === 'optReceipt')?.location || '',
            visaTitle: body.visaTitle || '',
            startDate: new Date(body.startDate) || Date.now,
            endDate: new Date(body.endDate) || Date.now,
            hasDriverLicense: body.hasDriverLicense,
            licenseNumber: body.licenseNumber,
            licenseExpirationDate: body.licenseExpirationDate,
            licenseCopyUrl:uploadedFiles.find((file) => file.orginalname === 'licenseCopy')?.location || '',
            reference: body.reference,
            emergencyContacts: body.emergencyContacts || []
        }

        let userId;
        if (req.headers.cookie) {
            const cookie = req.headers.cookie;
            const token = cookie.slice(6);
            userId = decodeToken(token);
        }
        const user = await User.findById(userId).populate('application');

        if (!user) {
            res.status(404).json({ message: 'User not found' });
        }

        const application = new Application(applicationDetails);
        const savedApplication = await application.save();
        user.application = savedApplication._id;
        user.applicationStatus = "Pending";
        await user.save();
        const applicationId = savedApplication._id;

        res.status(201).json(user.application);

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