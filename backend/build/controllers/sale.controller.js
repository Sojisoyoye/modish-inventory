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
const product_1 = require("../repositories/product");
const sale_1 = require("../repositories/sale");
class SaleController {
    constructor() {
        this.getSales = this.getSales.bind(this);
        this.createSale = this.createSale.bind(this);
    }
    createSale(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const product = yield (0, product_1.getProductByNameSizeAndFaced)(req.body.productName, req.body.faced, req.body.size);
                const sale = yield (0, sale_1.createSale)(req.body);
                if (product && sale) {
                    const newProductQuantity = product.quantity - req.body.quantity;
                    yield (0, product_1.updateProduct)(product.id, Object.assign(Object.assign({}, product), { quantity: newProductQuantity }));
                }
                return res.status(200).json({
                    status: 200,
                    data: [
                        {
                            sale,
                        },
                    ],
                });
            }
            catch (error) {
                return res.status(400).json({
                    status: 400,
                    error,
                });
            }
        });
    }
    getSales(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const sales = yield (0, sale_1.getSales)();
            return res.status(200).json({
                status: 200,
                data: sales,
            });
        });
    }
    updateSale(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let updatedProduct;
            try {
                const sale = yield (0, sale_1.getSale)(req.params.id);
                if (sale) {
                    const newSale = yield (0, sale_1.updateSale)(req.params.id, req.body);
                    if (newSale !== 0) {
                        const product = yield (0, product_1.getProductByNameSizeAndFaced)(req.body.productName, req.body.faced, req.body.size);
                        if (product) {
                            updatedProduct = yield (0, product_1.updateProduct)(product.id, Object.assign(Object.assign({}, product), { name: req.name, faced: req.faced, size: req.size, quantity: req.quantity }));
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
            }
            catch (error) {
                return res.status(400).json({
                    status: 400,
                    error,
                });
            }
        });
    }
}
exports.default = new SaleController();
