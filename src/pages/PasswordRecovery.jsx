import React, { useState } from "react";
import "../assets/PasswordRecovery.css";
import { Grid, Paper, Avatar, TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";

const useStyles = makeStyles((theme) => ({
  btnSignIn: {
    marginTop: "5px 0",
    textTransform: "capitalize",
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
    maxWidth: "500px",
  },
}));
const initialValues = {
  email: "",
  password: "",
};
const PasswordRecovery = () => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const classes = useStyles();

  const paperStyle = {
    padding: 40,
    margin: "20px auto",
  };

  const handleSubmit = (e) => {
    if (validate()) {
      // sigIn();
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };
  const validate = (e) => {
    let temp = {};
    temp.password = values.password ? "" : "this field is required.";

    if (!values.email) {
      temp.email = "this field is required.";
    } else if (!/$^|.+@.+..+/.test(values.email)) {
      temp.email = "E-mail is not valid.";
    }
    setErrors({
      ...temp,
    });

    return Object.values(temp).every((x) => x === "");
  };

  return (
    <Grid item className={classes.gridMain}>
      <Paper elevation={10} style={paperStyle}>
        <Grid item align="center">
          {/** <Avatar className={classes.avatarStyle}>
            <h1>icono</h1>
          </Avatar>*/}
          <h2>icono</h2>
          <h1>Forgot password?</h1>
          <p>
            Please enter the email you use, we’ll help you create a new password
            in two quick steps
          </p>
        </Grid>

        <TextField
          variant="outlined"
          label="Email"
          placeholder=""
          fullWidth
          onChange={handleInputChange}
          name="email"
          value={values.email}
          {...(errors.email && {
            error: true,
            helperText: errors.email,
          })}
          className={classes.textFieldUser}
        />

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
          Reset password
        </Button>
      </Paper>
    </Grid>
  );
};

export default PasswordRecovery;
