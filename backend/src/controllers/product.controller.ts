import { Product } from "../entities";
import { createProduct, getProduct, getProducts, updateProduct } from "../repositories/product";

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

  async updateProduct(req: any, res: any): Promise<Product> {
    let updatedProduct;
    try {
      const product = await getProduct(req.params.id);

      if (product) {
        const newProductQuantity = product.quantity + req.body.quantity;
        const newProductQuantityLeft = product.quantityLeft + req.body.quantity;

        const newProduct = updatedProduct = await updateProduct(product.id, {
          ...product,
          name: req.name,
          faced: req.faced,
          size: req.size,
          quantity: newProductQuantity,
          quantityLeft: newProductQuantityLeft,
        });

          return res.status(200).json({
            status: 200,
            message: "Product updated successfully",
            data: [
              {
                newProduct,
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
}

export default new ProductController();
