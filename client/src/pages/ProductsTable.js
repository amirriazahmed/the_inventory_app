import React, { useEffect, useState } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import TablePagination from "@material-ui/core/TablePagination";
import InputLabel from "@material-ui/core/InputLabel";

const useStyles = makeStyles({
  root: {
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    fontSize: 22,
  },
  headerCell: {
    color: "blue",
    fontSize: 22,
  },
  headerCell2: {    
    fontSize: 16,
  },
});

const ProductsTable = () => {
  const [rows, setRows] = useState([]);
  const classes = useStyles();

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    const getInventoryItems = async () => {
      // fetch uses the "proxy" value set in client/package.json
      let response = await fetch("/product");
      let data = await response.json();
      setRows(data);
    };
    getInventoryItems();
  }, []);

  return (
    <TableContainer
      component={Paper}
      style={{
        width: "auto",
        margin: "10px",
        boxShadow: "0 3px 5px 2px rgba(60, 60, 200, .5)",
      }}
    >
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className={classes.headerCell}>Product ID</TableCell>
            <TableCell className={classes.headerCell}>Product Name</TableCell>
            <TableCell className={classes.headerCell}>Brand</TableCell>
            <TableCell className={classes.headerCell}>Supplier</TableCell>
            <TableCell className={classes.headerCell}>Category</TableCell>
            <TableCell className={classes.headerCell}>Quantity</TableCell>
          </TableRow>
        </TableHead>
        <TableBody fontSize={"25"}>
          {rows
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row, index) => (
              <TableRow
                style={
                  index % 2
                    ? { background: "hsl(0, 0%, 90%" }
                    : { background: "hsl(0, 100%, 100%)" }
                }
              >
                <TableCell className={classes.headerCell2}>{row.id}</TableCell>
                <TableCell className={classes.headerCell2}>{row.item}</TableCell>
                <TableCell className={classes.headerCell2}>{row.brand}</TableCell>
                <TableCell className={classes.headerCell2}>{row.supplier}</TableCell>
                <TableCell className={classes.headerCell2}>{row.category}</TableCell>
                <TableCell className={classes.headerCell2}>{row.quantity}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </TableContainer>
  );
};

export default ProductsTable;
