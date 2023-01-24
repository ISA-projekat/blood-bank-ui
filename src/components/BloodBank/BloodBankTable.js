import React, { useContext, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { TablePagination } from "@mui/material";
import { useNavigate } from "react-router";
import AuthContext from "../../store/bloodbank/login/login-context";

const BloodBankTable = ({
  rows,
  sortByName,
  sortByCity,
  sortByStreet,
  sortByGrade,
  onPageChange,
  page,
  order,
}) => {
  const navigate = useNavigate();

  const context = useContext(AuthContext);

  const handleRowClick = (event, id) => {
    if (!context.isLoggedIn) {
      return;
    }

    navigate("/blood-bank/appointments/" + id);
  };

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
          className="table-row-class"
          onClick={(event) => handleRowClick(event, bb.id)}
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
      <div className="blood-banks__table">
        <TableContainer className="fs blood-banks__table-content">
          <Table
            sx={{ minWidth: 800 }}
            aria-label="simple table"
            className={"blood-banks__table-content-table"}
          >
            <TableHead>
              <TableRow>
                <TableCell onClick={sortByName} className="cursor-pointer">
                  <b>Name</b>
                </TableCell>
                <TableCell
                  align="right"
                  onClick={sortByStreet}
                  className="cursor-pointer"
                >
                  <b>Street</b>
                </TableCell>
                <TableCell
                  align="right"
                  onClick={sortByCity}
                  className="cursor-pointer"
                >
                  <b>City</b>
                </TableCell>
                <TableCell align="right">
                  <b>Country</b>
                </TableCell>
                <TableCell
                  align="right"
                  onClick={sortByGrade}
                  className="cursor-pointer"
                >
                  <b>Rating</b>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>{renderTableData(data)}</TableBody>
          </Table>
          <TablePagination
            className={"blood-banks__table-content-pagination"}
            sx={{ minWidth: "100%" }}
            onPageChange={onPageChange}
            count={page.totalElements}
            rowsPerPage={page.size}
            page={page.number}
          />
        </TableContainer>
      </div>
    );
  };

  const handlePageChangeSort = (page, sort) => {};

  return renderTable(rows);
};

export default BloodBankTable;
