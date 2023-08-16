import { useQuery } from '@tanstack/react-query'
import { getProducts } from '../api/product'

export const useProducts = () => {
  const { data: productData } = useQuery(['products'], () => getProducts())

  let formData;
  const saveSaleFormData = (data: any) => {
    console.log('data from hook', data)
    formData = data
    return formData
  }

  return { productData, formData, saveSaleFormData }
}


