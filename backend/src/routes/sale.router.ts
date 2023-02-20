import express from "express";
import SaleController from "../controllers/sale.controller";

const router = express.Router();

router.get("/", SaleController.getSales);

router.post("/", SaleController.createSale);

router.put("/:id", SaleController.updateSale);

router.delete("/:id", SaleController.deleteSale);

export default router;
