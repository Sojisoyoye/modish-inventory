import React, { Fragment, useState } from 'react';
import {
  Button,
  Container,
  Grid,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { NumericFormat } from 'react-number-format';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { productFaced, productSizes } from '../constants';
import { ProductCreateDto, createProduct } from '../api/product';
import { useAlert } from '../hooks/useAlert';
import { useProducts } from '../hooks/useProducts';

export const CreateProduct = () => {
const navigate = useNavigate();
const { createProductMutation } = useProducts();

 const { register, watch, handleSubmit, reset } = useForm<any>();

 const [productQuantity, setProductQuantity] = useState<string>('');
 const [productUnitprice, setProductUnitPrice] = useState<string>('');

  const onSubmit = (data: any) => {
    const productDto: ProductCreateDto = {
        ...data,
        quantity: productQuantity.slice(0, -7),
        unitPrize: productUnitprice.substring(1).replace(/,/g, '')
    }
    createProductMutation(productDto);
    reset();
    setProductQuantity('');
    setProductUnitPrice('');
  }

  return (
    <Container component="main" maxWidth="sm" sx={{ mb: 4, mt: 4 }}>
    <Typography textAlign='center' variant="h6" sx={{ marginBottom: '40px' }}>
        Enter new product details
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            id="product-name"
            label="Product name"
            helperText="Please enter product name"
            variant="outlined"
            fullWidth
            {...register('name')}
          />
        
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            id="product-face"
            select
            label="Product face"
            helperText="Please select product face"
            fullWidth
            value={watch('faced') || ''}
            {...register('faced')}
          >
            {productFaced.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            id="product-size"
            select
            label="Product sise"
            helperText="Please select product size"
            fullWidth
            {...register('size')}
            value={watch('size') || ''}
          >
            {productSizes.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid item xs={12} sm={6}>
        <NumericFormat
            type="text"
            value={productQuantity}
            fullWidth
            thousandsGroupStyle="thousand"
            thousandSeparator=","
            customInput={TextField}
            suffix="roll(s)"
            label="Quantity (in roll)"
            helperText="Please enter product quantity"
            onChange={(e) => setProductQuantity(e.target.value)}
          />

          <Typography variant='caption' fontWeight='bold'>
            200 meters / roll 
            ({Number(productQuantity.slice(0, -7)) * 200}) meters
            </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <NumericFormat
            type="text"
            fullWidth
            value={productUnitprice}
            thousandsGroupStyle="thousand"
            thousandSeparator=","
            customInput={TextField}
            prefix="₦"
            label="Unit Price"
            helperText="Please enter product unit price"
            onChange={(e) => setProductUnitPrice(e.target.value)}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            id="comment"
            label="Comment"
            fullWidth
            variant="outlined"
            multiline
            maxRows={2}
            {...register('comment')}
          />
        </Grid>


        <Grid item xs={12}>
            <Stack 
            direction='row' 
            spacing={2} 
            alignItems='center' 
            justifyContent='flex-end'
            >
            <Button variant="outlined" sx={{ 
            borderColor: '#28a745',
            ":hover": {
              borderColor: '#186429',
            }}} onClick={() => navigate('/dashboard')}>
            Cancel
          </Button>
          <Button type='submit' variant="contained"  sx={{ 
              backgroundColor: '#051094', 
              ":hover": {
                backgroundColor: '#000066'
              }}} onClick={() => {}}>
            Add Product
          </Button>
            </Stack>
          
        </Grid>
      </Grid>
      </form>
    </Container>
  );
};
