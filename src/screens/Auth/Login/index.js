import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import {
  Grid,
  CircularProgress,
  Typography,
  Button,
  TextField,
} from 'components/Muicore';
import { Link, useHistory } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";

import useStyles from "mytheme/AuthStyle";
import config from "config/";
import Msg from "config/ValidationMessages";

import { DocumentHead, CustomButton} from 'components/';
import { UserActions, CommonActions } from "store/actions/";


const Login: React.FC = () => {
  var classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const common = useSelector((state) => state.common);

  React.useEffect(() => {
    var myDate = new Date();
    var hrs = myDate.getHours();

    var greet = 'Good Morning';;

	if (hrs >= 12 && hrs <= 17)
        greet = 'Good Afternoon';
    else if (hrs >= 17 && hrs <= 24)
        greet = 'Good Evening';

    setGreet(greet);
  });

  const { handleSubmit, reset, control, errors } = useForm({});
  var [greet, setGreet] = React.useState('Good Morning');

  const loginSubmit = (data) => { 
    const user = {
      username: data.username,
      password: btoa(data.password)
    }
    UserActions.login(user).then((res) => {
      // console.log("res", res);
        if(res.status == 200){
          if(res.data.status==200){
            dispatch(UserActions.loginSuccess(res.data.data));
          }
        }else{
          CommonActions.showSnackbar({open:true, color: 'danger', message:res.response.data.message});
        }
    });
  }

  return (
    <Grid container className={classes.container}>
      <DocumentHead title="Login" />
      
      <div className={classes.leftContainer}>
      </div>
      <div className={classes.rightContainer}>
        <div className={classes.form}>
            <React.Fragment>
              <div className={classes.logoContainer}>
                <img src={config.appLogo} alt="logo" className={classes.logoImage} />
              </div>
              <Typography variant="h2" className={classes.greeting}>
                {greet}, User
              </Typography>
              <form onSubmit={handleSubmit(loginSubmit)}>
                <Controller
                  as={
                    <TextField />
                  }
                  autoFocus
                  fullWidth
                  error={errors.username ? true:false}
                  helperText={errors.username && errors.username.message} 
                  rules={{...Msg.required}}
                  name="username"
                  type="text"
                  defaultValue={""}
                  label="Email"
                  control={control}
                  className={classes.textField}
                />

                <Controller
                  as={
                    <TextField />
                  }
                  fullWidth
                  error={errors.password ? true:false}
                  helperText={errors.password && errors.password.message} 
                  rules={{...Msg.required}}
                  name="password"
                  type="password"
                  defaultValue={""}
                  label="Password"
                  control={control}
                  className={classes.textField}
                />

              <div className={classes.formButtons}>
                {common.showSubLoader ? (
                  <CircularProgress size={26} className={classes.loginLoader} />
                ) : (
                  <CustomButton
                    type="submit"
                    color="secondary"
                  >
                    Login
                  </CustomButton>
                )}
                <Link className={classes.forgetButton} to="/forgot-password">Forgot Password</Link>
              </div>
             </form>
            </React.Fragment>
        </div>
        <Typography className={classes.copyright}>
          © 2020 {config.companyName}. All rights reserved.
        </Typography>
      </div>
    </Grid>
  );
};

export default Login;
