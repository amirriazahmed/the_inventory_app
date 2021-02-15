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

import { Formik, Form, Field } from "formik";
// import { TextField } from 'formik-material-ui';
import * as yup from "yup";

const useStyles = makeStyles({
  headerCell: {
    color: "red",
    fontWeight: "bold",
  },
});



const ChangeQuantity = () => {
  const classes = useStyles();
  const [currentProduct, setCurrentProduct] = useState({
    id: "",
    item: "",
    brand: "",
    supplier: "",
    category: "",
    quantity: "",
  });
  const [prodId, setprodID] = useState("");
  
  const [selectedOption, setSelectedOption] = useState();
  const [prodQuantity, setprodQuantity] = useState("");
  const [receiving, setReceiving] = useState("");
  const [issuing, setIssuing] = useState("");
  const [loading, setLoading] = useState(false);
  const [formikKey, setFormikKey] = useState(0);

  const [buttonPressed, setButtonPressed] = useState("");

  const validationQuantitySchema = yup.object({
    CompanyIdInput: yup
      .number("must enter a number")
      .typeError("Must be a number not letters")
      .integer("Must enter a whole number")
      .moreThan(0, "Must enter whole numbers greater than zero")
      .required("Must enter a whole number"),
    Receiving: yup
      .number("must enter a number")
      .typeError("Must be a number not letters")
      .integer("Must enter a whole number")
      .moreThan(0, "Must enter whole numbers greater than zero"),
    Issuing: yup
      .number("must enter a number")
      .typeError("Must be a number not letters")
      .integer("Must enter a whole number")
      .moreThan(0, "Must enter whole numbers greater than zero")
      .lessThan(prodQuantity ,'Must be less than or equal the Quantity onStock')
  });
  /* const changeQtyofItem = () => {
    const body = {};
      body.id = prodId;
      body.quantity = prodQuantity;
    
    const updateQuantity = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    };

    fetch("/product/changequantity", updateQuantity)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.id) {
          setCurrentProduct(data);
        }
        
      })
      .catch(err => {
        console.log('catch error message',err)
      });

  } */

  const keyPressHandler = (event) => {
    if (event.key === "Enter") {
      setTimeout(performSearch, 5000);
    }
  };

  const performSearch = (internalId) => {
    const body = {};
    body.id = internalId;

    const postOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    };

    fetch("/product/findbyfield", postOptions)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        // setSearchData(data);
        setCurrentProduct(data[0]);
        setprodQuantity(data[0].quantity + 1);
      });
  };

  let options = ["Receiving", "Issuing"];
  const receiveOrIssueItem = (inventoryIn, inventoryOut) => {
    const body = {};
    //   body.id = prodId;
    //   body.quantity = prodQuantity;
    body.updateQuantityBy = 0;
    if (inventoryIn !== "") {
      body.updateQuantityBy = parseInt(inventoryIn) + body.updateQuantityBy;
    }
    if (inventoryOut !== "") {
      body.updateQuantityBy =
        parseInt(inventoryOut) * -1 + body.updateQuantityBy;
    }

    /* yup.object({Issuing: yup.number('must enter a number')
            .lessThan(body.quantity,'Must be less than available quantity')
        )} */
    /*  if (parseInt(inventoryOut) > (body.quantity)) {
          console.log(inventoryOut,body.quantity);
                
          <div>
            <h1> The required Quantity is not available on stock</h1>;
          </div>}
       */

    const updateQuantity = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    };

    fetch(`/product/changequantity/${currentProduct._id}`, updateQuantity)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.id) {
          setCurrentProduct(data);
        }
      })
      .catch((err) => {
        console.log("catch error message", err);
      });
  };
  let isReceiving = selectedOption === "Receiving";

  return (
    <Formik
      // key = {formikKey}
      enableReinitialize={true}
      validationSchema={validationQuantitySchema}
      onSubmit={(values, formikBag) => {
        let setFieldValue = formikBag.setFieldValue;
        console.log(values);
        if (buttonPressed === "search") {
          console.log("hi");
          performSearch(values.CompanyIdInput);
        } else {
          // this.resetParkingLot();
          receiveOrIssueItem(values.Receiving, values.Issuing);
          setFieldValue("Receiving", "");
          setFieldValue("Issuing", "");
        }
      }}
      initialValues={{
        CompanyIdInput: prodId,
        Receiving: receiving,
        Issuing: issuing,
      }}
    >
      {({
        handleSubmit,
        submitForm,
        handleChange,
        handleBlur,
        values,
        touched,
        isValid,
        errors,
      }) => (
        <Form
          // noValidate
          onSubmit={handleSubmit}
        >
          <div style={{ margin: 5 }}>
            <center>
              <h1> Make your selection for Quantity update</h1>
              {options.map((select) => (
                <>
                  <input
                    type="radio"
                    value={select}
                    name="radiovalues"
                    onChange={(e) => setSelectedOption(e.target.value)}
                  />
                  <b style={{ color: "blue" }}> {select}</b>
                </>
              ))}

              <h2 style={{ color: "green" }}>{selectedOption}</h2>
            </center>

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
                  // onChange={(event) => setprodID(event.target.value)}
                  // onKeyPress={keyPressHandler}
                  value={values.CompanyIdInput}
                  onBlur={handleBlur}
                  onChange={(event) => {
                    handleChange(event);
                  }}
                  error={!!errors.CompanyIdInput}
                  helperText={errors.CompanyIdInput}
                />
              </Grid>
              <Button
                variant="contained"
                color="primary"
                // onClick={performSearch}
                onClick={(e) => {
                  setButtonPressed("search");

                  handleSubmit(e);
                }}
                disabled={errors.CompanyIdInput || values.CompanyIdInput === ""}
              >
                Enter Confirm Product
              </Button>
              

              <TableContainer style={{ marginTop: 20 }} component={Paper}>
                <Table aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell className={classes.headerCell}>
                        Product ID
                      </TableCell>
                      <TableCell className={classes.headerCell}>
                        Product Name
                      </TableCell>
                      <TableCell className={classes.headerCell}>
                        Brand
                      </TableCell>
                      <TableCell className={classes.headerCell}>
                        Supplier
                      </TableCell>
                      <TableCell className={classes.headerCell}>
                        Category
                      </TableCell>
                      <TableCell className={classes.headerCell}>
                        Current Quantity
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>{currentProduct.id}</TableCell>
                      <TableCell>{currentProduct.item}</TableCell>
                      <TableCell>{currentProduct.brand}</TableCell>
                      <TableCell>{currentProduct.supplier}</TableCell>
                      <TableCell>{currentProduct.category}</TableCell>
                      <TableCell>{currentProduct.quantity}</TableCell>
                    </TableRow>
                    {/* ))} */}
                  </TableBody>
                </Table>
              </TableContainer>
              {/* <Grid item>
            <TextField
              id="Quantity"
              label="Quantity"
              variant="outlined"
              onChange={(event) => setprodQuantity(event.target.value)}
            />
          </Grid>

          <Button variant="contained" color="primary" onClick={changeQtyofItem}>
            Change Quantity
          </Button> */}
              {isReceiving ? (
                <div>
                  <br></br>
                  <center>
                    <Grid item>
                      <TextField
                        id="Receiving"
                        label="Receiving"
                        variant="outlined"
                        color="primary"
                        // onChange={(event) => setReceiving(event.target.value)}
                        value={values.Receiving}
                        onBlur={handleBlur}
                        onChange={(event) => {
                          handleChange(event);
                        }}
                        error={!!errors.Receiving}
                        helperText={errors.Receiving}
                      />
                      <br></br>
                      <br></br>
                    </Grid>
                    <Button
                      variant="contained"
                      color="primary"
                      // onClick={receiveOrIssueItem}
                      onClick={(e) => {
                        setButtonPressed("updateValueQty");

                        handleSubmit(e);
                      }}
                      disabled={
                        errors.Receiving ||
                        errors.Issuing ||
                        (values.Receiving === "" && values.Issuing === "")
                      }
                    >
                      Update Quantity
                    </Button>
                  </center>
                </div>
              ) : (
                <div>
                  <br></br>
                  <center>
                    <Grid item>
                      <TextField
                        id="Issuing"
                        label="Issuing"
                        variant="outlined"
                        color="primary"
                        // onChange={(event) => setIssuing(event.target.value)}
                        value={values.Issuing}
                        onBlur={handleBlur}
                        onChange={(event) => {
                          handleChange(event);
                        }}
                        error={!!errors.Issuing}
                        helperText={errors.Issuing}
                      />
                      <br></br>
                      <br></br>
                    </Grid>
                    <Button
                      variant="contained"
                      color="primary"
                      // onClick={receiveOrIssueItem}
                      onClick={(e) => {
                        setButtonPressed("updateValueQty");

                        handleSubmit(e);
                      }}
                      disabled={
                        errors.Receiving ||
                        errors.Issuing ||
                        (values.Receiving === "" && values.Issuing === "")
                      }
                    >
                      Update Quantity
                    </Button>
                  </center>
                </div>
              )}
            </Grid>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default ChangeQuantity;
