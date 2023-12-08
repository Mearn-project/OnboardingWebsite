const bcrypt = require('bcrypt');
const path = require('path');
const nodemailer = require('nodemailer');
const User = require('../models/User');
const {generateToken, generateRegisterToken, decodeRegisterToken} = require('../utils/generateToken');

require("dotenv").config({path: path.join(__dirname, '../../.env')});

const EMAIL_ADD = process.env.EMAIL_ADD;
const EMAIL_PWD =  process.env.EMAIL_PWD;


const login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({username: username });
        if (!user) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        const token = generateToken(user._id);
        res.cookie('token', token, { httpOnly: true, maxAge: 3600000 });

        return res.status(200).json({
            token: token,
            isHR: user.isHR
        });
    } catch (error) {
        console.error('Failed to login:', error);
        return res.status(500).json({ message: error.message });
    }
};

const sendEmail = async (req, res) => {
    try {
        const { email } = req.body;
        const token = generateRegisterToken(email);

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: EMAIL_ADD,
                pass: EMAIL_PWD
            }
        });

        console.log(__dirname)

        const mailOptions = {
            from: EMAIL_ADD,
            to: email,
            subject: 'Registration Link',
            html: `
            <p>Hello,</p>
            <p>Click the following link to register your account: </p>
            <a href="http://localhost:3000/api/user/register/${token}">Register your account</a>
            `,
        };

        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                console.error('Error sending registration email:', err);
                return res.status(500).json({ message: 'Failed to send registration email' });
            } else {
                console.log('Registration email sent:', info.response);
                return res.status(201).json({ message: 'User registered successfully' });
            }
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Failed to send registration email' });
    }
}

const register = async (req, res) => {
    const { username, email, password, confirmPwd} = req.body;

    try {
        const existingUsername = await User.findOne({username});
        const existingEmail = await User.findOne({email});
        if (existingUsername || existingEmail) {
            return res.status(409).json({ message: 'User already exists'});
        }

        if (password !== confirmPwd) {
            return res.status(401).json({ message: 'Passwords are not same'});
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({
            username,
            email,
            password: hashedPassword
        });

        await user.save()

        return res.status(201).json({ message: 'User registered successfully' });
    } catch(error) {
        console.error('Failed to register:', error);
        return res.status(500).json({ message: error.message });
    }

};

const verifyRegistrationToken = async (req, res, next) => {
	const { token } = req.params;

	try {
		const decodedToken = decodeRegisterToken(token);
		if (!decodedToken) {
			return res.status(400).json({ message: 'Invalid registration token' });
		}

		if (decodedToken.exp < Date.now() / 1000) {
			return res.status(400).json({ message: 'Registration token has expired' });
		}

		req.tokenData = decodedToken;
		next();
	} catch (error) {
		console.error('Failed to verify registration token:', error);
		return res.status(500).json({ message: error.message });
	}
};

const logout = (_req, res) => {
    try {
        res.clearCookie('token');
        res.status(200).json({ message: 'Logged out successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message });
    }
};

const isHR = async (userId) => {

    try {
        const user = await User.findById(userId);
        if (user.isHR) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.error("Failed to get user's info", error);
    }
}






module.exports = { register, sendEmail, verifyRegistrationToken, login, logout, isHR };