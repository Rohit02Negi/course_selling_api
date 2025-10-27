
require('dotenv').config();
console.log(process.env);
const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json()); // Add this line


const { courseRouter } = require('./routes/course')
const { adminRouter } = require('./routes/admin')
const { userRouter } = require('./routes/user')


app.use('/api/v1/user', userRouter)
app.use('/api/v1/admin', adminRouter)
app.use('/api/v1/course', courseRouter)

async function main() {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log(process.env.MONGO_URL);
    app.listen(process.env.port, () => {
      console.log("Listening to port 3000");
    });
  } catch (err) {
    console.error("Failed to connect to MongoDB", err);
  }
}

main();