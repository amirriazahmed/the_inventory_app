import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Button from "@material-ui/core/Button";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { withRouter } from "react-router-dom";
import { Snackbar } from "@material-ui/core";
import MuiAlert from '@material-ui/lab/Alert';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    [theme.breakpoints.down("xs")]: {
      flexGrow: 1,
    },
  },
  headerOptions: {
    display: "flex",
    flex: 1,
    justifyContent: "space-evenly",
  },
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Header = (props) => {
  const { history, loggedInUser, logout } = props;
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));

  const [open2, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClick = (pageURL) => {
    history.push(pageURL);
    setAnchorEl(null);
  };

  const handleButtonClick = (pageURL) => {
    history.push(pageURL);
  };

  const handleButtonLogout = (pageURL) => {
    setOpen(true);

    fetch("/auth/logout")
      .then((response) => {
        console.log("check logout fetch", response);
        logout();
      })

      .catch((error) => {
        console.log("Error trying to logout: ", error);
      });

    /* logout ();
    history.push(pageURL); */
  };

  const menuItems = [
    {
      menuTitle: "LogIn",
      pageURL: "/",
    },
    {
      menuTitle: "Home",
      pageURL: "/home",
    },
    {
      menuTitle: "Inventory",
      pageURL: "/inventory",
    },
    {
      menuTitle: "Search",
      pageURL: "/search",
    },
    {
      menuTitle: "AddProduct",
      pageURL: "/add",
    },
    {
      menuTitle: "update Quantity",
      pageURL: "/updateQTY1",
    },
    {
      menuTitle: "Delete",
      pageURL: "/deleteproductpage",
    },
  ];

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          {isMobile && loggedInUser ? (
            <>
              <IconButton
                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="menu"
                onClick={handleMenu}
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={open}
                onClose={() => setAnchorEl(null)}
              >
                {menuItems.map((menuItem) => {
                  const { menuTitle, pageURL } = menuItem;
                  return (
                    <MenuItem onClick={() => handleMenuClick(pageURL)}>
                      {menuTitle}
                    </MenuItem>
                  );
                })}
              </Menu>
            </>
          ) : (
            loggedInUser && (
              <div className={classes.headerOptions}>
                <Button
                  variant="contained"
                  onClick={() => handleButtonClick("/home")}
                >
                  Home
                </Button>
                <Button
                  variant="contained"
                  onClick={() => handleButtonClick("/inventory")}
                >
                  INVENTORY
                </Button>
                <Button
                  variant="contained"
                  onClick={() => handleButtonClick("/search")}
                >
                  SEARCH
                </Button>
                <Button
                  variant="contained"
                  onClick={() => handleButtonClick("/add")}
                >
                  ADD PRODUCT
                </Button>
                <Button
                  variant="contained"
                  onClick={() => handleButtonClick("/updateQTY1")}
                >
                  UPDATE QUANTITY
                </Button>
                <Button
                  variant="contained"
                  onClick={() => handleButtonClick("/deleteproductpage")}
                >
                  DELETE
                </Button>
                <Button
                  variant="contained"
                  onClick={() => handleButtonLogout("/")}
                >
                  Logout
                </Button>
              </div>
            )
          )}
        </Toolbar>
      </AppBar>

      <Snackbar
        anchorOrigin={{
          vertical: "center",
          horizontal: "center",
        }}
        open={open2}
        severity="success"
        autoHideDuration={2000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="info">
          'Bye! You are logged out!'
        </Alert>
      </Snackbar>
    </div>
  );
};

export default withRouter(Header);
