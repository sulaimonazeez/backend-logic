import { getRegisteredModels } from "../admin/adminRegistry.js";


export const GetModel = async (req, res) =>{
  const { modelName } = req.params;

  const models = getRegisteredModels();
  const model = models[modelName];

  console.log("Requested model:", modelName);
  console.log("Available models:", Object.keys(models));
  console.log("Model object:", model?.modelName); // 👈 VERY IMPORTANT

  if (!model) return res.status(404).json({ message: "Model not found" });

  const data = await model.find().lean();

  console.log("Returned data:", data); // 👈 CHECK THIS

  res.json(data);
};