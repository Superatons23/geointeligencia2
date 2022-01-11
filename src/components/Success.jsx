import React, { useState } from "react";
import "../assets/PasswordRecovery.css";
import {
  Grid,
  Paper,
  Avatar,
  TextField,
  Button,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { confirmPasswordReset, verifyPasswordResetCode } from "firebase/auth";
import Alert from "@mui/material/Alert";
import Collapse from "@mui/material/Collapse";
import { useNavigate, Navigate } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  btnSignIn: {
    marginTop: "5px 0",
    textTransform: "none",
    backgroundColor: "#0070ba",
    "&:hover": {
      backgroundColor: "#005ea6;",
    },
  },
  textFieldUser: {
    marginBottom: "25px ",
    marginTop: "25px",
  },
  avatarStyle: {
    backgroundColor: "#1bbd7e",
    marginBottom: "40px",
  },
  gridMain: {
    maxWidth: "420px",
  },
  typography: {
    margin: "10px 0",
  },
}));
const initialValues = {
  password: "",
};
const Success = () => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const classes = useStyles();
  let navigate = useNavigate();
  const paperStyle = {
    padding: 40,
    margin: "20px auto",
  };

  const handleSubmit = (e) => {
    navigate("/signin", { replace: true });
  };

  return (
    <Grid item className={classes.gridMain}>
      <Paper elevation={10} style={paperStyle}>
        <Grid item align="center">
          {/** <Avatar className={classes.avatarStyle}>
            <h1>icono</h1>
          </Avatar>*/}
          <h2>icono</h2>
          <h1>Password succesfully reset</h1>
        </Grid>

        <Alert severity="success" className={classes.alert}>
          Your account password has been successfully changed
        </Alert>
        <Typography className={classes.typography}>
          You can now sign in with your new password
        </Typography>

        <Button
          type="submit"
          color="primary"
          variant="contained"
          className={classes.btnSignIn}
          fullWidth
          onClick={handleSubmit}
          classes={{
            contained: classes.containedBtnSubmit,
            label: classes.labelBtn,
          }}
        >
          Go to Sign In
        </Button>
      </Paper>
    </Grid>
  );
};

export default Success;
