import { Router } from "express";
import { addCategoriesController, deleteCategoryController, getCategoriesController, getCategoryController, updateCategoryController } from "../controllers/categoryController";

const router = Router();

router.get("/", getCategoriesController);

router.get("/no-params", getCategoriesController);

router.get("/:id", getCategoryController);

router.post("/", addCategoriesController);

router.put("/:id",updateCategoryController)

router.delete("/:id",deleteCategoryController)


export default router;