import { Product } from "../entities";
import { createProduct, getProducts } from "../repositories/product";

class ProductController {
  constructor() {
    this.getProducts = this.getProducts.bind(this);
    this.createProduct = this.createProduct.bind(this);
  }

  async createProduct(req: any, res: any): Promise<Product> {
    try {
      const product = await createProduct(req.body);

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
}

export default new ProductController();
