const { Router } = require('express');
const { AdminModel } = require('../mongoose');
const jwt = require("jsonwebtoken");
const admin_middlerware = require('../middleware/admin_middlerware');
const adminRouter = Router();


    adminRouter.post("/signup", async (req, res) => {
        const { email, password, firstName, lastName } = req.body;
        console.log("req.body:", req.body);

        if (!email || !password || !firstName || !lastName) {
          return res.status(400).json({ msg: "All fields are required" });
        }

        if (email.indexOf('@') === -1) {
          return res.status(400).json({ msg: "Invalid email" });
        }

        const userInfo = await AdminModel.create({
          email,
          password,
          firstName,
          lastName
        });

        console.log("created user:", userInfo);
        res.json({ msg: "it's working", user: userInfo });
    });


    adminRouter.post("/signin", async (req, res) => {
           try{ 

        // stored password should be hashed in reall application using bcrypt or similar library

        const { email, password } = req.body;
        if (!email || !password) {
          return res.status(400).json({ msg: "Email and password are required" });
        } 
        const user = await AdminModel.findOne({ email, password });
        console.log("Found user:", user);
        if (!user) {
          return res.status(401).json({ msg: "Invalid credentials" });
        }
        const token = jwt.sign({ email: email }, User_Secret, { expiresIn: '1h' });
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

    // to create a course routing

  adminRouter.post("/courses", admin_middlerware, async (req, res) => {
      const userId = req.userID;
      const { title, description, price, picture } = req.body;
      console.log("User ID in admin create course route:", userId);

      await CourseModel.create({
        title,
        description,
        price,
        picture, // use URL or base64; change to Buffer if storing binary
        creatorId: userId
      })

      res.json({msg: " it's working "})
    });

    // to update or edit a course routing

    adminRouter.put("course", admin_middlerware, (req, res) => {
      res.json({msg: " it's working "})
    });






module.exports = {
    adminRouter: adminRouter
}