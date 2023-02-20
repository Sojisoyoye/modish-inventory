import jwt from "jsonwebtoken";
import { default as bcrypt } from "bcrypt";

export const hashPassword = async (password: string) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
};

export const comparePassword = (
  hashPassword: string,
  password: string
): boolean => {
  return bcrypt.compareSync(password, hashPassword);
};

export const generateToken = (id: string, role: string) => {
  const token = jwt.sign({ userId: id, role: role }, "THESECRET", {
    expiresIn: "7d",
  });
  return token;
};

export const verifyToken = (token: string) => {
  const decoded = jwt.verify(token, "THESECRET");
  return decoded;
};

export const processUpdate = (
  updateValue: number,
  valueLeft: number,
  valueSold: number,
  totalQuantity: number
): number => {
  const calculatedValue = updateValue + valueLeft;

  if (calculatedValue > totalQuantity) {
    const newValue = updateValue - valueSold;
    const newValueLeft = valueLeft - newValue;

    if (updateValue + newValueLeft === totalQuantity) {
      return newValueLeft;
    }
  } else if (calculatedValue < totalQuantity) {
    const newValue = valueSold - updateValue;
    const newValueLeft = valueLeft + newValue;

    if (updateValue + newValueLeft === totalQuantity) {
      return newValueLeft;
    }
  }
  return valueLeft;
};
