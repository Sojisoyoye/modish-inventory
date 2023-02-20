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
exports.deleteSale = exports.getSale = exports.getSales = exports.updateSale = exports.createSale = exports.SaleDto = void 0;
const database_1 = require("../config/database");
const entities_1 = require("../entities");
class SaleDto {
    constructor() {
        this.productName = "";
        this.faced = "";
        this.size = "";
        this.quantity = 0;
        this.amount = 0;
        this.status = "";
        this.comment = "";
    }
}
exports.SaleDto = SaleDto;
const createSale = (dto) => __awaiter(void 0, void 0, void 0, function* () {
    const saleRepository = database_1.config.getRepository(entities_1.Sale);
    const sale = new entities_1.Sale();
    return saleRepository.save(Object.assign(Object.assign({}, sale), dto));
});
exports.createSale = createSale;
const updateSale = (id, newSale) => __awaiter(void 0, void 0, void 0, function* () {
    const saleRepository = database_1.config.getRepository(entities_1.Sale);
    const updatedSale = yield saleRepository.update(id, Object.assign({}, newSale));
    return updatedSale.affected;
});
exports.updateSale = updateSale;
const getSales = () => __awaiter(void 0, void 0, void 0, function* () {
    const saleRepository = database_1.config.getRepository(entities_1.Sale);
    return saleRepository.find();
});
exports.getSales = getSales;
const getSale = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const saleRepository = database_1.config.getRepository(entities_1.Sale);
    const sale = yield saleRepository.findOneBy({ id: id });
    if (!sale)
        return null;
    return sale;
});
exports.getSale = getSale;
const deleteSale = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const saleRepository = database_1.config.getRepository(entities_1.Sale);
    const sale = saleRepository.findOne({ where: { id } });
    if (!sale)
        return undefined;
    const result = yield saleRepository.softDelete(id);
    return result.affected;
});
exports.deleteSale = deleteSale;
