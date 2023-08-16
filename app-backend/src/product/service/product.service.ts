import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from 'src/entities';
import { ProductDto } from '../dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  public async getAll() {
    return await this.productRepository.find();
  }

  public async getProduct(productId: number): Promise<Product> {
    return this.productRepository.findOneByOrFail({
      id: productId,
    });
  }

  async createProduct(productDto: ProductDto) {
    const productExist = await this.productRepository.findOneByOrFail({
      name: productDto.name,
      faced: productDto.faced,
      size: productDto.size,
    });

    if (productExist) {
      throw new HttpException(
        'Product already exist, update instead',
        HttpStatus.BAD_REQUEST,
      );
    }

    const product = await this.productRepository.save({
      ...productDto,
      unitPrize: productDto.unitPrize,
      quantityLeft: productDto.quantity,
      totalAmount: productDto.quantity * productDto.unitPrize,
    });

    if (!product) {
      throw new HttpException(
        'Product can not be created',
        HttpStatus.BAD_REQUEST,
      );
    }

    return product;
  }

  public async updateProduct(productDto: ProductDto, productId: number) {
    let updatedProduct;
    try {
      const product = await this.productRepository.findOneByOrFail({
        id: productId,
      });

      if (product) {
        const newProductQuantity = product.quantity + productDto.quantity;
        const newProductQuantityLeft =
          product.quantityLeft + productDto.quantity;
        const amount = product.unitPrize * productDto.quantity;
        const newTotalAmount = product.totalAmount + amount;

        updatedProduct = await this.productRepository.update(productId, {
          ...product,
          totalAmount: newTotalAmount,
          quantity: newProductQuantity,
          quantityLeft: newProductQuantityLeft,
        });

        return updatedProduct.affected;
      }
    } catch (error) {
      throw new HttpException(
        `Product can not be updated ${error}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
