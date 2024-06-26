import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import logo from './Arogyashala-logos_black.png'; // Import the logo

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: 'rgb(38, 122, 107)',
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 30,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.common.white,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const OPDTimingsForm = () => {
  // Sample data for OPD schedule
  const [opdData] = useState([
    { department: "Endocrinology", days: "Monday - Saturday", timings: "9:00 AM - 5:00 PM" },
    { department: "GI Surgery", days: "Monday, Tuesday, Wednesday, Friday", timings: "10:00 AM - 4:00 PM" },
    { department: "Cardiology", days: "Monday - Saturday", timings: "8:30 AM - 6:00 PM" },
    { department: "Pulmonology", days: "Monday - Saturday", timings: "9:00 AM - 5:30 PM" },
    { department: "Gastroenterology", days: "Tuesday, Thursday, Saturday", timings: "9:30 AM - 4:30 PM" },
    { department: "Urology", days: "Monday, Wednesday, Friday", timings: "11:00 AM - 3:00 PM" },
    { department: "CTVS", days: "Monday - Saturday", timings: "9:00 AM - 5:00 PM" },
    { department: "Pain Clinic", days: "Wednesday", timings: "1:00 PM - 5:00 PM" }
  ]);

  return (
    <div>
      <h1><img src={logo} alt="AarogyaShala Logo" style={{ width: '30%', height: 'auto', verticalAlign: 'middle' }} />Welcome to Arogyashala's OPD Timings schedule</h1>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell style={{fontSize : "30px"}}>Department</StyledTableCell>
              <StyledTableCell align="right" style={{fontSize : "30px"}}>OPD Consultation Days</StyledTableCell>
              <StyledTableCell align="right"style={{fontSize : "30px"}}>Timings</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {opdData.map((row, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell component="th" scope="row">
                  {row.department}
                </StyledTableCell>
                <StyledTableCell align="right">{row.days}</StyledTableCell>
                <StyledTableCell align="right">{row.timings}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default OPDTimingsForm;
