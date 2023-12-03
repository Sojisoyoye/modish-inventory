import React from 'react'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import TableFooter from '@mui/material/TableFooter'
import { useProducts } from '../hooks/useProducts'
import { useStepper } from '../hooks/useStepper'
import { Button, Container } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const products = [
  {
    name: 'White Mazonia',
    faced: 'Embossed',
    size: '21mm or 3/4',
    quantity: '400m',
    price: '₦24,000',
    status: 'PAID',
  },
  {
    name: 'Perfect White',
    faced: 'Matt',
    size: '48mm or 2"',
    quantity: '200m',
    price: '₦24,000',
    status: 'UNPAID',
  },
]

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#051094',
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    paddingLeft: 0,
  },
}))

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    // backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    // border: 0,
  },
}))

export default function SaleReview() {
  const navigate = useNavigate()
  const { data } = useStepper()

  // FIXME: not working, find another way to receive the form data
  console.log('Sale Data from context stepper>> ', data)

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
        <React.Fragment>
          <Typography variant="h6" sx={{ marginBottom: '40px' }}>
            Sales order summary
          </Typography>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 500 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Product details</StyledTableCell>
                  <StyledTableCell align="right">Quantity</StyledTableCell>
                  <StyledTableCell align="right">Amount</StyledTableCell>
                  <StyledTableCell align="right">
                    Payment Status
                  </StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {products.map((row) => (
                  <StyledTableRow key={row.name}>
                    <StyledTableCell component="th" scope="row">
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'column',
                          ml: 3,
                          pt: 0,
                        }}
                      >
                        <Typography variant="subtitle1" sx={{ padding: 0 }}>
                          {row.name}
                        </Typography>
                        <Typography variant="subtitle2">{row.faced}</Typography>
                        <Typography
                          variant="overline"
                          sx={{ color: '#051094' }}
                        >
                          {row.size}
                        </Typography>
                      </Box>
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      <Typography variant="subtitle1">
                        {row.quantity}
                      </Typography>
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      <Typography variant="subtitle1"> {row.price}</Typography>
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      <Typography variant="button" sx={{ fontWeight: 600 }}>
                        {row.status}
                      </Typography>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
              <TableFooter>
                <StyledTableRow>
                  <StyledTableCell>
                    <Typography
                      variant="button"
                      display="block"
                      sx={{ fontWeight: 600, fontSize: 18, color: '#000000' }}
                    >
                      TOTAL
                    </Typography>
                  </StyledTableCell>
                  <StyledTableCell align="right"></StyledTableCell>
                  <StyledTableCell align="right">
                    <Typography
                      variant="button"
                      display="block"
                      sx={{ fontWeight: 600, fontSize: 18, color: '#000000' }}
                    >
                      ₦48,000
                    </Typography>
                  </StyledTableCell>
                  <StyledTableCell align="right"></StyledTableCell>
                </StyledTableRow>
              </TableFooter>
            </Table>
          </TableContainer>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
            }}
          >
            <Button onClick={() => navigate('/sale')} sx={{ mt: 3, ml: 1 }}>
              Back
            </Button>
            <Button type="submit" variant="contained" sx={{ mt: 3, ml: 1 }}>
              Save
            </Button>
          </Box>
        </React.Fragment>
      </Paper>
    </Container>
  )
}
