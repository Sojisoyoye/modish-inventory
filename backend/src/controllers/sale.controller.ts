import { Sale } from "../entities";
import {
  getProductByNameSizeAndFaced,
  updateProduct,
} from "../repositories/product";
import {
  createSale,
  deleteSale,
  getSale,
  getSales,
  updateSale,
} from "../repositories/sale";
import { processUpdate } from "../utils/password";

class SaleController {
  constructor() {
    this.getSales = this.getSales.bind(this);
    this.createSale = this.createSale.bind(this);
    this.updateSale = this.updateSale.bind(this);
    this.deleteSale = this.deleteSale.bind(this);
  }

  async createSale(req: any, res: any): Promise<Sale> {
    try {
      const product = await getProductByNameSizeAndFaced(
        req.body.productName,
        req.body.faced,
        req.body.size
      );

      const sale = await createSale(req.body);

      if (product && sale) {
        const productAmountSold = product.amountSold + req.body.amount;

        const productQuantitySold = product.quantitySold + req.body.quantity;

        const productQuantityLeft = product.quantityLeft - req.body.quantity;

        await updateProduct(product.id, {
          ...product,
          amountSold: productAmountSold,
          quantitySold: productQuantitySold,
          quantityLeft: productQuantityLeft,
        });
      }

      return res.status(200).json({
        status: 200,
        data: [
          {
            sale,
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

  async getSales(req: any, res: any): Promise<Array<Sale>> {
    const sales = await getSales();
    return res.status(200).json({
      status: 200,
      data: sales,
    });
  }

  async updateSale(req: any, res: any): Promise<Sale> {
    let updatedProduct;
    try {
      const sale = await getSale(req.params.id);

      if (sale) {
        const newSale = await updateSale(req.params.id, req.body);

        if (newSale !== 0) {
          const product = await getProductByNameSizeAndFaced(
            req.body.productName,
            req.body.faced,
            req.body.size
          );

          if (product) {
            const valueLeft = processUpdate(
              req.body.quantity,
              product.quantityLeft,
              product.quantitySold,
              product.quantity
            );
            updatedProduct = await updateProduct(product.id, {
              ...product,
              name: req.name,
              faced: req.faced,
              size: req.size,
              quantitySold: req.body.quantity,
              quantityLeft: valueLeft,
            });
          }

          return res.status(200).json({
            status: 200,
            data: [
              {
                newSale,
                product: updatedProduct,
              },
            ],
          });
        }
      }

      return res.status(404).json({
        status: 400,
        message: "Sale not found",
      });
    } catch (error) {
      return res.status(400).json({
        status: 400,
        error,
      });
    }
  }

  async deleteSale(req: any, res: any): Promise<any> {
    const result = await deleteSale(req.params.id);

    if (result !== undefined) {
      return res.status(200).json({
        status: 200,
        deleted: req.params.id,
        message: "Sale deleted succesfully",
      });
    }
  }
}

export default new SaleController();
