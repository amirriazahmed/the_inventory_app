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
  Select,
  MenuItem,
  Box,
  NativeSelect,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import TablePagination from "@material-ui/core/TablePagination";
import { Formik, Form, Field } from "formik";
import * as yup from "yup";
import { string } from "yup/lib/locale";

const useStyles = makeStyles((theme) => ({
  button: {
    display: "block",
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
  const [brandList, setBrandList] = useState([]);
  const [supplierList, setSupplierList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);

  useEffect(() => {
    let getBrands = async () => {
      let response = await fetch("/product/brands");
      let data = await response.json();
      console.log("brandlist:", data);
      setBrandList(data);
    };
    getBrands();
  }, []);

  useEffect(() => {
    let getSuppliers = async () => {
      let response = await fetch("/product/suppliers");
      let data = await response.json();
      console.log("supplierlist:", data);
      setSupplierList(data);
    };
    getSuppliers();
  }, []);

  useEffect(() => {
    let getCategories = async () => {
      let response = await fetch("/product/categories");
      let data = await response.json();
      console.log("categorylist:", data);
      setCategoryList(data);
    };
    getCategories();
  }, []);

  const [page, setPage] = React.useState(0);

  const [limit, setLimit] = React.useState(5);
  const [buttonPressed, setButtonPressed] = useState("");

  const validationSearchSchema = yup.object({
    CompanyIdInput: yup
      .number("Must enter a number")
      .typeError("Must be a number not letters")
      .integer("Must enter a whole number")
      .moreThan(0, "Must enter whole numbers greater than zero"),
    //    .required("Must enter a whole number"),
    ProdQuantity: yup
      .number("Must enter a number")
      .typeError("Must be a number not letters")
      .integer("Must enter a whole number")
      .moreThan(0, "Must enter whole numbers greater than zero"),
  });
  /*  ProdBrand: yup
      //   .string("must enter a String")
      .string()
      .matches(
        /Smith|Baker Hughes|Schlumberger|Weatherford/,
        "Must Match one of the following Brands,'Smith','Baker Hughes','Schlumberger' ,'Weatherford' "
      ),
    ProdSupplier: yup
      //   .string("must enter a String")
      .string()
      .matches(
        /Toms shop|Oil Field Express|Oil Tech Supply/,
        "Must Match one of the following Suppliers,'Toms shop','Oil Field Express','Oil Tech Supply', 'Andrets Shoop"
      ),
    ProdCtegory: yup
      //   .string("must enter a String")
      .string()
      .matches(
        /Bit|Pipe|Plug/,
        "Must Match one of the following Categories,'Bit','Pipe','Plug'"
      ),
  }); */

  const handleChange1 = (event) => {
    setLimit(parseInt(event.target.value, 10));
    setPage(0);
    setDoSearch(true);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    setDoSearch(true);
  };

  // const performSearch = (internalID,IProdBrand,IProdSupplier,IProdCategory) => {
  const performSearch = (
    prodId,
    prodName,
    prodBrand,
    prodSupplier,
    prodCategory
  ) => {
    console.log("performing a search");
    const bodyValues = {};
    bodyValues.search = {};
    if (prodId !== "") {
      bodyValues.search.id = prodId;
    }
    if (prodName !== "") {
      bodyValues.search.item = prodName;
    }
    console.log("ProdBrand=", prodBrand);
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
    console.log("Post options:", postOptions);
    fetch("/product/bigsearch", postOptions)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setSearchData(data);
      });
  };

  useEffect(() => {
    if (doSearch) {
      performSearch(prodId, prodName, prodBrand, prodSupplier, prodCategory);
      setDoSearch(false);
    }
  }, [doSearch]);

  console.log("brandList:", brandList);

  return (
    <Formik
      enableReinitialize={true}
      validationSchema={validationSearchSchema}
      onSubmit={(values, formikBag) => {
        let setFieldValue = formikBag.setFieldValue;
        let setSubmitting = formikBag.setSubmitting;
        console.log("submission Values", values);
        console.log("button pressed Values", buttonPressed);
        if (buttonPressed === "search") {
          console.log("hi");
          performSearch(
            prodId,
            prodName,
            prodBrand,
            prodSupplier,
            prodCategory
          );
          //  setFieldValue("CompanyIdInput", "");
          //  setFieldValue("ProdBrand", "");
          //  setFieldValue("ProdSupplier", "");
          //  setFieldValue("ProdCategory", "");
        }
        setSubmitting(false);
      }}
      initialValues={{
        CompanyIdInput: prodId,
        ProdBrand: prodBrand,
        ProdSupplier: prodSupplier,
        ProdCategory: prodCategory,
        ProdQuantity: prodQuantity,
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
      }) => {
        let buttondisabled =
          errors.ProdBrand &&
          values.ProdBrand === "" &&
          errors.ProdSupplier &&
          values.ProdSupplier === "" &&
          errors.ProdCategory &&
          values.ProdCategory === "";
        return (
          <Form onSubmit={handleSubmit}>
            {/*   {let  CompanyIdInput = "",
        ProdBrand = "",
        ProdSupplier = "",
        ProdCategory = "",
        ProdQuantity = "",}  */}

            <div style={{ margin: 5 }}>
              <Grid
                container
                direction="row"
                justify="space-around"
                spacing={1}
                alignItems="flex-start"
              >
                <Grid item>
                  <TextField
                    id="CompanyIdInput"
                    label="Internal ID"
                    variant="outlined"
                    value={values.CompanyIdInput}
                    onBlur={handleBlur}
                    onChange={(event) => {
                      setprodID(event.target.value);
                      handleChange(event);
                    }}
                    error={!!errors.CompanyIdInput}
                    helperText={errors.CompanyIdInput}
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
                    variant="outlined"
                    id="Brand"
                    labelId="Brand Name"
                    select
                    // labelId="Brand Name"
                    // variant="outlined"
                    value={values.ProdBrand}
                    // onBlur={handleBlur}
                    onChange={(event) => {
                      setprodBrand(event.target.value);
                      handleChange(event);
                    }}
                    // error={!!errors.ProdBrand}
                    // helperText={errors.ProdBrand}
                  >
                    {brandList.map((brand) => {
                      return <MenuItem value={brand}>{brand}</MenuItem>;
                    })}
                  </TextField>
                </Grid>

                {/*  {.selBox{
                width: 470px ;
                 height: 40px;
                }} */}
                <Grid item>
                  <Select
                    id="Supplier"
                    labelId="Supplier"
                    //   variant="outlined"
                    value={values.ProdSupplier}
                    //    onBlur={handleBlur}
                    onChange={(event) => {
                      setprodSupplier(event.target.value);
                      handleChange(event);
                    }}
                    //   error={!!errors.ProdSupplier}
                    //   helperText={errors.ProdSupplier}
                  >
                    {supplierList.map((supplier) => {
                      return <MenuItem value={supplier}>{supplier}</MenuItem>;
                    })}
                  </Select>
                </Grid>
                <Grid item>
                  <Select
                    id="Category"
                    labelId="Category"
                    //  variant="outlined"
                    value={values.ProdCategory}
                    //   onBlur={handleBlur}
                    onChange={(event) => {
                      setprodCategory(event.target.value);
                      handleChange(event);
                    }}
                    //   error={!!errors.ProdCategory}
                    //  helperText={errors.ProdCategory}
                  >
                    {categoryList.map((category) => {
                      return <MenuItem value={category}>{category}</MenuItem>;
                    })}
                  </Select>
                </Grid>
                <Grid item>
                  <TextField
                    id="Quantity"
                    label="Quantity"
                    variant="outlined"
                    onChange={(event) => setprodQuantity(event.target.value)}
                  />
                </Grid>

                <Grid container justify="flex-end">
                  <Box pr={6} py={1}>
                    <Button
                      type="button"
                      variant="contained"
                      color="primary"
                      // onClick={performSearch}
                      onClick={(e) => {
                        setButtonPressed("search");
                        handleSubmit(e);
                      }}
                      disabled={buttondisabled}
                    >
                      Search
                    </Button>
                  </Box>
                </Grid>
              </Grid>

              <Grid>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 15, 25, 50, 100]}
                  component="div"
                  count={100}
                  rowsPerPage={limit}
                  page={page}
                  onChangePage={handleChangePage}
                  onChangeRowsPerPage={handleChange1}
                />
              </Grid>

              <TableContainer
                component={Paper}
                style={{
                  width: "auto",
                  margin: "10px",
                  boxShadow: "0 3px 5px 2px rgba(60, 60, 200, .5)",
                  marginTop: 20,
                }}
              >
                <Table aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell className={classes.headerCell}>
                        <h4>Product ID</h4>
                      </TableCell>
                      <TableCell className={classes.headerCell}>
                        <h4>Product Name</h4>
                      </TableCell>
                      <TableCell className={classes.headerCell}>
                        <h4>Brand</h4>
                      </TableCell>
                      <TableCell className={classes.headerCell}>
                        <h4>Supplier</h4>
                      </TableCell>
                      <TableCell className={classes.headerCell}>
                        <h4>Category</h4>
                      </TableCell>
                      <TableCell className={classes.headerCell}>
                        <h4>Quantity</h4>
                      </TableCell>
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
          </Form>
        );
      }}
    </Formik>
  );
};

export default Search;
