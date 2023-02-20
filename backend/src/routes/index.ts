import express from "express";
import PingController from "../controllers/ping";
import UserRouter from "./user.router";
import SaleRouter from "./sale.router";
import ProductRouter from "./product.router";

const router = express.Router();

router.get("/ping", async (_req, res) => {
  const controller = new PingController();
  const response = await controller.getMessage();
  return res.send(response);
});

router.use("/users", UserRouter);

router.use("/sales", SaleRouter);

router.use("/products", ProductRouter);

export default router;
