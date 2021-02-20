import React, { useState } from "react";
import MuiAlert from "@material-ui/lab/Alert";

import {
  Button,
  Snackbar,
  Grid,
  TextField,
} from "@material-ui/core";
import Footer from "../components/Footer";
import Image from "../img/5.jpg";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const LoginPage = ({ setLoggedInUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  const loginHandler = () => {
    fetch("/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: "email=" + email + "&password=" + password,
      credentials: "include",
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          setOpen(true);
          throw new Error("Login failed!");
        }
      })
      .then((user) => {
        setLoggedInUser(user);
      })
      .catch((error) => {
        console.log("Error trying to login: ", error);
      });
  };

  return (
    <div>
      <div className="imgContainer" style={{ color: "darkblue" }}>
        <img alt={"Drill Rig"} src={Image} style={{ width: "100%", height: "90vh" }} />
        <div
          className="appDescription"
          style={{
            position: "absolute",
            top: "10%",
            left: "10%",
            fontSize: 44,
            textAlign: "center",
            fontFamily: "Impact",
          }}
        >
          <h2>Aknots Oil Services Ltd.</h2>
          <h2>Inventory Control</h2>
          <h2>System</h2>
        </div>

        <Grid
          container
          direction="column"
          justify="space-around"
          spacing={1}
          alignItems="flex-start"
          style={{
            position: "fixed",
            padding: 30,
            width: 300,
            right: "5%",
            top: "18%",
            backgroundColor: "lightblue",
          }}
        >
          <Grid item>
            <TextField
              id="email"
              label="Email"
              variant="outlined"
              color="red"
              onChange={(event) => setEmail(event.target.value)}
            />
          </Grid>
          <Grid item>
            <TextField
              id="password"
              label="Password"
              type="password"
              variant="outlined"
              onChange={(event) => setPassword(event.target.value)}
            />
          </Grid>
          <Grid item>
            <Button variant="contained" color="primary" onClick={loginHandler}>
              Login
            </Button>
          </Grid>
          <Snackbar
            anchorOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
            open={open}
            autoHideDuration={2000}
            onClose={handleClose}
          >
            <Alert onClose={handleClose} severity="error">
              Wrong Username/Email or Password. Please try again!
            </Alert>
          </Snackbar>
        </Grid>
      </div>
      <Footer />
    </div>
  );
};

export default LoginPage;
