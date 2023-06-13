import { PersonSendToSign, SearchFullnamePerson } from "../../controller/book/person.controller";

var express = require("express");

var personRouter = express.Router();

/* GET home page. */
personRouter.get("/search-person", SearchFullnamePerson);
personRouter.get("/get-person-to-sign/:idBook", PersonSendToSign);

export default personRouter;
