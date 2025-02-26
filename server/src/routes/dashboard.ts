import { Router } from "express";
import { getDashboardDataController } from "../controllers/dashboardController";



const router = Router();

router.get("/", getDashboardDataController);


export default router;