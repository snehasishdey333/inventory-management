import { Router } from "express";
import { createStaffInNotExistController, getStaffController, getStaffsController, updateStaffController } from "../controllers/staffController";

const router = Router();

router.get("/", getStaffsController);

router.post("/", createStaffInNotExistController);

// router.get("/chart", getStaffSexCountController);

router.get("/:cognitoId",getStaffController);

router.put("/:id", updateStaffController)


export default router;