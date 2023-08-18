import express, { ErrorRequestHandler, Request, Response } from "express";
import {
  AddDep,
  DeleteDep,
  GetDep,
  GetDepById,
  GetDepByParent,
  SearchDep,
  UpdateDetailDep,
  UpdateImgDev,
  UpdateIndexDep,
  UploadImgDev,
} from "../controller/hosNavigator.controller";
import verifyToken from "../middleware/auth";

const hosNavigatorRoutes = express.Router();

hosNavigatorRoutes.get("/", GetDep);
hosNavigatorRoutes.post("/", verifyToken, AddDep);
hosNavigatorRoutes.put("/", verifyToken, UpdateDetailDep);
hosNavigatorRoutes.post("/update-index", verifyToken, UpdateIndexDep);
hosNavigatorRoutes.post("/upload-img-dev", verifyToken, UploadImgDev);
hosNavigatorRoutes.post("/update-img-dev", verifyToken, UpdateImgDev);
hosNavigatorRoutes.delete("/:_id", verifyToken, DeleteDep);
hosNavigatorRoutes.get("/:_id", GetDepById);
hosNavigatorRoutes.get("/find-by-parent/:id", GetDepByParent);
hosNavigatorRoutes.get("/search-dep/:slug", SearchDep);

export default hosNavigatorRoutes;
