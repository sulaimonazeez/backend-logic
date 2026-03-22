import { getRegisteredModels } from "../admin/adminRegistry.js";

export const GetModel = async (req, res) => {
  const { modelName } = req.params;
  const models = getRegisteredModels();
  const Model = models[modelName];

  if (!Model) return res.status(404).json({ message: "Model not found" });

  try {
    const data = await Model.find().lean();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
