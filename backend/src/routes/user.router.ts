import express from "express";
import UserController from "../controllers/user.controller";

const router = express.Router();

router.get("/", UserController.getUsers);

router.post("/register", UserController.createUser);

router.get("/:id", UserController.getUser);

router.post("/login", UserController.login);

router.post("/password/reset", UserController.resetPassword);

export default router;
