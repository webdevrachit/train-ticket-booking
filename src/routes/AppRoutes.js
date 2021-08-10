import React from 'react'
import {
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import { useSelector } from "react-redux";

import Admin from "layouts/Admin";
import User from "layouts/User";

const AppRouter = () => {
  const user = useSelector((state) => state.user);
  return (
    <Switch>
    { user.role == 'admin' ? 
      <Route path="/" component={Admin} />
      :
      <Route path="/" component={User} />
    }
      <Redirect from="/" to="/home" />
      <Redirect from="*" to="/home" />
    </Switch>
  )
}

export default AppRouter
