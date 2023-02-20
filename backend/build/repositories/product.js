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
exports.deleteProduct = exports.getProductByNameSizeAndFaced = exports.getProduct = exports.getProducts = exports.updateProduct = exports.createProduct = exports.ProductDto = void 0;
const database_1 = require("../config/database");
const entities_1 = require("../entities");
class ProductDto {
    constructor() {
        this.name = "";
        this.faced = "";
        this.size = "";
        this.quantity = 0;
    }
}
exports.ProductDto = ProductDto;
const createProduct = (dto) => __awaiter(void 0, void 0, void 0, function* () {
    const productRepository = database_1.config.getRepository(entities_1.Product);
    const product = new entities_1.Product();
    return productRepository.save(Object.assign(Object.assign({}, product), dto));
});
exports.createProduct = createProduct;
const updateProduct = (id, newProduct) => __awaiter(void 0, void 0, void 0, function* () {
    const productRepository = database_1.config.getRepository(entities_1.Product);
    const updatedProduct = yield productRepository.update(id, Object.assign({}, newProduct));
    return updatedProduct.affected;
});
exports.updateProduct = updateProduct;
const getProducts = () => __awaiter(void 0, void 0, void 0, function* () {
    const productRepository = database_1.config.getRepository(entities_1.Product);
    return productRepository.find();
});
exports.getProducts = getProducts;
const getProduct = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const productRepository = database_1.config.getRepository(entities_1.Product);
    const product = yield productRepository.findOneBy({ id: id });
    if (!product)
        return null;
    return product;
});
exports.getProduct = getProduct;
const getProductByNameSizeAndFaced = (name, faced, size) => __awaiter(void 0, void 0, void 0, function* () {
    const productRepository = database_1.config.getRepository(entities_1.Product);
    const product = yield productRepository.findOneBy({
        name: name,
        faced: faced,
        size: size,
    });
    if (!product)
        return null;
    return product;
});
exports.getProductByNameSizeAndFaced = getProductByNameSizeAndFaced;
const deleteProduct = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const productRepository = database_1.config.getRepository(entities_1.Product);
    const product = productRepository.findOne({ where: { id } });
    if (!product)
        return undefined;
    const result = yield productRepository.softDelete(id);
    return result.affected;
});
exports.deleteProduct = deleteProduct;
