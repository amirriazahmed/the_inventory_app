import React, { useState } from "react";
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
  Box,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";

const useStyles = makeStyles({
  headerCell: {
    color: "red",
    // fontWeight: "bold",
    fontSize: 22,
  },
  button: {
    maxWidth: 140,
    minWidth: 140,
  },
  textField: {
    backgroundColor: "FloralWhite",
    color: "FloralWhite",
    // minWidth: "100%",
    // maxWidth: "100%",
    width: "100%",
  },
});

const AddProduct = () => {
  const classes = useStyles();
  const [productAdded, setProductAdded] = useState({
    id: "",
    item: "",
    brand: "",
    supplier: "",
    category: "",
    quantity: "",
  });
  const [prodId, setprodID] = useState("");
  const [prodName, setprodName] = useState("");
  const [prodBrand, setprodBrand] = useState("");
  const [prodSupplier, setprodSupplier] = useState("");
  const [prodCategory, setprodCategory] = useState("");
  const [prodQuantity, setprodQuantity] = useState("");

  const addCollection = () => {
    const body = {};
    body.id = prodId;
    body.item = prodName;
    body.brand = prodBrand;
    body.supplier = prodSupplier;
    body.category = prodCategory;
    body.quantity = prodQuantity;

    const addNewProduct = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    };

    fetch("/product/add", addNewProduct)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.id) {
          setProductAdded(data);
        }
      })
      .catch((err) => {
        console.log("catch error message", err);
      });
  };

  return (
    <div style={{ margin: 30 }}>
      <Grid container direction="row" justify="space-around" spacing={1}>
        <Grid item xs={2}>
          <TextField
            className={classes.textField}
            id="CompanyIdInput"
            label="Internal ID"
            variant="outlined"
            onChange={(event) => setprodID(event.target.value)}
          />
        </Grid>

        <Grid item xs={2}>
          <TextField
            className={classes.textField}
            id="Name"
            label="Item Name"
            variant="outlined"
            onChange={(event) => setprodName(event.target.value)}
          />
        </Grid>

        <Grid item xs={2}>
          <TextField
            className={classes.textField}
            id="Brand"
            label="Brand Name"
            variant="outlined"
            onChange={(event) => setprodBrand(event.target.value)}
          />
        </Grid>
        <Grid item xs={2}>
          <TextField
            className={classes.textField}
            id="Supplier"
            label="Supplier"
            variant="outlined"
            onChange={(event) => setprodSupplier(event.target.value)}
          />
        </Grid>
        <Grid item xs={2}>
          <TextField
            className={classes.textField}
            id="Category"
            label="Category"
            variant="outlined"
            onChange={(event) => setprodCategory(event.target.value)}
          />
        </Grid>
        <Grid item xs={2}>
          <TextField
            className={classes.textField}
            id="Quantity"
            label="Quantity"
            variant="outlined"
            onChange={(event) => setprodQuantity(event.target.value)}
          />
        </Grid>

        <Grid container justify="flex-end">
          <Box pr={6} py={1}>
            <Button
              className={classes.button}
              variant="contained"
              color="primary"
              onClick={addCollection}
            >
              Add Product
            </Button>
          </Box>
        </Grid>
      </Grid>

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
          <TableBody>
            <TableRow>
              <TableCell>{productAdded.id}</TableCell>
              <TableCell>{productAdded.item}</TableCell>
              <TableCell>{productAdded.brand}</TableCell>
              <TableCell>{productAdded.supplier}</TableCell>
              <TableCell>{productAdded.category}</TableCell>
              <TableCell>{productAdded.quantity}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default AddProduct;
