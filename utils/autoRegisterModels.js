// autoRegisterModels.js
import fs from "fs";
import path from "path";
import { registerModel } from "../admin/adminRegistry.js";

const modelsPath = path.resolve("./models");

export const autoRegisterModels = async () => {
  const files = fs.readdirSync(modelsPath);

  for (const file of files) {
    if (file.endsWith(".js")) {
      const modelModule = await import(`../models/${file}`);
      
      const model = modelModule.default;

      if (model && model.modelName) {
        registerModel(model.modelName, model);
        console.log("✅ Registered:", model.modelName);
      }
    }
  }
};