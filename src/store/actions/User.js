import React from 'react'
import { CommonTypes, UserTypes } from '../types';
import config from 'config';
import { store } from 'store';
import { Axios } from 'utils';

export function login(user) {
	// console.log("user", user);
    store.dispatch({ type: CommonTypes.SHOWSUBLOADER , show: 1});
    return Axios.post(config.api.user+'login',  {payloads:user}).then(res => {
	    store.dispatch({ type: CommonTypes.SHOWSUBLOADER , show: 0});
	    return res;
    });
}

export function loginSuccess(user) {
	return store.dispatch({ type: UserTypes.SETACCOUNT, user: user});
}


export function logout(user) {
	return store.dispatch({ type: UserTypes.LOGOUT});
}

export function searchTrain(data) {
	store.dispatch({ type: CommonTypes.SHOWSUBLOADER , show: 1});
    return Axios.post(config.api.train+'search',  {payloads:data}).then(res => {
	    store.dispatch({ type: CommonTypes.SHOWSUBLOADER , show: 0});
	    return res;
    });
}

export function bookTicket(data) {
	store.dispatch({ type: CommonTypes.SHOWSUBLOADER , show: 1});
    return Axios.post(config.api.bookticket+'add',  {payloads:data}).then(res => {
	    store.dispatch({ type: CommonTypes.SHOWSUBLOADER , show: 0});
	    return res;
    });
}

export function getAllTickets(id) {
	store.dispatch({ type: CommonTypes.SHOWSUBLOADER , show: 1});
    return Axios.get(config.api.bookticket+'all/'+id,  {payloads:{}}).then(res => {
	    store.dispatch({ type: CommonTypes.SHOWSUBLOADER , show: 0});
	    return res;
    });
}