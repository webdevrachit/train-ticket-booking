import React from 'react';
import ThemeProvider from '@material-ui/styles/ThemeProvider';
import { Provider, useSelector } from 'react-redux';
import { HashRouter, BrowserRouter, Router, Route, Switch, Redirect } from "react-router-dom";
import { createBrowserHistory } from "history";
import { LinearProgress, CssBaseline } from 'components/Muicore';

import './App.css';

import config from 'config';
import theme from 'mytheme';
import { Snackbar } from 'components/';
import { Close, Check } from 'components/Muiicons';
import {store} from "store";

import AppRoutes from "./routes/AppRoutes";
import AuthRoutes from "./routes/AuthRoutes";

import { CommonActions } from "store/actions";

const snackbarIcons = {
  'success': Check,
  'danger': Close
}

const history = createBrowserHistory({
  basename: config.api.appBaseURL || '',
  forceRefresh: false,
});

const AppRouterComponent: React.ComponentType =
  config.navigationType === 'history' ? BrowserRouter : HashRouter;


const App: React.FC = () => {
  const user = useSelector((state) => state.user);
  const common = useSelector((state) => state.common);
  const _snackbar = common.snackbar;

  const _closeNotification = () => {
    CommonActions.showSnackbar({open:false})
  };

  return (
    <>
    <CssBaseline />
    <Snackbar
        place={_snackbar.place||'bc'}
        color={_snackbar.color||'info'}
        icon={snackbarIcons[_snackbar.color] || ''}
        message={_snackbar.message||''}
        open={_snackbar.open}
        closeNotification={() => _closeNotification()}
        close
      />
    { common.showMainLoader ? <LinearProgress /> : null}
      <AppRouterComponent history={history} basename={config.api.appBaseURL}>
        {
          user.id ?
          <AppRoutes />:
          <AuthRoutes />
        }
      </AppRouterComponent>
    </>
  )
}

export default ()=> {

  // const user = useSelector((state) => state.user);
  // console.log("user", user);

  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <App />
      </Provider>
    </ThemeProvider>
  );
}
