import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

// Generate Order Data
function createData(
  id: number,
  date: string,
  name: string,
  faced: string,
  size: string,
  quantity: string,
  price: string,
  status: string,
) {
  return {
    id, date, name, faced, size, quantity, price, status,
  };
}

const rows = [
  createData(
    1,
    '16 Mar, 2022',
    'White Mazonia',
    'Embossed',
    '21mm or 3/4',
    '400m',
    '24,000',
    'PAID',
  ),
  createData(
    2,
    '16 Mar, 2022',
    'Brown Mazonia',
    'Embossed',
    '21mm or 3/4',
    '200m',
    '24,000',
    'UNPAID',
  ),
  createData(
    3,
    '17 Mar, 2022',
    'White',
    'Matt',
    '2"',
    '700m',
    '24,000',
    'PAID',
  ),
  createData(
    4,
    '18 Mar, 2022',
    'Codoba',
    'Matt',
    '21mm or 3/4',
    '400m',
    '24,000',
    'PAID',
  ),
  createData(
    5,
    '18 Mar, 2022',
    'White Mazonia',
    'Embossed',
    '21mm or 3/4',
    '400m',
    '24,000',
    'UPAID',
  ),
];

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

export default function SaleTable() {
  return (
    <>
      <Typography variant="h6" sx={{ marginBottom: '40px' }}>
        Sales order summary
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="right">Id</StyledTableCell>
              <StyledTableCell align="center">Date</StyledTableCell>
              <StyledTableCell>Product details</StyledTableCell>
              <StyledTableCell>Quantity</StyledTableCell>
              <StyledTableCell>Amount</StyledTableCell>
              <StyledTableCell>Status</StyledTableCell>
              <StyledTableCell>Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <StyledTableRow key={row.id}>
                <StyledTableCell align="right">
                  <Typography variant="subtitle1">
                    {row.id}
                  </Typography>
                </StyledTableCell>
                <StyledTableCell align="center">
                  <Typography variant="subtitle1">
                    {' '}
                    {row.date}
                  </Typography>
                </StyledTableCell>
                <StyledTableCell component="th" scope="row">
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      pt: 0,
                    }}
                  >
                    <Typography variant="subtitle1" sx={{ padding: 0 }}>
                      {row.name}
                    </Typography>
                    <Typography variant="subtitle2">{row.faced}</Typography>
                    <Typography variant="overline" sx={{ color: '#051094' }}>
                      {row.size}
                    </Typography>
                  </Box>
                </StyledTableCell>
                <StyledTableCell>
                  <Typography variant="subtitle1">
                    {' '}
                    {row.quantity}
                  </Typography>
                </StyledTableCell>
                <StyledTableCell>
                  <Typography variant="subtitle1">{`$${row.price}`}</Typography>
                </StyledTableCell>
                <StyledTableCell>
                  <Typography variant="button" sx={{ fontWeight: 600 }}>
                    {row.status}
                  </Typography>
                </StyledTableCell>
                <StyledTableCell>
                  <Button
                    variant="contained"
                    sx={{ backgroundColor: '#051094' }}
                  >
                    Edit
                  </Button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
