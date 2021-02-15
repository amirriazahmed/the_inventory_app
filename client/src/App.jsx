import React, { useState } from "react";
import "./styles.css";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Header from "./Header";
import UpdateQTY1 from "./pages/UpdateQTY1";

import { Route, Switch, Redirect } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import AddProductPage from "./pages/AddProductPage";
import ProductsTable from "./pages/ProductsTable";
import Quantity from "./pages/Quantity";
import Footer from "./components/Footer";
import DeleteProductPage from "./pages/DeleteProductPage";
import LoginPage from "./pages/LoginPage";

const useStyles = makeStyles({});

// const product_list = [{ id: 1, item: 'Drill Bit' , quantity: 11, supplier: "Andreis Shop", brand: "Smith Bits", category:"Bits" },
//   { id: 2, item: 'Drill Collar', quantity: 5, supplier: "Toms Shop", brand: "Smith Bits", category:"Pipe" },
//   { id: 3, item: 'Retainer', quantity: 10, supplier: "Oil Field Express", brand: "Baker Hughes", category:"Plugs" },
//   { id: 4, item: 'Stabilizer',quantity: 14, supplier: "Oil Field Express", brand: "Schlumberger", category:"Pipe" }];

export default function App() {
  // const [inventory, setInventory] = useState(product_list);
  const [inventory, setInventory] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState();

  const logout = () => {
    setLoggedInUser(undefined);
  };

  const classes = useStyles();
  return (
    <div className={classes.container}>
      <Header loggedInUser={loggedInUser} logout={logout} />
      <Switch>
        <Route
          exact
          path="/"
          render={(props) =>
            !loggedInUser ? (
              <LoginPage {...props} setLoggedInUser={setLoggedInUser} />
            ) : (
              <Redirect to={{ pathname: "/home" }} />
            )
          }
        />

        {loggedInUser ? (
          <>
            <Route exact path="/home" render={(props) => <Home {...props} />} />
            <Route
              exact
              path="/inventory"
              render={(props) => (
                <ProductsTable {...props} inventory={inventory} />
              )}
            />
            <Route
              exact
              path="/search"
              render={(props) => <Search {...props} />}
            />
            <Route
              exact
              path="/add"
              render={(props) => (
                <AddProductPage {...props} triggerInventory={setInventory} />
              )}
            />
            <Route
              exact
              path="/UpdateQTY1"
              render={(props) => (
                <UpdateQTY1
                  {...props}
                  setInventory={setInventory}
                  inventory={inventory}
                />
              )}
            />
            <Route
              exact
              path="/Quantity"
              render={(props) => <Quantity {...props} />}
            />
            <Route
              exact
              path="/DeleteProductPage"
              render={(props) => <DeleteProductPage {...props} />}
            />
          </>
        ) : (
          <Redirect to={{ pathname: "/" }} />
        )}
      </Switch>
    </div>
  );
}
