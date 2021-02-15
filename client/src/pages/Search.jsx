import React, { useEffect, useState } from "react";
import {
  Button,
  Grid,
  TextField,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';

import TablePagination from '@material-ui/core/TablePagination';

const useStyles = makeStyles((theme) => ({
  button: {
    display: 'block',
    marginTop: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

const Search = () => {
  const classes = useStyles();
  const [searchData, setSearchData] = useState([]);
  const [prodId, setprodID] = useState("");
  const [prodName, setprodName] = useState("");
  const [prodBrand, setprodBrand] = useState("");
  const [prodSupplier, setprodSupplier] = useState("");
  const [prodCategory, setprodCategory] = useState("");
  const [prodQuantity, setprodQuantity] = useState("");
  const [doSearch, setDoSearch] = useState(false);

  const [page, setPage] = React.useState(0);

  const [limit, setLimit] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    setDoSearch(true);
  };

  const handleChange = (event) => {
    setLimit(parseInt(event.target.value, 10));
    setPage(0);
    setDoSearch(true);
  };

  const performSearch = () => {

    const bodyValues = {};
    bodyValues.search = {};
    if (prodId !== "") {
      bodyValues.search.id = prodId;
    }
    if (prodName !== "") {
      bodyValues.search.item = prodName;
    }
    if (prodBrand !== "") {
      bodyValues.search.brand = prodBrand;
    }
    if (prodSupplier !== "") {
      bodyValues.search.supplier = prodSupplier;
    }
    if (prodCategory !== "") {
      bodyValues.search.category = prodCategory;
    }
    if (prodQuantity !== "") {
      bodyValues.search.quantity = prodQuantity;
    }

    bodyValues.page = page;
    bodyValues.limit = limit;


    const postOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyValues),
    };

    fetch("/product/bigsearch", postOptions)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setSearchData(data);
      });

  };

  useEffect(() => {
    if (doSearch) {
      performSearch();
      setDoSearch(false);
    }

  }, [doSearch])

  return (
    <div style={{ margin: 5 }}>
      <Grid
        container
        direction="column"
        justify="space-around"
        spacing={1}
        alignItems="flex-start"
      >
        <Grid item>
          <TextField
            id="CompanyIdInput"
            label="Internal ID"
            variant="outlined"
            onChange={(event) => setprodID(event.target.value)}
          />
        </Grid>

        <Grid item>
          <TextField
            id="Name"
            label="Item Name"
            variant="outlined"
            onChange={(event) => setprodName(event.target.value)}
          />
        </Grid>

        <Grid item>
          <TextField
            id="Brand"
            label="Brand Name"
            variant="outlined"
            onChange={(event) => setprodBrand(event.target.value)}
          />
        </Grid>
        <Grid item>
          <TextField
            id="Supplier"
            label="Supplier"
            variant="outlined"
            onChange={(event) => setprodSupplier(event.target.value)}
          />
        </Grid>
        <Grid item>
          <TextField
            id="Category"
            label="Category"
            variant="outlined"
            onChange={(event) => setprodCategory(event.target.value)}
          />
        </Grid>
        <Grid item>
          <TextField
            id="Quantity"
            label="Quantity"
            variant="outlined"
            onChange={(event) => setprodQuantity(event.target.value)}
          />
        </Grid>

        <Button variant="contained" color="primary" onClick={performSearch} >
          Search
        </Button>

      </Grid>

      <Grid>
        <TablePagination
          rowsPerPageOptions={[5, 10, 15, 25, 50, 100]}
          component="div"
          count={100}
          rowsPerPage={limit}
          page={page}

          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChange}
        />

      </Grid>

      <TableContainer style={{ marginTop: 20 }} component={Paper} >
        <Table aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell className={classes.headerCell}><h4>Product ID</h4></TableCell>
              <TableCell className={classes.headerCell}><h4>Product Name</h4></TableCell>
              <TableCell className={classes.headerCell}><h4>Brand</h4></TableCell>
              <TableCell className={classes.headerCell}><h4>Supplier</h4></TableCell>
              <TableCell className={classes.headerCell}><h4>Category</h4></TableCell>
              <TableCell className={classes.headerCell}><h4>Quantity</h4></TableCell>

            </TableRow>
          </TableHead>
          <TableBody>
            {searchData.map((row) => (
              <TableRow>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.item}</TableCell>
                <TableCell>{row.brand}</TableCell>
                <TableCell>{row.supplier}</TableCell>
                <TableCell>{row.category}</TableCell>
                <TableCell>{row.quantity}</TableCell>
              </TableRow>

            ))}

          </TableBody>
        </Table>
      </TableContainer>

    </div>
  );
};

export default Search;
