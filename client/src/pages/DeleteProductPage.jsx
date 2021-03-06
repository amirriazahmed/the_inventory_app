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
import InputLabel from "@material-ui/core/InputLabel";

const useStyles = makeStyles({
  headerCell: {
    color: "red",
    // fontWeight: "bold",
    fontSize: 20,
  },
  button: {
    maxWidth: 228,
    minWidth: 228,
    marginTop: 20,
    marginBottom: 20,
  },
  textField: {
    backgroundColor: "FloralWhite",
    transition: "none",
  },
  headerCell2: {    
    fontSize: 16,
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
    <div style={{ margin: 40 }}>
      <Grid
        container
        direction="column"
        justify="space-around"
        spacing={1}
        alignItems="flex-start"
      >
        <Grid item xs={12}>
          <TextField
            className={classes.textField}
            id="CompanyIdInput"
            label="Internal ID"
            variant="outlined"
            onChange={(event) => setprodID(event.target.value)}
            onKeyPress={keyPressHandler}
          />
        </Grid>
        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          onClick={performSearchForDelete}
        >
          Confirm Product ID
        </Button>
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
              <TableCell className={classes.headerCell}>
                Current Quantity
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell className={classes.headerCell2}>{toDeleteProduct.id}</TableCell>
              <TableCell className={classes.headerCell2}>{toDeleteProduct.item}</TableCell>
              <TableCell className={classes.headerCell2}>{toDeleteProduct.brand}</TableCell>
              <TableCell className={classes.headerCell2}>{toDeleteProduct.supplier}</TableCell>
              <TableCell className={classes.headerCell2}>{toDeleteProduct.category}</TableCell>
              <TableCell className={classes.headerCell2}>{toDeleteProduct.quantity}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Button
        className={classes.button}
        variant="contained"
        color="primary"
        onClick={bigKahuna}
        size={"large"}
      >
        Delete Item?
      </Button>
    </div>
  );
}

export default DeleteProductPage;
