import crypto from 'crypto';

const generateSecret = () => {
  const secret = crypto.randomBytes(32).toString('base64');
  console.log(`AUTH_SECRET=${secret}`);
};

generateSecret();
