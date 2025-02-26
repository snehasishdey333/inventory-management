import { Router } from "express";
import { addExpenseController, deleteExpenseController, getExpenseController, getExpensesController, updateExpenseController } from "../controllers/expenseController";


const router = Router();

router.get("/", getExpensesController);

router.get("/:id", getExpenseController);

router.post("/", addExpenseController);

router.put("/:id", updateExpenseController);

router.delete("/:id", deleteExpenseController);


export default router;