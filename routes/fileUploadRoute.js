import express from "express";
import { localFileUpload } from "../controllers/fileUploadController.js";
const router=express.Router();

// api route
router.post("/localFileUpload",localFileUpload)

export default router