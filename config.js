const { MONGO_URI = 'mongodb://127.0.0.1:27017/bitfilmsdb' } = process.env;
const { JWT_SECRET = 'JWT_SECRET' } = process.env;
const { PORT = 3001 } = process.env;

module.exports = {
  MONGO_URI,
  JWT_SECRET,
  PORT,
};
