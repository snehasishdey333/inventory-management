import { Router } from "express";
import { getInventoryController } from "../controllers/inventoryController";


const router = Router();

router.get("/", getInventoryController);


export default router;