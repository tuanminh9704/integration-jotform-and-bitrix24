import webhookJotformRoute from "./webhook-jotform.js";
import multer from "multer";

const upload = multer();

export default (app) => {
  app.use("/webhook-jotform", upload.none(), webhookJotformRoute);
};
