import React from "react";
import Footer from "../components/Footer";
import Image from "../img/5.jpg";
// import { makeStyles } from "@material-ui/core/styles";
import MuiAlert from "@material-ui/lab/Alert";
import { Snackbar } from "@material-ui/core";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Home = (props) => {
  const [open, setOpen] = React.useState(true);
  const handleClose = () => {
    setOpen(false);
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
        <Snackbar
          anchorOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          open={open}
          autoHideDuration={2000}
          onClose={handleClose}
        >
          <Alert onClose={handleClose} severity="success">
            Welcome! You are logged in!
          </Alert>
        </Snackbar>

      </div>
        {/* <Snackbar
          anchorOrigin={{
            vertical: "center",
            horizontal: "center",
          }}
          open={open}
          autoHideDuration={2000}
          onClose={handleClose}
        >
          <Alert onClose={handleClose} severity="success">
            Welcome! You are logged in!
          </Alert>
        </Snackbar> */}
      <Footer />
    </div>
  );
};

export default Home;
