import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";

import * as middlewares from "./middlewares";
import api from "./routes";
import MessageResponse from "./interfaces/MessageResponse";
import mongoose from "mongoose";
import dbAppMong from "./config/dbAppMong";
import path from "path";

require("dotenv").config();

const app = express();

dbAppMong()

app.use(morgan("dev"));
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use('/upload/diagrams-hos', express.static(path.join(__dirname, '../upload/diagrams-hos')))
app.get<{}, MessageResponse>("/", (req, res) => {
  res.json({
    status: 200,
    results: "PHR API Build 2023-03-08 - 👋🌎🌍🌏",
  });
});

app.use("/api/v2", api);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

export default app;
