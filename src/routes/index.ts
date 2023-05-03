import express from "express";
import dbApp from "../config/dbApp";

import MessageResponse from "../interfaces/MessageResponse";
import { SexType } from "../model/sex.model";
import { UserType } from "../model/user.model";
import authRouter from "./auth.routes";
import bookRouter from "./book";
import contentRoutes from "./content.routes";
import emojis from "./emojis";
import fileRouter from "./file.routes";
import { menuRoutes } from "./menu.routes";
import { usersRoutes } from "./users.routes";
import drugRouter from "./drug.routes";

const router = express.Router();

router.get<{}, MessageResponse>("/", (req, res) => {
  res.json({
    status: 200,
    results: "KSH Build 2023-03-08 API - 👋🌎🌍🌏",
  });
});

router.use("/emojis", emojis);
router.use("/auth", authRouter);
router.use("/menu", menuRoutes);
router.use("/users", usersRoutes);
router.use("/content", contentRoutes);
router.use("/book", bookRouter);
router.use("/file", fileRouter);
router.use("/drug", drugRouter);

export default router;
