const crypto = require('crypto');

const generateResetTokenSecret = () => {
  const secret = crypto.randomBytes(64).toString('hex');
  return secret;
};

console.log(generateResetTokenSecret());