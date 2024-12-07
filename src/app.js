const connectDB = require('./config/database');
const express = require('express');
const User = require('./models/user')


const app = express();
const PORT = 1708;

app.post("/signup", async (req, res) => {
  const userObj = {
    firstName: "aman",
    lastName: "sharma",
    email: "arl@gmail.com",
    password: "xyz123"
  }
  const user = new User(userObj);
  await user.save();

  res.send("user added");

})

app.use("/aakanksha", (req, res) => {
  res.send("aakanksha");
})

connectDB().then(() => {
  console.log("Database connected successfully");
  app.listen(PORT, () => {
    console.log(`server listening on port: ${PORT}...`);
  });
}).catch(err => {
  console.log('Error in connecting to database', err);
})



