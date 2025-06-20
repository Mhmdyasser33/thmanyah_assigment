import express from "express";
import podcast from "./podcast";
const router = express.Router()
export default () : express.Router =>{
   podcast(router);
   return router;
}