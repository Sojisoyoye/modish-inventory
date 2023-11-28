import { useMutation, useQuery } from '@tanstack/react-query'
import { createProduct, getProducts } from '../api/product'
import { useAlert } from './useAlert';

export const useProducts = () => {
  const { success, error }  = useAlert();

  const { data: products } = useQuery(['products'], () => getProducts());

  let formData;
  const saveSaleFormData = (data: any) => {
    console.log('data from hook', data)
    formData = data
    return formData
  }

  const createProductMutation = useMutation(
    (data: any) => createProduct(data),
    {
      onSuccess: (data) => {
        success('Product created successfully', 'Create product')
       },
       onError: (data) => {
           error(data.message, 'Failed')
           console.log('Product failed', data)
       },
    }
  );

  return { 
    products, 
    formData, 
    saveSaleFormData,
    createProductMutation: createProductMutation.mutate
   }
}


