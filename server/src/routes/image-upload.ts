import { Router } from "express";
import { imageUploadController } from "../controllers/imageUploadController";
import multer from "multer";

const router = Router();

// router.post("/",imageUploadController)
const storage=multer.memoryStorage()

const upload=multer({
    storage:storage
})
router.post("/",upload.single("file"),imageUploadController)

export default router;