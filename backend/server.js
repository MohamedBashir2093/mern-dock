const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const userRoute = require('./routes/userRoute');

app.use(cors());
app.use(express.json());

// Hardcoded credentials
const MONGO_URI = "mongodb://root:examplepassword@mongodb:27017/mydatabase?authSource=admin";
const PORT = 5000;

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log("MongoDB connected successfully");

    app.listen(PORT, (error) => {
      if (error) console.log(error);
      console.log(`Backend server running at port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });

app.use('/api/user', userRoute);
