"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const sale_controller_1 = __importDefault(require("../controllers/sale.controller"));
const router = express_1.default.Router();
router.get("/", sale_controller_1.default.getSales);
router.post("/", sale_controller_1.default.createSale);
router.put("/:id", sale_controller_1.default.updateSale);
// router.get("/:id", UserController.getUser);
// router.post("/login", UserController.login);
// router.post("/password/reset", UserController.resetPassword);
exports.default = router;
