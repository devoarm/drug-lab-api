import express from "express";
import dbApp from "../config/dbApp";

import MessageResponse from "../interfaces/MessageResponse";
import authRouter from "./auth.routes";
import emojis from "./emojis";
import drugRouter from "./drug/index.routes";

const router = express.Router();

router.get<{}, MessageResponse>("/", (req, res) => {
  res.json({
    status: 200,
    results: "Drug Api Build 2024-02-29 API - 👋🌎🌍🌏",
  });
});

router.use("/emojis", emojis);
router.use("/auth", authRouter);
router.use("/drug", drugRouter);

export default router;
