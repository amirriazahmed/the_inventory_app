import React, { useState } from "react";

import {
  Button,
  Snackbar,
  Grid,
  TextField,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { MailOutlineRounded } from "@material-ui/icons";
import { set } from "mongoose";

const LoginPage = ({setLoggedInUser}) => {

    const [email,setEmail] = useState ("");
    const [password,setPassword] = useState ("");

    const [open, setOpen] = React.useState(false)
    const handleClose =() => {
      setOpen(false)
    }
  

const loginHandler = () => {
      
    fetch('/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: 'email='+email+'&password='+password,
      credentials: 'include'
    })
    .then((response) => {
      if (response.status === 200) {
        return response.json()
      }
      else {
        
        setOpen(true);
        throw new Error('Login failed!'); 
                
      }
    })
    .then((user) => {
      setLoggedInUser(user)
    })
    .catch((error) => {
      console.log('Error trying to login: ', error)
    })   
    
}

  return (
    <Grid
    container
          direction="column"
          justify="space-around"
          spacing={1}
          alignItems="flex-start"
          style= {{margin:5}}
    >
      <Grid item>
        <TextField
          id="email"
          label="Email"
          variant="outlined"
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

      <Button variant="contained" color="primary" onClick={loginHandler}>
        Login
      </Button>

      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
        open={open}
        autoHideDuration={1500}
        onClose={handleClose}
        message='Wrong Username password. Please try again!'
      />
     
    </Grid>
  );
};

export default LoginPage;
