import React, { Fragment, useState } from 'react'
import {
  Box,
  Button,
  Container,
  Grid,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from '@mui/material'
import { NumericFormat } from 'react-number-format'
import { useProducts } from '../hooks/useProducts'
import { useForm } from 'react-hook-form'
import { paymentStatus, productFaced, productSizes } from '../constants'
import { useStepper } from '../hooks/useStepper'
import { useNavigate } from 'react-router-dom'

// type SalesFormType = {
//   saveFormData: Function
// }

export class SaleDto {
  'productName': string = ''
  'faced': string = ''
  'size': string = ''
  'status': string = ''
  'comment': string = ''
  'quantity': string = ''
  'amount': string = ''
}

export const SalesForm = () => {
  const navigate = useNavigate()
  const { products } = useProducts()
  const { saveStepData } = useStepper()

  const {
    register,
    watch,
    getValues,
    handleSubmit,
    reset,
    formState: { isDirty, isValid, dirtyFields },
  } = useForm<SaleDto>({
    mode: 'onChange',
    defaultValues: {
      productName: '',
      faced: '',
      size: '',
      status: '',
      // comment: '',
      // quantity: '',
      // amount: '',
    },
  })

  const [productQuantity, setProductQuantity] = useState<string>('')
  const [productUnitprice, setProductUnitPrice] = useState<string>('')

  const [saleDto, setSaleDto] = useState<SaleDto[]>([])

  const resetFormValues = () => {
    reset()
    setProductQuantity('')
    setProductUnitPrice('')
  }

  const getFormValues = () => {
    const formValues = getValues()

    const newSale = {
      ...formValues,
      quantity: productQuantity.slice(0, -7),
      amount: productUnitprice.substring(1).replace(/,/g, ''),
    }

    setSaleDto((prev) => [...prev, newSale])
    console.log('SALE DTO', saleDto)

    resetFormValues()
  }

  const onSubmit = () => {
    saveStepData(saleDto)
    resetFormValues()
    navigate('/sale-review')
  }

  // const isFormValid = () => {
  //   const { productName, faced, size, status, quantity, amount } = saleDto[0]

  //   return productName && faced && size && status && quantity && amount
  // }

  return (
    <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
      <Button onClick={() => navigate('/dashboard')}>Back to home</Button>
      <Paper
        variant="outlined"
        sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
      >
        <Typography variant="h5" align="center" gutterBottom>
          Add Sales
        </Typography>
        <Fragment>
          <Typography
            variant="h6"
            textAlign="center"
            sx={{ marginBottom: '40px' }}
          >
            Enter product details
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  id="product"
                  select
                  label="Product name"
                  helperText="Please select product name"
                  fullWidth
                  value={watch('productName') || ''}
                  {...register('productName')}
                >
                  {products ? (
                    products.map((option: any) => (
                      <MenuItem key={option.id} value={option.name}>
                        {option.name}
                      </MenuItem>
                    ))
                  ) : (
                    <div></div>
                  )}
                </TextField>
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
                  {productFaced.map((face) => (
                    <MenuItem key={face.value} value={face.value}>
                      {face.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  id="product-size"
                  select
                  label="Product size"
                  helperText="Please select product size"
                  fullWidth
                  {...register('size')}
                  value={watch('size') || ''}
                >
                  {productSizes.map((size) => (
                    <MenuItem key={size.value} value={size.value}>
                      {size.label}
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

                <Typography variant="caption" fontWeight="bold">
                  200 meters / roll (
                  {Number(productQuantity.slice(0, -7)) * 200}) meters
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

              <Grid item xs={12} sm={6}>
                <TextField
                  id="payment-status"
                  select
                  label="Payment Status"
                  helperText="Please select payment status"
                  fullWidth
                  {...register('status')}
                  value={watch('status') || ''}
                >
                  {paymentStatus.map((status, index) => (
                    <MenuItem key={index} value={status.value}>
                      {status.value}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  id="comment"
                  label="Comment"
                  fullWidth
                  variant="outlined"
                  multiline
                  maxRows={2}
                  value={watch('comment') || ''}
                  {...register('comment')}
                />
              </Grid>
              {saleDto && saleDto.length !== 0 ? (
                <Grid item xs={12} sm={6}>
                  <Typography
                    variant="overline"
                    display="block"
                    align="center"
                    gutterBottom
                    sx={{ fontSize: 14, backgroundColor: 'lightgreen' }}
                  >
                    {saleDto.length} Product[s] Added
                  </Typography>
                </Grid>
              ) : null}

              <Grid item xs={12} sm={6}>
                <Button
                  variant="contained"
                  fullWidth
                  onClick={() => getFormValues()}
                  disabled={!isDirty && !isValid}
                >
                  {saleDto.length ? 'Add another product' : 'Add Product'}
                </Button>
              </Grid>
            </Grid>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-end',
              }}
            >
              <Button
                type="submit"
                variant="contained"
                disabled={!saleDto.length}
                sx={{ mt: 3, ml: 1 }}
              >
                Next
              </Button>
            </Box>
          </form>
        </Fragment>
      </Paper>
    </Container>
  )
}
