import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { ProductDto } from '../dto';
import { ProductService } from '../service/product.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/user/roles.decorator';
import { Role } from 'src/user/dto';
import { RolesGuard } from 'src/user/roles.guard';

@Controller('api/product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  public async getAll(@Res() response: Response) {
    const products = await this.productService.getAll();

    return response.status(200).json({
      statusCode: 200,
      data: products,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  public async getProduct(@Param('id') id: number) {
    try {
      return await this.productService.getProduct(id);
    } catch (e) {
      throw new HttpException(
        `Product with ID: ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }
  }

  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  async createProduct(
    @Body() productDto: ProductDto,
    @Res() response: Response,
  ) {
    const product = await this.productService.createProduct(productDto);

    return response.status(201).json({
      statusCode: 201,
      message: 'Product successfully created',
      data: product,
    });
  }

  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Put(':id')
  async updateProduct(@Param('id') id: number, @Body() productDto: ProductDto) {
    return await this.productService.updateProduct(productDto, id);
  }
}
