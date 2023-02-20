import React, { useState }  from 'react'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import MenuItem from '@mui/material/MenuItem'
import Box from '@mui/material/Box'
import InputAdornment from '@mui/material/InputAdornment'
import {
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  OutlinedInput,
  SelectChangeEvent,
} from '@mui/material'
import { NumericFormat } from 'react-number-format'

const currencies = [
  {
    value: 'WENGE',
    label: 'WENGE',
  },
  {
    value: 'REDROSE',
    label: 'RED ROSE',
  },
  {
    value: 'CEDAR',
    label: 'CEDAR',
  },
  {
    value: 'SWITCH',
    label: 'SWITCH',
  },
  {
    value: 'PERFECTWHITE',
    label: 'PERFECT WHITE',
  },
]

const faced = [
  {
    value: 'EMBOSSED',
    label: 'EMBOSSED',
  },
  {
    value: 'MATT',
    label: 'MATT',
  },
  {
    value: 'GLOSSY',
    label: 'GLOSSY',
  },
]

const size = [
  {
    label: '21mm',
    value: false,
  },
  {
    label: '48mm',
    value: false,
  }
]

export const SalesForm = () => {
  const [productName, setProductName] = useState<string>('');
  const [productFaced, setProductFaced] = useState<string>('');
  const [sizeThreeQuarter, setSizeThreeQuarter] = useState<boolean>(size[0].value);
  const [sizeTwoInches, setSizeTwoInches] = useState<boolean>(size[1].value);
  const [productQuantity, setProductQuantity] = useState<string>('');
  const [productAmount, setProductAmount] = useState<string>('');
  const [comment, setComment] = useState<string>('');


  return (
    <React.Fragment>
      <Typography variant="h6" sx={{ marginBottom: '40px' }}>
        Enter product details
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            id="select-currency"
            select
            label="Product name"
            value={productName}
            helperText="Please select product name"
            fullWidth
            onChange={(e) => setProductName(e.target.value)}
          >
            {currencies.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            id="select-currency"
            select
            label="Product face"
            value={productFaced}
            helperText="Please select product face"
            fullWidth
            onChange={(e) => setProductFaced(e.target.value)}
          >
            {faced.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              ml: 3,
              pt: 0,
            }}
          >
            <FormControlLabel
              label="21mm or 3/4"
              control={<Checkbox sx={{ mt: 0 }} checked={sizeThreeQuarter} onChange={(e) => {setSizeThreeQuarter(e.target.checked)}} />}
            />
            <FormControlLabel
              label='48mm or 2"'
              control={<Checkbox sx={{ pt: 0, pb: 0 }} checked={sizeTwoInches} onChange={(e) => {setSizeTwoInches(e.target.checked)}} />}
            />
            <Typography variant="caption" color="info">
              Please select product size
            </Typography>
          </Box>
        </Grid>

        <Grid item xs={12} sm={6}>
          <NumericFormat
            type="text"
            value={productQuantity}
            thousandsGroupStyle="thousand"
            thousandSeparator=","
            customInput={TextField}
            suffix="m"
            label="Quantity (in roll)"
            helperText="Please enter product quantity"
            onChange={(e) => setProductQuantity(e.target.value)}
          />
          <Typography>200 meters / roll (roll * 200 = Y meters)</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <NumericFormat
            type="text"
            value={productAmount}
            thousandsGroupStyle="thousand"
            thousandSeparator=","
            customInput={TextField}
            prefix="₦"
            label="Amount"
            helperText="Please enter product amount"
            onChange={(e) => setProductAmount(e.target.value)}

          />
        </Grid>

        <Grid item xs={12}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-around',
            }}
          >
            <FormControlLabel
              label="PAID"
              control={<Checkbox sx={{ mt: 0 }} checked={sizeThreeQuarter} onChange={(e) => {setSizeThreeQuarter(e.target.checked)}} />}
            />
            <FormControlLabel
              label="UNPAID"
              control={<Checkbox sx={{ pt: 0, pb: 0 }} checked={sizeThreeQuarter} onChange={(e) => {setSizeThreeQuarter(e.target.checked)}} />}
            />
          </Box>
        </Grid>

        <Grid item xs={12}>
          <TextField
            id="comment"
            name="comment"
            label="Comment"
            value={comment}
            fullWidth
            variant="outlined"
            multiline
            maxRows={2}
            onChange={(e) => setComment(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography
            variant="overline"
            display="block"
            align="center"
            gutterBottom
            sx={{ fontSize: 14, backgroundColor: 'lightgreen' }}
          >
            [1]s Product Added
          </Typography>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Button variant="contained" onClick={() => {}}>
            Add sale
          </Button>
        </Grid>
      </Grid>
    </React.Fragment>
  )
}
