import { Router } from "express";
import { addIncomeController, deleteIncomeController, getIncomeController, getIncomesController, updateIncomeController } from "../controllers/incomeController";


const router = Router();

router.get("/", getIncomesController);

router.get("/:id", getIncomeController);

router.post("/", addIncomeController);

router.put("/:id", updateIncomeController);

router.delete("/:id", deleteIncomeController);


export default router;