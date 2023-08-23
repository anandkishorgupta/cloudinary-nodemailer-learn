import express from "express";
import { imageUpload, localFileUpload, videoUpload } from "../controllers/fileUploadController.js";
const router=express.Router();

// api route
router.post("/localFileUpload",localFileUpload)
router.post("/imageUpload",imageUpload)
router.post("/videoUpload",videoUpload)

export default router           