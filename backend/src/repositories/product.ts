import { config } from "../config/database";
import { Product } from "../entities";

export class ProductDto {
  name: string = "";
  faced: string = "";
  size: string = "";
  quantity: number = 0;
  unitPrize: number = 0;
  totalAmount: number = 0;
  amountSold: number = 0;
  quantitySold: number = 0;
  quantityLeft: number | undefined = 0;
}


export const createProduct = async (dto: ProductDto): Promise<Product> => {
  const productRepository = config.getRepository(Product);
  const product = new Product();
  return productRepository.save({
    ...product,
    ...dto,
  });
};

export const updateProduct = async (
  id: number,
  newProduct: ProductDto
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
  size: string
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
  id: number
): Promise<number | undefined> => {
  const productRepository = config.getRepository(Product);
  const product = productRepository.findOne({ where: { id } });

  if (!product) return undefined;

  const result = await productRepository.softDelete(id);
  return result.affected;
};
