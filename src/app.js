const connectDB = require('./config/database');
const express = require('express');
const User = require('./models/user')
const { validateSignUpData } = require('./utils/validation')
const bcrpyt = require('bcrypt');

const app = express();
const PORT = 1708;

app.use(express.json());

app.post("/signup", async (req, res) => {
  try {
    validateSignUpData(req);
    const { password } = req.body;
    const passwordHash = await bcrpyt.hash(password, 10);

    const user = new User({
      ...req.body, password: passwordHash
    });
    await user.save();
    res.send("User added successfully");
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }

})

app.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const user = await User.findOne({ emailId });
    if (!user) {
      throw new Error("Email Id is not present in DB!")
    }
    const isPasswordValid = await bcrpyt.compare(password, user.password);
    if (isPasswordValid) {
      res.send("Login successful");
    }
    else {
      res.send("Wrong Password!");
    }
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
    //Akku@1234567
    //akku.8@gmail.com
  }
})

app.get("/user", async (req, res) => {
  const userName = req.body.firstName;
  try {
    const user = await User.find({ firstName: userName });
    if (user.length === 0) {
      res.status(404).send("No user found");
    } else { res.send(user); }

  } catch (err) {
    res.status(400).send("user not found");
  }
})
app.delete("/delete-all", async (req, res) => {
  try {
    await User.deleteMany({}); // Deletes all documents in the `users` collection
    res.send("All user data deleted successfully");
  } catch (err) {
    res.status(500).send("Error deleting data: " + err.message);
  }
});

app.get("/feed", async (req, res) => {
  try {
    const user = await User.find({});
    if (user.length === 0) {
      res.status(404).send("No user found");
    } else { res.send(user); }

  } catch (err) {
    res.status(400).send("user not found");
  }
})



app.use("/aakanksha", (req, res) => {
  res.send("aakanksha");
})

connectDB().then(async () => {
  console.log("Database connected successfully");
  await User.init(); // Ensure indexes are created for unique constraints
  console.log("Indexes ensured!");

  app.listen(PORT, () => {
    console.log(`server listening on port: ${PORT}...`);
  });
}).catch(err => {
  console.log('Error in connecting to database', err);
})



