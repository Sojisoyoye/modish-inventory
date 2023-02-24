import { Product } from "../entities";
import {
  createProduct,
  deleteProduct,
  getProduct,
  getProducts,
  updateProduct,
} from "../repositories/product";
import { ParamsDictionary, Query } from "express-serve-static-core";
import { Request, Response } from "express";

export class CreateProductRequest {
  name: string = "";
  faced: string = "";
  size: string = "";
  quantity: number = 0;
  unitPrize: number = 0;
}

class ProductController {
  constructor() {
    this.getProducts = this.getProducts.bind(this);
    this.createProduct = this.createProduct.bind(this);
  }

  async createProduct(
    req: Request<ParamsDictionary, any, CreateProductRequest>,
    res: any
  ): Promise<Product> {
    try {
      const product = await createProduct({
        ...req.body,
        quantityLeft: req.body.quantity,
        totalAmount: req.body.quantity * req.body.unitPrize,
      });

      return res.status(200).json({
        status: 200,
        data: [
          {
            product,
          },
        ],
      });
    } catch (error) {
      return res.status(400).json({
        status: 400,
        error,
      });
    }
  }

  async getProducts(req: any, res: any): Promise<Array<Product>> {
    const sales = await getProducts();
    return res.status(200).json({
      status: 200,
      data: sales,
    });
  }

  async getProduct(req: any, res: any): Promise<Product | null> {
    try {
      const product = await getProduct(req.params.id);

      if (product) {
        return res.status(200).json({
          status: 200,
          data: [
            {
              product,
            },
          ],
        });
      } else {
        return res.status(404).json({
          status: 404,
          message: "Product not found",
        });
      }
    } catch (error) {
      return res.status(400).json({
        status: 400,
        error,
      });
    }
  }

  async updateProduct(req: any, res: any): Promise<Product> {
    let updatedProduct;
    try {
      const product = await getProduct(req.params.id);

      if (product) {
        const newProductQuantity = product.quantity + req.body.quantity;
        const newProductQuantityLeft = product.quantityLeft + req.body.quantity;
        const amount = product.unitPrize * req.body.quantity;
        const newTotalAmount = product.totalAmount + amount;

        updatedProduct = await updateProduct(product.id, {
          ...product,
          totalAmount: newTotalAmount,
          quantity: newProductQuantity,
          quantityLeft: newProductQuantityLeft,
        });

        return res.status(200).json({
          status: 200,
          message: "Product updated successfully",
          data: [
            {
              updatedProduct,
            },
          ],
        });
      }

      return res.status(404).json({
        status: 400,
        message: "Product not found",
      });
    } catch (error) {
      return res.status(400).json({
        status: 400,
        error,
      });
    }
  }

  async deleteProduct(req: any, res: any): Promise<any> {
    try {
      const result = await deleteProduct(req.params.id);

      if (result !== undefined) {
        return res.status(200).json({
          status: 200,
          deleted: req.params.id,
          message: "Product deleted succesfully",
        });
      } else {
        return res.status(404).json({
          status: 404,
          message: "Product not found",
        });
      }
    } catch (error) {
      return res.status(400).json({
        status: 400,
        error,
      });
    }
  }
}

export default new ProductController();
