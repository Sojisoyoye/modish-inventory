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
exports.loginUser = exports.updateUser = exports.getUser = exports.getUsers = exports.createUser = void 0;
const database_1 = require("../config/database");
const entities_1 = require("../entities");
const createUser = (dto) => __awaiter(void 0, void 0, void 0, function* () {
    const userRepository = database_1.config.getRepository(entities_1.User);
    const user = new entities_1.User();
    return userRepository.save(Object.assign(Object.assign({}, user), dto));
});
exports.createUser = createUser;
const getUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const userRepository = database_1.config.getRepository(entities_1.User);
    return userRepository.find();
});
exports.getUsers = getUsers;
const getUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const userRepository = database_1.config.getRepository(entities_1.User);
    const user = yield userRepository.findOneBy({ id: id });
    if (!user)
        return null;
    return user;
});
exports.getUser = getUser;
const updateUser = (email, hashedPassword) => __awaiter(void 0, void 0, void 0, function* () {
    const userRepository = database_1.config.getRepository(entities_1.User);
    const updatedUser = yield userRepository.update({ email }, { password: hashedPassword });
    return updatedUser.affected;
    // userRepository.update()
});
exports.updateUser = updateUser;
const loginUser = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const userRepository = database_1.config.getRepository(entities_1.User);
    const user = yield userRepository.findOneBy({ email: email, password: password });
    return user;
});
exports.loginUser = loginUser;
