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
    await mongoose.connect('mongodb+srv://rohit2000negi_db_user:hello@cluster0.4uxuy99.mongodb.net/coursera');
    app.listen(3000, () => {
      console.log("Listening to port 3000");
    });
  } catch (err) {
    console.error("Failed to connect to MongoDB", err);
  }
}

main();