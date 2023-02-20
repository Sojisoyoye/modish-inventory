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
class ProductController {
    constructor() {
        this.getProducts = this.getProducts.bind(this);
        this.createProduct = this.createProduct.bind(this);
    }
    createProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const product = yield (0, product_1.createProduct)(req.body);
                return res.status(200).json({
                    status: 200,
                    data: [
                        {
                            product,
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
    getProducts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const sales = yield (0, product_1.getProducts)();
            return res.status(200).json({
                status: 200,
                data: sales,
            });
        });
    }
}
exports.default = new ProductController();
