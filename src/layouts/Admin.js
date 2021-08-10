import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Switch, Route, Redirect } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

import config from "config/";
import { appRoutes } from "routes/routes.js";
import { Navbar, Sidebar } from 'components/';

import AppStyle from "mytheme/AppStyle";

import { CommonActions } from "store/actions";


let ps;

const switchRoutes = (routes)=>(
  <Switch>
    {routes.map((prop, key) => {
      if (prop.layout === "admin") {
        return (<Route
          path={prop.path}
          component={prop.component}
          key={key}
        />)
      }
      return null;
    })}
    <Redirect from="/" to="/home" />
  </Switch>
);

export default function Admin({ ...rest }) {
  // styles
  const classes = AppStyle();
  const common = useSelector((state) => state.common);
  const _approutes = Object.values(appRoutes);

  const handleDrawerToggle = () => {
    CommonActions.showMobileDrawer(!common.showMobileDrawer);
  };

  const resizeFunction = () => {
    if (window.innerWidth >= 960) {
      CommonActions.showMobileDrawer(false);
    }
  };

  const getRoute = () => {
    return window.location.pathname !== "/admin/maps";
  };

  return (
    <div className={classes.wrapper}>
      <Sidebar
        routes={_approutes}
        logoText={config.appName}
        logo={config.appLogoSmall}
        image={config.adminSidemenuBgImg}
        open={common.showMobileDrawer}
        {...rest}
      />
      <div className={classes.mainPanel}>
        <Navbar
          routes={_approutes}
          handleDrawerToggle={handleDrawerToggle}
          {...rest}
        />
   
        <div className={classes.content}>
          <div className={classes.container}>{switchRoutes(_approutes)}</div>
        </div>
        
      </div>
    </div>
  );
}