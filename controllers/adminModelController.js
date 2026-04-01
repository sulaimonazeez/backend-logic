import { getRegisteredModels } from "../admin/adminRegistry.js";

export const AdminModelController = (req, res) => {
  try {
    const models = Object.keys(getRegisteredModels());
    console.log("iterating...");
    console.log(models);
    res.set('Cache-Control', 'no-store');
    return res.status(200).json({ count: models.length, models });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
};