import { getRegisteredModels } from "../admin/adminRegistry.js";

export const updateRecord = async (req, res) => {
  const { model, id } = req.params;
  const updateData = req.body;

  if (!Object.keys(updateData).length) {
    return res.status(400).json({ message: "No update data provided" });
  }

  try {
    const Model = getRegisteredModels()[model];
    if (!Model) return res.status(404).json({ message: "Model not found" });

    const updated = await Model.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updated) return res.status(404).json({ message: `${model} record not found` });

    res.json({ message: `${model} updated successfully`, updated });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
