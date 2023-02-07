import AdminSchema from "./admin/AdminSchema.js";

export const createNewAdmin = (obj) => {
  return AdminSchema(obj).save();
};
