const jwt = require('jsonwebtoken');

const generateToken = (id) => {
    const token = jwt.sign({id}, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '1h',
    });
    return token;
}

const generateNameToken = (id, name) => {
    const token = jwt.sign({id, name}, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '1h',
    });
    return token;
}

const decodeToken = (token) => {
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    return decodedToken.id;
}

const decodeRegisterToken = (token) => {
    const decodedToken = jwt.verify(token, process.env.REGISTER_TOKEN_SECRET);
    return decodedToken;
}

const generateRegisterToken = (email) => {
    const token = jwt.sign({ email }, process.env.REGISTER_TOKEN_SECRET, {
        expiresIn: '3h'
    });
    return token;
}

module.exports = {generateToken, generateNameToken, decodeToken, decodeRegisterToken, generateRegisterToken};