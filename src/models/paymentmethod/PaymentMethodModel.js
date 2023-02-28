import PaymentMethodSchema from "./PaymentMethodSchema.js";

export const createNewPaymentMethod = (obj) => {
  return PaymentMethodSchema(obj).save();
};

export const readPaymentMethods = () => {
  return PaymentMethodSchema.find();
};

//@_id must be a string
export const getPaymentMethodById = (_id) => {
  return PaymentMethodSchema.findById(_id);
};

export const updatePaymentMethod = ({ _id, ...rest }) => {
  return PaymentMethodSchema.findByIdAndUpdate(_id, rest, { new: true });
};

export const deletePaymentMethod = (_id) => {
  return PaymentMethodSchema.findByIdAndDelete(_id);
};
