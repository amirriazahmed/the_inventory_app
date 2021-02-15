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
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  headerCell: {
    color: "red",
    fontWeight: "bold",
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
    <div style={{ margin: 5 }}>
      <Grid
        container
        direction="column"
        justify="space-around"
        spacing={1}
        alignItems="flex-start"
      >
        <Grid item xs={12}>
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

        <Button variant="contained" color="primary" onClick={addCollection}>
          Add Product
        </Button>
      </Grid>

      <TableContainer style={{ marginTop: 20 }} component={Paper}>
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
