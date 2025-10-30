const express = require('express');
const userRouter = express.Router();
const jwt = require("jsonwebtoken");
const { UserModel } = require('../mongoose');
const user_middleware = require('../middleware/user_middleware');
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

        // stored password should be hashed in reall application using bcrypt or similar library

        const { email, password } = req.body;
        if (!email || !password) {
          return res.status(400).json({ msg: "Email and password are required" });
        } 
        const user = await UserModel.findOne({ email, password });
        console.log("Found user:", user);
        if (!user) {
          return res.status(401).json({ msg: "Invalid credentials" });
        }
        const token = jwt.sign({ id : user._id }, User_Secret, { expiresIn: '1h' });
        res.json({
          msg: "signin route",
          token: token
        });
        
        // try using cookie based authentication
      } catch (err) {
        res.status(500).json({ msg: "Server error",
          error: err.message
         });
      }

    });

    userRouter.get("/courses", user_middleware, (req, res) => { 
      try {
      const me = req.userID;
      console.log("User ID in route:", me); 
      res.json({
        msg: "signin route",
        me
      })
      }
      catch (err) {
        res.status(500).json({ msg: "Server error",
          error: err.message
        });
      }
      })



module.exports = { userRouter: userRouter };