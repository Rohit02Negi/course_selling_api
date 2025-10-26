const { Router } = require('express');
const courseRouter = Router();

  courseRouter.get("/", (req, res) => {  
    res.json({
      msg: "all courses"
    })
  })

  courseRouter.post("/purchases", (req, res) => {  

  })


module.exports = {
  courseRouter: courseRouter
}