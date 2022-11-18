import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

const BloodBankTable = ({
  rows,
  sortByName,
  sortByCity,
  sortByStreet,
  sortByGrade,
  order,
}) => {
  const renderTableData = (data) => {
    let result = [];

    if (!data) {
      return <TableRow />;
    }

    if (data.length === 0) {
      return <TableRow />;
    }

    for (let bb of data) {
      result.push(
        <TableRow
          key={bb.name}
          sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
        >
          <TableCell component="th" scope="row">
            {bb.name}
          </TableCell>
          <TableCell align="right">{bb.address.street}</TableCell>
          <TableCell align="right">{bb.address.city}</TableCell>
          <TableCell align="right">{bb.address.country}</TableCell>
          <TableCell align="right">{bb.rating}</TableCell>
        </TableRow>
      );
    }

    return result;
  };

  const renderTable = (data) => {
    if (!data || data.length === 0) {
      return <div className="message">There are no Blood Banks found...</div>;
    }

    return (
      <TableContainer className="fs">
        <Table sx={{ minWidth: 800 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell onClick={sortByName}>
                <b>Name</b>
              </TableCell>
              <TableCell align="right" onClick={sortByStreet}>
                <b>Street</b>
              </TableCell>
              <TableCell align="right" onClick={sortByCity}>
                <b>City</b>
              </TableCell>
              <TableCell align="right">
                <b>Country</b>
              </TableCell>
              <TableCell align="right" onClick={sortByGrade}>
                <b>Rating</b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{renderTableData(data)}</TableBody>
        </Table>
      </TableContainer>
    );
  };

  return <div>{renderTable(rows)}</div>;
};

export default BloodBankTable;
