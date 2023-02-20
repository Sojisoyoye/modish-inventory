"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../repositories/user");
const password_1 = require("../utils/password");
class UserController {
    constructor() {
        this.getUsers = this.getUsers.bind(this);
        this.createUser = this.createUser.bind(this);
        this.getUser = this.getUser.bind(this);
        this.resetPassword = this.resetPassword.bind(this);
        this.login = this.login.bind(this);
    }
    getUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield (0, user_1.getUsers)();
            return res.send(response);
        });
    }
    createUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const hashedPassword = yield (0, password_1.hashPassword)(req.body.password);
                console.log(hashedPassword);
                const newUser = Object.assign(Object.assign({}, req.body), { password: hashedPassword });
                console.log("NEw user", newUser);
                const response = yield (0, user_1.createUser)(req.body);
                return res.send(response);
            }
            catch (error) {
                return res.json(error);
            }
        });
    }
    getUser(id, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield (0, user_1.getUser)(Number(id));
            if (!response)
                res.status(404).send({ message: "No user found" });
            return res.send(response);
        });
    }
    resetPassword(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password, confirmpassword } = req.body;
            if (!password || password.length < 6) {
                res.status(400).json({
                    status: 400,
                    message: "Password must be more than 6 characters",
                    email,
                });
            }
            else if (password !== confirmpassword) {
                res.status(400).json({
                    status: 400,
                    message: " Password does not match",
                    email,
                });
            }
            else {
                // const hashedPassword = await hashPassword(password);
                try {
                    const value = yield (0, user_1.updateUser)(email, password);
                    if (value === 0) {
                        return res.status(400).json({
                            status: 400,
                            message: "Password reset not successful",
                        });
                    }
                    return res.status(200).json({
                        status: 200,
                        message: "Password reset successful",
                    });
                }
                catch (error) {
                    return res.status(500).json({
                        status: 500,
                        message: "Server error",
                        error,
                    });
                }
            }
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            try {
                const user = yield (0, user_1.loginUser)(email, password);
                if (!user) {
                    return res.status(404).json({
                        status: 404,
                        message: "User with this details can not be found",
                    });
                }
                // if (!comparePassword(user.password, password)) {
                //   return res.status(401).json({
                //     status: 401,
                //     message: 'Wrong password, try again',
                //   });
                // }
                // const token = Helper.genrateToken(rows[0].id, rows[0].isadmin);
                return res.status(200).json({
                    status: 200,
                    data: [
                        {
                            // token,
                            user,
                        },
                    ],
                });
            }
            catch (error) {
                return res.status(500).json({
                    status: 500,
                    error,
                });
            }
        });
    }
}
exports.default = new UserController();
