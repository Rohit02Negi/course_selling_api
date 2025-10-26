const express = require('express');
const userRouter = express.Router();
const jwt = require("jsonwebtoken");
const { default: mongoose } = require('mongoose');
const { UserModel } = require('../mongoose');
const User_Secret = 'mynameisrohitnegiandthisisasecretkey';

    userRouter.post("/signup", async (req, res) => {
        const { email, password, firstName, lastName } = req.body;
        console.log("req.body:", req.body);

        if (!email || !password || !firstName || !lastName) {
          return res.status(400).json({ msg: "All fields are required" });
        }

        if (email.indexOf('@') === -1) {
          return res.status(400).json({ msg: "Invalid email" });
        }

        const userInfo = await UserModel.create({
          email,
          password,
          firstName,
          lastName
        });

        console.log("created user:", userInfo);
        res.json({ msg: "it's working", user: userInfo });
    });
    

    userRouter.post("/signin", async (req, res) => {
      try{ 

        const { email, password } = req.body;
        if (!email || !password) {
          return res.status(400).json({ msg: "Email and password are required" });
        } 
        const user = await mongoose.findOne({ email }); // Dummy user object for demonstration
        if (!user) {
          return res.status(401).json({ msg: "Invalid credentials" });
        }
        const token = jwt.sign({ email: email }, User_Secret, { expiresIn: '1h' });
        res.json({
          msg: "signin route",
          token: token
        });
      } catch (err) {
        res.status(500).json({ msg: "Server error",
          error: err.message
         });
      }

    });

    userRouter.get("/courses/", (req, res) => {  
      res.json({
        msg: "signin route"
      })
    })



module.exports = { userRouter: userRouter };