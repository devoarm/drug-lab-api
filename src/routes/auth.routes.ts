import express from "express";
import { LoginController, MeController, RegisterController } from "../controller/auth.controller";

import MessageResponse from "../interfaces/MessageResponse";
import emojis from "./emojis";
import verifyToken from "../middleware/auth";

const authRouter = express.Router();

authRouter.get<{}, MessageResponse>("/", (req, res) => {
  res.json({
    status: 200,
    results: "Auth API - 👋🌎🌍🌏",
  });
});
authRouter.post("/login", LoginController);
authRouter.post("/register", RegisterController);
authRouter.get("/me/:token",verifyToken,MeController);



export default authRouter;
