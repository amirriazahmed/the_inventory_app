import React from "react";
import Footer from "../components/Footer"
import Image from "../img/5.jpg";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({

}));

const Home = props => {
  return <div>
    <div className="imgContainer" style={{ color: "darkblue" }}>
      <img src={Image} style={{ width: '100%', height: '90vh' }} />
      <div className="appDescription" style={{ position: "absolute", top: "10%", left: "10%", fontSize: 44, textAlign: "center", fontFamily: "Impact" }}>
        <h2>Aknots Oil Services Ltd.</h2>
        <h2>Inventory Control</h2>
        <h2>System</h2>
      </div>
    </div>
    <Footer />
  </div>
};

export default Home;
