import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware";
import { createProduct, getAllProducts } from "../controllers/product.controller";

const router = Router();

router.route("/get-products").get(getAllProducts);
router.route("/create-products").post(verifyJWT,createProduct);

export default router;
