const { Router } = require('express');
const adminRouter = Router();


    adminRouter.post("/signup", (req, res) => {
        res.json({msg: " it's working "})
    });

    adminRouter.post("/signin", (req, res) => {
      res.json({msg: " it's working "})
    });


    adminRouter.post("/courses", (req, res) => {
      res.json({msg: " it's working "})
    });


    adminRouter.post("/courses/bulk", (req, res) => {
      res.json({msg: " it's working "})
    });






module.exports = {
    adminRouter: adminRouter
}