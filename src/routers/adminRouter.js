import express from "express";
import { newAdminValidation } from "../middlewares/joiMiddleware.js";
import { createNewAdmin } from "../models/AdminModel.js";
import hashPassword from "../utils/bcrypt.js";
import { newAccountEmailVerificationEmail } from "../utils/nodemailer.js";
import { v4 as uuidv4 } from "uuid";
const router = express.Router();

//admin user loging
router.post("/", (req, res, next) => {
  try {
    res.json({
      status: "success",
      message: "todo login",
    });
  } catch (error) {
    next(error);
  }
});

// admin user registration
router.post("/register", newAdminValidation, async (req, res, next) => {
  try {
    req.body.password = hashPassword(req.body.password);

    req.body.emailVerificationCode = uuidv4();

    const result = await createNewAdmin(req.body);
    console.log(result);

    if (result?._id) {
      const uniqueLink = `http://localhost:3000/verify/c= ${result.emailVerificationCode}&email=${result.email}`;

      newAccountEmailVerificationEmail(uniqueLink, result);

      res.json({
        status: " success",
        message: "new user has been registered",
      });

      return;
    }

    res.json({
      status: "error",
      message: "Error! Unable to create new user",
    });
  } catch (error) {
    if (error.message.includes()) next(error);
  }
});

export default router;
