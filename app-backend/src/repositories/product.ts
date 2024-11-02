import { config } from '../config/database';
// import { CreateProductRequest } from "../controllers/product.controller";
import { Product } from '../entities';

export class ProductDto {
  name = '';
  faced = '';
  size = '';
  quantity = 0;
  unitPrize = 0;
  totalAmount = 0;
  amountSold = 0;
  quantitySold = 0;
  quantityLeft: number | undefined = 0;
}

export const createProduct = async (dto: any): Promise<Product> => {
  const productRepository = config.getRepository(Product);
  const product = new Product();
  return productRepository.save({
    ...product,
    ...dto,
  });
};

export const updateProduct = async (
  id: number,
  newProduct: any,
): Promise<any> => {
  const productRepository = config.getRepository(Product);
  const updatedProduct = await productRepository.update(id, { ...newProduct });

  return updatedProduct.affected;
};

export const getProducts = async (): Promise<Array<Product>> => {
  const productRepository = config.getRepository(Product);
  return productRepository.find();
};

export const getProduct = async (id: number): Promise<Product | null> => {
  const productRepository = config.getRepository(Product);
  const product = await productRepository.findOneBy({ id: id });
  if (!product) return null;
  return product;
};

export const getProductByNameSizeAndFaced = async (
  name: string,
  faced: string,
  size: string,
): Promise<Product | null> => {
  const productRepository = config.getRepository(Product);

  const product = await productRepository.findOneBy({
    name: name,
    faced: faced,
    size: size,
  });

  if (!product) return null;
  return product;
};

export const deleteProduct = async (
  id: number,
): Promise<number | undefined | null> => {
  const productRepository = config.getRepository(Product);

  const result = await productRepository.delete(id);

  const { affected } = result;

  return affected;
};
