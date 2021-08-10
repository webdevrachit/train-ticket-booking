import React from 'react'
import { CommonTypes } from '../types';
import config from 'config';
import { store } from 'store';
import { Axios } from 'utils';


export function showMobileDrawer(show) {
	store.dispatch({ type: CommonTypes.SHOWMOBILEDRAWER, show: show });
}

export function showSnackbar(snackbar) {
	store.dispatch({ type: CommonTypes.SHOWSNACKBAR, snackbar: snackbar });
	setTimeout(function() {
	    store.dispatch({ type: CommonTypes.SHOWSNACKBAR, snackbar: { open: false }});
	  }, 4000);
}