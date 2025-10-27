const { Router } = require('express');
const courseRouter = Router();


 //to get all courses routing 
  courseRouter.get("/", async (req, res) => {  
    await CourseModel.find({title});
    res.json({
      msg: "List of all courses",
      courses: courses
    })
  })

  // to purchase a course routing 
  courseRouter.post("/purchases", (req, res) => {  

  })


module.exports = {
  courseRouter: courseRouter
}