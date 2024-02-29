import express from "express";

import MessageResponse from "../interfaces/MessageResponse";
import emojis from "./emojis";
import verifyToken from "../middleware/auth";
import { LoginController } from "../controller/auth.controller";

const authRouter = express.Router();

authRouter.get<{}, MessageResponse>("/", (req, res) => {
  res.json({
    status: 200,
    results: "Auth API - 👋🌎🌍🌏",
  });
});
authRouter.post("/login", LoginController);




export default authRouter;
