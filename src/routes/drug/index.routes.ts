import dbHos from "../../config/dbHos";

var express = require("express");

var drugRouter = express.Router();

drugRouter.get("/pt-lab", async (req: Request, res: any) => {
  try {
    const sql = ''
    const query = await dbHos.raw(``)
    return res.json({ status: 200, results: query[0] })
  } catch (error: any) {
    return res.json({ status: 500, results: error.message })
  }
});

export default drugRouter;


