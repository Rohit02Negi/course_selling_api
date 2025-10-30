const { Router } = require('express');
const { CourseModel, UserModel } = require('../mongoose');
const user_middleware = require('../middleware/user_middleware');
const { PurchaseModel } = require('../mongoose');
const courseRouter = Router();


 //to get all courses routing 
  courseRouter.get("/", async (req, res) => {  
    const courses = await CourseModel.find({});
    console.log("All courses:", courses);

    const titleList = courses.map(course => ({
      title: course.title,
      description: course.description,
      price: course.price
    }));

    console.log("Course titles:", titleList);

    res.json({
      msg: "List of all courses",
      courses: titleList
    })
  })

 //to purchase a course routing 
  courseRouter.post("/purchase/:courseId", user_middleware, async (req, res) => {  
    const courseId = req.params.courseId;
    const userId = req.userID;
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    
    
    console.log( " the user is ", user.email );

    await PurchaseModel.create({
        userId,
        courseId
    });

    res.json({ msg: "Course purchased successfully",
      userID : user.firstName,
     });
  })

  // to get all purchased courses
  courseRouter.get("/purchased", user_middleware, async (req, res) => {
    const userId = req.userID;
    const user = await UserModel.findById(userId);
    if (!user) {
    return res.status(404).json({ msg: "User not found" });
    }

    const purchases = await PurchaseModel.find({ userId }).populate('courseId');

    console.log(JSON.stringify(purchases, null, 2));
    let courseTitles = purchases.map(purchase => ({
      title: purchase.courseId.title,
      description: purchase.courseId.description,
      price: purchase.courseId.price
    }));

    console.log("Purchased courses:", courseTitles);

    res.json({ purchasedCourses: courseTitles });
  })

module.exports = {
  courseRouter: courseRouter
}