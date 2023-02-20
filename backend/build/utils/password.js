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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hashPassword = void 0;
// import jwt from "jsonwebtoken";
const bcrypt_1 = __importDefault(require("bcrypt"));
// import * as argon2 from "argon2";
const hashPassword = (password) => __awaiter(void 0, void 0, void 0, function* () {
    return bcrypt_1.default.hashSync(password, bcrypt_1.default.genSaltSync(8));
    // try {
    //   const hash = await argon2.hash(password);
    //   return hash;
    // } catch (err) {
    //   return err;
    // }
});
exports.hashPassword = hashPassword;
// export const comparePassword = (
//   hashPadssword: string,
//   password: string
// ): Promise<boolean> => {
//   return argon2.verify(hashPadssword, password);
// };
//   export const genrateToken = (id: string, isadmin: string, email: string) => {
//     const token = jwt.sign({ userId: id, isAdmin: isadmin, Email: email }, process.env.SECRET, { expiresIn: '7d' });
//     return token;
//   };
//   export const verifyToken = (token: string)  => {
//     const decoded = jwt.verify(token, process.env.SECRET);
//     return decoded;
//   };
