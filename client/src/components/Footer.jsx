import React from "react";
import {
  Grid,
  Paper,
  Icon,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "black",
  },
  paper: {
    padding: theme.spacing(1),
    backgroundColor: "black",
    color: "white",
    fontSize: 16,
  },
  footer: {
    position: "fixed",
    bottom: 0,
    width: "100%",
  },
}));

function Footer() {
  const classes = useStyles();
  return (
    <footer className={classes.footer}>
      <div className={classes.root}>
        <Grid container spacing={0}>
          <Grid item xs={12} sm={6}>
            <Paper className={classes.paper}>
              Developed by the Aknots Group&nbsp;&nbsp; &copy;
              {new Date().getFullYear()}
            </Paper>
          </Grid>

          {/* <Grid item xs={12} sm={6}>
                        <Paper className={classes.paper}>SOCIAL MEDIA ICONS TO BE ADDED HERE</Paper>
                    </Grid> */}

          <Grid item xs={12} sm={6}>
            <Paper className={classes.paper}>
              <Icon>
                <img
                  src={process.env.PUBLIC_URL + '/fb.gif'}
                  height={40}
                  width={40}
                />
              </Icon>
              &nbsp;&nbsp;
              <Icon>
                <img
                  src={process.env.PUBLIC_URL + "/cat.gif"}
                  height={40}
                  width={40}
                />
              </Icon>
              &nbsp;&nbsp;
              <Icon>
                <img
                  src={process.env.PUBLIC_URL + "/link.png"}
                  height={40}
                  width={40}
                />
              </Icon>
              &nbsp;&nbsp;
              <Icon>
                <img
                  src={process.env.PUBLIC_URL + "/bird.jpg"}
                  height={40}
                  width={40}
                />
              </Icon>
              &nbsp;&nbsp;
              <Icon>
                <img
                  src={process.env.PUBLIC_URL + "/email.gif"}
                  height={40}
                  width={40}
                />
              </Icon>
              &nbsp;&nbsp;
            </Paper>
          </Grid>
        </Grid>
      </div>
    </footer>
  );
}

export default Footer;
