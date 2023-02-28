import express from "express";
import {
  createNewPaymentMethod,
  deletePaymentMethod,
  readPaymentMethods,
  updatePaymentMethod,
} from "../models/paymentmethod/PaymentMethodModel.js";
import { updatPaymentMethodValidation } from "../middlewares/joiMiddleware.js";

const router = express.Router();

// create payment
router.post("/", async (req, res, next) => {
  // const { name } = req.body;
  try {
    const { name, description } = req.body;
    if (name.length && typeof name === "string") {
      const obj = {
        name,
        description,
      };

      const result = await createNewPaymentMethod(obj);

      if (result?._id) {
        res.json({
          status: "success",
          message: "New payemnt method have been created",
        });
        return;
      }
    }

    res.json({
      status: "error",
      message: "Unable to create payment method,  please try again later",
    });
  } catch (error) {
    if (error.message.includes("E11000 duplicate key error collection")) {
      error.errorCode = 200;
      error.message =
        "This payment method has already in system, try to create new payment method.";
    }
    next(error);
  }
});

// read payment method
router.get("/", async (req, res, next) => {
  try {
    const allpaymentmethods = await readPaymentMethods();

    res.json({
      status: "success",
      message: "Here are the all payment methods",
      allpaymentmethods,
    });
  } catch (error) {
    next(error);
  }
});

// update payment method
router.put("/", updatPaymentMethodValidation, async (req, res, next) => {
  try {
    const result = await updatePaymentMethod(req.body);

    if (result?._id) {
      return res.json({
        status: "success",
        message: "The payment method have been updated",
      });
    }
    res.json({
      status: "error",
      message: "Unable to update category",
    });
  } catch (error) {
    next(error);
  }
});

// delete payment
router.delete("/:_id", async (req, res, next) => {
  const { _id } = req.params;
  const result = await deletePaymentMethod(_id);
  if (result?._id) {
    return res.json({
      status: "success",
      message: "The payment method has been deleted successfully",
    });
  }
  try {
    res.json({
      status: "error",
      message: "Unable to delete payment method, try again",
    });
  } catch (error) {
    next(error);
  }
});

export default router;
