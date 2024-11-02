import * as React from 'react';
import { useProducts } from '../hooks/useProducts';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  Container,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  tableCellClasses,
} from '@mui/material';
import { styled } from '@mui/material/styles';

export const ProductsPage = () => {
  const { products } = useProducts();

  const navigate = useNavigate();

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Stack direction="row" justifyContent="space-between" mb={4}>
        <Typography variant="h5">Products</Typography>
        <Button
          variant="outlined"
          size="medium"
          onClick={() => navigate('/product')}
        >
          Create Product
        </Button>
      </Stack>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }}>
          <TableHead>
            <TableRow>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell>Faced</StyledTableCell>
              <StyledTableCell>Size</StyledTableCell>
              <StyledTableCell>Amount</StyledTableCell>
              <StyledTableCell>Quantity Sold</StyledTableCell>
              <StyledTableCell>Quantity Left</StyledTableCell>
              <StyledTableCell>Total Quantity</StyledTableCell>
              <StyledTableCell>Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products &&
              products.map((product: any) => (
                <StyledTableRow key={product.id}>
                  <StyledTableCell>
                    <Typography variant="subtitle1">{product.name}</Typography>
                  </StyledTableCell>
                  <StyledTableCell>
                    <Typography variant="subtitle1">{product.faced}</Typography>
                  </StyledTableCell>
                  <StyledTableCell>
                    <Typography variant="overline" sx={{ color: '#051094' }}>
                      {product.size}
                    </Typography>
                  </StyledTableCell>
                  <StyledTableCell>
                    <Typography variant="subtitle1">
                      {product.totalAmount}
                    </Typography>
                  </StyledTableCell>
                  <StyledTableCell>
                    <Typography variant="subtitle1">
                      {product.quantitySold ? product.quantitySold : '-'}
                    </Typography>
                  </StyledTableCell>
                  <StyledTableCell>
                    <Typography variant="subtitle1">
                      {product.quantityLeft}
                    </Typography>
                  </StyledTableCell>
                  <StyledTableCell>
                    <Typography variant="subtitle1">
                      {product.quantity}
                    </Typography>
                  </StyledTableCell>
                  <StyledTableCell>
                    <Button variant="outlined" size="small">
                      Edit
                    </Button>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#051094',
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    paddingLeft: 0,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    // backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    // border: 0,
  },
}));
