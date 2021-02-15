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

function DeleteProductPage() {
  const classes = useStyles();
  const [toDeleteProduct, setToDeleteProduct] = useState({
    id: "",
    item: "",
    brand: "",
    supplier: "",
    category: "",
    quantity: "",
  });
  const [prodId, setprodID] = useState("");

  const keyPressHandler = (event) => {
    if (event.key === "Enter") {
      performSearchForDelete();
    }
  };

  const performSearchForDelete = () => {
    const body = {};
    body.id = prodId;

    const deletefindOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    };

    fetch("/product/findbyfield", deletefindOptions)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        // setSearchData(data);
        setToDeleteProduct(data[0]);
      });
  };

  const bigKahuna = () => {
    // const body = {};

    const deleteRecord = {
      method: "DELETE",
    };

    fetch(`/product/delete/${toDeleteProduct._id}`, deleteRecord)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        setToDeleteProduct({
          id: "",
          item: "",
          brand: "",
          supplier: "",
          category: "",
          quantity: "",
        });
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
            onKeyPress={keyPressHandler}
          />
        </Grid>
        <Button
          variant="contained"
          color="primary"
          onClick={performSearchForDelete}
        >
          Enter Confirm Product
        </Button>
        <TableContainer style={{ marginTop: 20 }} component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell className={classes.headerCell}>Product ID</TableCell>
                <TableCell className={classes.headerCell}>
                  Product Name
                </TableCell>
                <TableCell className={classes.headerCell}>Brand</TableCell>
                <TableCell className={classes.headerCell}>Supplier</TableCell>
                <TableCell className={classes.headerCell}>Category</TableCell>
                <TableCell className={classes.headerCell}>
                  Current Quantity
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>{toDeleteProduct.id}</TableCell>
                <TableCell>{toDeleteProduct.item}</TableCell>
                <TableCell>{toDeleteProduct.brand}</TableCell>
                <TableCell>{toDeleteProduct.supplier}</TableCell>
                <TableCell>{toDeleteProduct.category}</TableCell>
                <TableCell>{toDeleteProduct.quantity}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <Button variant="contained" color="primary" onClick={bigKahuna}>
          Delete Item Sure ?
        </Button>
      </Grid>
    </div>
  );
}

export default DeleteProductPage;
