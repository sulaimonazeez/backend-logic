import { getRegisteredModels } from "../admin/adminRegistry.js";

export const deleteRecord = async (req, res) => {
  const { model, id } = req.params;

  try {
    const Model = getRegisteredModels()[model];
    if (!Model) return res.status(404).json({ message: "Model not found" });

    const deleted = await Model.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: "Record not found" });

    res.json({ message: "Deleted successfully", deleted });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
