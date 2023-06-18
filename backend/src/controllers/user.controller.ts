// import { Get, Route, Tags, Post, Body, Path, Response, Request } from "tsoa";
import { Request, Response } from "express";
import { User } from "../entities";
import {
  getUsers,
  createUser,
  UserRequest,
  getUser,
  updateUser,
  loginUser,
} from "../repositories/user";
import {
  comparePassword,
  generateToken,
  hashPassword,
} from "../utils/password";

class UserController {
  constructor() {
    this.getUsers = this.getUsers.bind(this);
    this.createUser = this.createUser.bind(this);
    this.getUser = this.getUser.bind(this);
    this.resetPassword = this.resetPassword.bind(this);
    this.login = this.login.bind(this);
  }

  async getUsers(req: any, res: any): Promise<Array<User>> {
    const response = await getUsers();
    return res.send(response);
  }

  async createUser(req: any, res: any): Promise<User> {
    try {
      const hashedPassword = await hashPassword(req.body.password);

      const newUser = {
        ...req.body,
        // password: hashedPassword,
      };

      const token = generateToken(newUser.id, newUser.role);

      const user = await createUser(newUser);
      return res.status(200).json({
        status: 200,
        message: "User created successful",
        data: [
          {
            // token,
            user,
          },
        ],
      });
    } catch (error) {
      return res.status(400).json({
        status: 400,
        message: error,
      });
    }
  }

  async getUser(id: any, res: any): Promise<User | null> {
    const response = await getUser(Number(id));
    if (!response) res.status(404).send({ message: "No user found" });
    return res.send(response);
  }

  async resetPassword(req: any, res: any) {
    const { userName, password, confirmpassword } = req.body;

    if (!password || password.length < 6) {
      res.status(400).json({
        status: 400,
        message: "Password must be more than 6 characters",
        userName,
      });
    } else if (password !== confirmpassword) {
      res.status(400).json({
        status: 400,
        message: " Password does not match",
        userName,
      });
    } else {
      // const hashedPassword = await hashPassword(password);

      try {
        // const value = await updateUser(userName, hashedPassword);

        // if (value === 0) {
        //   return res.status(400).json({
        //     status: 400,
        //     message: "Password reset not successful",
        //   });
        // }

        return res.status(200).json({
          status: 200,
          message: "Password reset successful",
        });
      } catch (error) {
        return res.status(500).json({
          status: 500,
          message: "Server error",
          error,
        });
      }
    }
  }

  async login(req: any, res: any) {
    const { userName, password } = req.body;

    try {
      const user = await loginUser(userName, password);

      if (!user) {
        return res.status(404).json({
          status: 404,
          message: "User with this details can not be found",
        });
      }

      // if (!comparePassword(user.password, password)) {
      //   return res.status(401).json({
      //     status: 401,
      //     message: "Wrong password, try again",
      //   });
      // }

      // const token = generateToken(user.id, user.role);
      return res.status(200).json({
        status: 200,
        data: [
          {
            // token,
            user,
          },
        ],
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error,
      });
    }
  }
}

export default new UserController();
