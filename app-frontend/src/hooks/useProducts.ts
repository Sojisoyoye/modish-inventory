import { useMutation, useQuery } from '@tanstack/react-query';
import { createProduct, getProducts } from '../api/product';
import { useAlert } from './useAlert';

export const useProducts = () => {
  const { success, error } = useAlert();

  const { data: products = [] } = useQuery(['products'], () => getProducts());

  const createProductMutation = useMutation(
    (data: any) => createProduct(data),
    {
      onSuccess: (data) => {
        success('Product created successfully', 'Create product');
      },
      onError: (data: { status: string; message: string }) => {
        error(data.message, 'Failed');
      },
    },
  );

  return {
    products: products.data,
    createProductMutation: createProductMutation.mutate,
  };
};
