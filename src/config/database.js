
const mongoose = require('mongoose');

const connectDB = async () => {
  await mongoose.connect("mongodb+srv://arl0817osho:rUnPx7MLJJ2HfX46@poem.pijkc.mongodb.net/readers")
}

module.exports = connectDB;
