import { Router } from "express";
import { addProductController, getProductsController,getProductController, updateProductWithImageController, updateProductWithoutImageController, deleteProductController } from "../controllers/productController";

const router = Router();

router.get("/", getProductsController);

router.get("/:id", getProductController);

router.post("/", addProductController);

router.put("/image/:id", updateProductWithImageController);

router.put("/:id", updateProductWithoutImageController);

router.delete("/:id",deleteProductController)


export default router;