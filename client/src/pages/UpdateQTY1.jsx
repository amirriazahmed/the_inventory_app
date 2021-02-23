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
import { Formik, Form } from "formik";
import * as yup from "yup";

const useStyles = makeStyles({
  headerCell: {
    color: "red",
    // fontWeight: "bold",
    fontSize: 21,
  },
  button: {
    maxWidth: 228,
    minWidth: 228,
    marginTop: 15,
    marginBottom: 15,
  },
  textField: {
    backgroundColor: "FloralWhite",
    color: "FloralWhite",
  },
  headerCell2: {    
    fontSize: 16,
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
  const [buttonPressed, setButtonPressed] = useState("");

  const validationQuantitySchema = yup.object({
    CompanyIdInput: yup
      .number("Must enter a number")
      .typeError("Must be a number not letters")
      .integer("Must enter a whole number")
      .moreThan(0, "Must enter whole numbers greater than zero")
      .required("Must enter a whole number"),
    Receiving: yup
      .number("Must enter a number")
      .typeError("Must be a number not letters")
      .integer("Must enter a whole number")
      .moreThan(0, "Must enter whole numbers greater than zero"),
    Issuing: yup
      .number("Must enter a number")
      .typeError("Must be a number not letters")
      .integer("Must enter a whole number")
      .moreThan(0, "Must enter whole numbers greater than zero")
      .lessThan(
        prodQuantity,
        "Must be less than or equal the Quantity onStock"
      ),
  });

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
        setCurrentProduct(data[0]);
        setprodQuantity(data[0].quantity + 1);
      });
  };

  let options = ["Receiving", "Issuing"];
  const receiveOrIssueItem = (inventoryIn, inventoryOut) => {
    const body = {};
    body.updateQuantityBy = 0;
    if (inventoryIn !== "") {
      body.updateQuantityBy = parseInt(inventoryIn) + body.updateQuantityBy;
    }
    if (inventoryOut !== "") {
      body.updateQuantityBy =
        parseInt(inventoryOut) * -1 + body.updateQuantityBy;
    }

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
      enableReinitialize={true}
      validationSchema={validationQuantitySchema}
      onSubmit={(values, formikBag) => {
        let setFieldValue = formikBag.setFieldValue;
        console.log(values);
        if (buttonPressed === "search") {
          console.log("hi");
          performSearch(values.CompanyIdInput);
        } else {
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
        <Form onSubmit={handleSubmit}>
          <div>
            <center>
              <div>
              <h1> Make your selection for Quantity update</h1>
              {options.map((select) => (
                <>
                  <input
                    type="radio"
                    value={select}
                    name="radiovalues"
                    onChange={(e) => setSelectedOption(e.target.value)}
                  />
                  <b style={{ color: "blue", fontSize: 18 }}> {select}</b>
                </>
              ))}
              </div>
              <div style={{ height:40, margin: 10}}>
              <h2 style={{ color: "green" }}>{selectedOption}</h2>
              </div>
            </center>

            <Grid
              container
              direction="column"
              justify="space-around"
              spacing={1}
            >
              <Grid item>
                <TextField className={classes.textField}
                  id="CompanyIdInput"
                  label="Internal ID"
                  variant="outlined"
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
                className={classes.button}
                variant="contained"
                color="primary"
                onClick={(e) => {
                  setButtonPressed("search");

                  handleSubmit(e);
                }}
                disabled={errors.CompanyIdInput || values.CompanyIdInput === ""}
              >
                Confirm Product ID
              </Button>

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
                      <TableCell className={classes.headerCell2}  >{currentProduct.id}</TableCell>
                      <TableCell className={classes.headerCell2}>{currentProduct.item}</TableCell>
                      <TableCell className={classes.headerCell2}>{currentProduct.brand}</TableCell>
                      <TableCell className={classes.headerCell2}>{currentProduct.supplier}</TableCell>
                      <TableCell className={classes.headerCell2}>{currentProduct.category}</TableCell>
                      <TableCell className={classes.headerCell2}>{currentProduct.quantity}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
              {isReceiving ? (
                <>
                  <Grid item>
                    <TextField className={classes.textField}
                      id="Receiving"
                      label="Receiving"
                      variant="outlined"
                      value={values.Receiving}
                      onBlur={handleBlur}
                      onChange={(event) => {
                        handleChange(event);
                      }}
                      error={!!errors.Receiving}
                      helperText={errors.Receiving}
                    />
                  </Grid>
                  <Button
                    className={classes.button}
                    variant="contained"
                    color="primary"
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
                </>
              ) : (
                <>
                  <Grid item>
                    <TextField className={classes.textField}
                      id="Issuing"
                      label="Issuing"
                      variant="outlined"
                      value={values.Issuing}
                      onBlur={handleBlur}
                      onChange={(event) => {
                        handleChange(event);
                      }}
                      error={!!errors.Issuing}
                      helperText={errors.Issuing}
                    />
                  </Grid>
                  <Button
                    className={classes.button}
                    variant="contained"
                    color="primary"
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
                </>
              )}
            </Grid>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default ChangeQuantity;
