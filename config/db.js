const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './config/config.env' });

const DB = process.env.MONGO_ATLAS_URI.replace(
  '<PASSWORD>',
  process.env.MONGO_ATLAS_PASSWORD
);

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

module.exports = connectDB;
