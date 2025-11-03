import { getRegisteredModels } from "../admin/adminRegistry.js";

export const AdminModelController = (req, res) =>{
  const models = Object.keys(getRegisteredModels());
  console.log(models);
  res.json(models);
}

