const validator = require('validator');

const createUserValidation = (req, res, next) => {
  const { username, password, confirmPwd, email } = req.body;
  if (
    !username ||
    !password ||
    !confirmPwd ||
    !email ||
    validator.isEmpty(username) ||
    validator.isEmpty(password) ||
    validator.isEmpty(confirmPwd) ||
    validator.isEmpty(email)
  ) {
    return res.status(400).json({ message: 'Missing required fields!' });
  }

  if (!validator.isAlphanumeric(username)) {
    return res.status(400).json({ message: 'Username must be alphanumeric!' });
  }

  if (!validator.isStrongPassword(password)) {
    return res.status(400).json({ message: 'Password is too weak!' });
  }

  next();
};

const loginUserValidation = (req, res, next) => {
  const { username, password } = req.body;
  if (
    !username ||
    !password ||
    validator.isEmpty(username) ||
    validator.isEmpty(password)
  ) {
    return res.status(400).json({ message: 'Missing required fields!' });
  }

  next();
};

const resetValidation = (req, res, next) => {
  const { usernameOrEmail, password, confirmPwd } = req.body;
  if (
    !usernameOrEmail ||
    !password ||
    !confirmPwd ||
    validator.isEmpty(usernameOrEmail) ||
    validator.isEmpty(password) ||
    validator.isEmpty(confirmPwd)
  ) {
    return res.status(400).json({ message: 'Missing required fields!' });
  }

  if (!validator.isStrongPassword(password)) {
    return res.status(400).json({ message: 'Password is too weak!' });
  }

  next();
};

module.exports = { createUserValidation, loginUserValidation, resetValidation };
