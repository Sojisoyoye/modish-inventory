"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const product_controller_1 = __importDefault(require("../controllers/product.controller"));
const router = express_1.default.Router();
router.get("/", product_controller_1.default.getProducts);
router.post("/", product_controller_1.default.createProduct);
// router.get("/:id", UserController.getUser);
// router.post("/login", UserController.login);
// router.post("/password/reset", UserController.resetPassword);
exports.default = router;
