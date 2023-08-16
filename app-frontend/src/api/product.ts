import { getter, poster } from '../apiCaller'

export class ProductDto {
  'id': string = ''
  'name': string = ''
  'faced': string = ''
  'size': string = ''
  'quantity': number = 0
  'unitPrize': number = 0
  'totalAmount': number = 0
  'amountSold': number = 0
  'quantitySold': number = 0
  'quantityLeft': number = 0
}

export class ProductCreateDto {
  'name': string = ''
  'faced': string = ''
  'size': string = ''
  'quantity': number = 0
  'unitPrize': number = 0
}

export const createProduct = async (productDto: ProductCreateDto) => {
  const url = '/api/product'
  const res = await poster(url, productDto)

  if (res.statusCode !== 201) {
    throw new Error(res.message)
  }

  return res
}

export const getProducts = () => {
  return getter('/api/product')
}
