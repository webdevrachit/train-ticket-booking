import React from 'react'
import { AdminTypes, CommonTypes } from '../types';
import config from 'config';
import { store } from 'store';
import { Axios } from 'utils';


export function getAllTrains() {
	store.dispatch({ type: CommonTypes.SHOWSUBLOADER , show: 1});
    return Axios.get(config.api.train,  {payloads:{}}).then(res => {
	    store.dispatch({ type: CommonTypes.SHOWSUBLOADER , show: 0});
	    return res;
    });
}

export function manageTrains(train) {
	store.dispatch({ type: CommonTypes.SHOWSUBLOADER , show: 1});
    return Axios.post(config.api.train+train.type,  {payloads:train}).then(res => {
	    store.dispatch({ type: CommonTypes.SHOWSUBLOADER , show: 0});
	    return res;
    });
}

export function deleteTrain(train) {
	store.dispatch({ type: CommonTypes.SHOWSUBLOADER , show: 1});
    return Axios.post(config.api.train+train.type,  {payloads:train}).then(res => {
	    store.dispatch({ type: CommonTypes.SHOWSUBLOADER , show: 0});
	    return res;
    });
}

export function dummyCreateSeatsAvilability(seats) {
	store.dispatch({ type: CommonTypes.SHOWSUBLOADER , show: 1});
    return Axios.post(config.api.seats+'dummy-add',  {payloads:seats}).then(res => {
	    store.dispatch({ type: CommonTypes.SHOWSUBLOADER , show: 0});
	    return res;
    });
}

export function getTrainSchedules(id) {
	store.dispatch({ type: CommonTypes.SHOWSUBLOADER , show: 1});
    return Axios.get(config.api.seats+id,  {payloads:{}}).then(res => {
	    store.dispatch({ type: CommonTypes.SHOWSUBLOADER , show: 0});
	    return res;
    });
}

export function getTrainInterList(id) {
	store.dispatch({ type: CommonTypes.SHOWSUBLOADER , show: 1});
    return Axios.get(config.api.interlist+id,  {payloads:{}}).then(res => {
	    store.dispatch({ type: CommonTypes.SHOWSUBLOADER , show: 0});
	    return res;
    });
}

export function manageTrainInterList(data) {
	console.log("data", data);
	store.dispatch({ type: CommonTypes.SHOWSUBLOADER , show: 1});
    return Axios.post(config.api.interlist+'edit',  {payloads:data}).then(res => {
	    store.dispatch({ type: CommonTypes.SHOWSUBLOADER , show: 0});
	    return res;
    });
}