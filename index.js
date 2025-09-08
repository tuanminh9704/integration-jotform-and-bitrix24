import express from "express";
import dotenv from "dotenv";

import router from "./routes/index.route.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

router(app);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
