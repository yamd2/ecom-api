import joi from "joi";

export const newAdminValidation = (req, res, next) => {
  try {
    //nsdsgsggs

    //condition
    const schema = joi.object({
      address: joi.string().allow("", null),
      email: joi.string().email({ minDomainSegments: 2 }),
      fName: joi.string().required(),
      lName: joi.string().required(),
      password: joi.string().required(),
      phone: joi.string().allow("", null),
    });

    //compair
    const { error } = schema.validate(req.body);

    error
      ? res.json({
          status: "error",
          message: error.message,
        })
      : next();
  } catch (error) {
    next(error);
  }
};
