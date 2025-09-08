import express from "express";
import { webhookJotform } from "../controllers/webhook-jotform.js";

const router = express.Router();

router.post("/", webhookJotform);

export default router;