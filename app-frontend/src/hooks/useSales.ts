import { useMutation, useQuery } from '@tanstack/react-query';
import { useAlert } from './useAlert';
import { createSale, getSales } from '../api/sale';

export const useSales = () => {
  const { success, error } = useAlert();

  const { data: sales = [] } = useQuery(['sales'], () => getSales());

  const createSaleMutation = useMutation((data: any) => createSale(data), {
    onSuccess: (data) => {
      success('Sale created successfully', 'Create sale');
    },
    onError: (data: { status: string; message: string }) => {
      error(data.message, 'Failed');
    },
  });

  return {
    products: sales.data,
    createProductMutation: createSaleMutation.mutate,
  };
};
