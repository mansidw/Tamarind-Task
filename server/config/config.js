const cloudinary = require('cloudinary').v2;
require("dotenv").config();

// Configure your cloud name, API key and API secret:

const myconfig = cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.SECRET,
  secure: true
});

exports.myconfig = myconfig;