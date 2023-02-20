"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = __importDefault(require("../controllers/user.controller"));
const router = express_1.default.Router();
router.get("/", user_controller_1.default.getUsers);
router.post("/register", user_controller_1.default.createUser);
router.get("/:id", user_controller_1.default.getUser);
router.post("/login", user_controller_1.default.login);
router.post("/password/reset", user_controller_1.default.resetPassword);
exports.default = router;
