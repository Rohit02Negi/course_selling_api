const { Router } = require('express');
const { AdminModel, CourseModel } = require('../mongoose');
const jwt = require("jsonwebtoken");
const admin_middlerware = require('../middleware/admin_middlerware');
const adminRouter = Router();
const { z } = require('zod');
const bcrypt = require('bcrypt');

  // Admin signup route
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

    // Admin signin route
    adminRouter.post("/signin", async (req, res) => {
           try{ 
        const { email, password } = req.body;
        if (!email || !password) {
          return res.status(400).json({ msg: "Email and password are required" });
        } 
        const user = await AdminModel.findOne({ email, password });
        console.log("Found user:", user);
        if (!user) {
          return res.status(401).json({ msg: "Invalid credentials" });
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_ADMIN_SECRET, { expiresIn: '1h' });
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
      
      let user = await CourseModel.create({
        title,
        description,
        price,
        picture, // use URL or base64; change to Buffer if storing binary
        creatorId: userId
      })
      
      console.log("Created course:", user);
      console.log("User ID in admin create course route:", String(userId));

      res.json({msg: " it's working "})
    });

    // to update or edit a course routing
    adminRouter.put("/course", admin_middlerware, async (req, res) => {
      try {
        const userId = req.userID;
        const { courseId, ...updateData } = req.body;

        const admincourse = await CourseModel.findById({userId, _id: courseId});
        if (!admincourse) {
          return res.status(404).json({ msg: "Course not found" });
        }
        
        const updatedCourse = await CourseModel.findByIdAndUpdate(courseId, updateData, { new: true });
        
        if (!updatedCourse) {
          return res.status(404).json({ msg: "Course not found" });
        }
        
        res.json({
          msg: "Course updated successfully",
          course: updatedCourse
        });
      } catch (err) {
        res.status(500).json({
          msg: "Error updating course",
          error: err.message
        });
      }
    });

    // get all courses
    // adminRouter.get("/courses", admin_middlerware, async (req, res) => {
    //   try {
    //     const courses = await CourseModel.find({}); 
    //     res.json({
    //       msg: "Courses retrieved successfully",
    //       courses: courses
    //     });
    //   } catch (err) {
    //     res.status(500).json({
    //       msg: "Error retrieving courses",  
    //       error: err.message
    //     });
    //   } 
    // });

module.exports = {
    adminRouter: adminRouter
}