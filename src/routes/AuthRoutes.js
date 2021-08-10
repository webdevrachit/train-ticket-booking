import React from 'react'
import {
  Route,
  Redirect,
  Switch
} from 'react-router-dom' //
import { authRoutes } from "./routes.js";

const AuthRouter = () => {

  return (
    <Switch>
      {
        authRoutes.map((prop, key) => {
          if(prop.exact){
            return (
              <Route
                exact
                path={prop.path}
                component={prop.component}
                key={key}
              />
            )
          }else{
            return (
              <Route
                path={prop.path}
                component={prop.component}
                key={key}
              />
            )
          }
        })
      }
      <Redirect from="*" to="/" />
    </Switch>
  )
}

export default AuthRouter

