import React from "react";

import { Dashboard, Tune, Person, Settings, List, Train, ConfirmationNumber } from 'components/Muiicons';

import { Login } from 'screens/Auth/';
import { AdminDashboard, UserDashboard, TrainList, TrainFare, ManageTrain, TrainSchedules, TrainSearch, BookTicket, TicketHistory, ViewTicket } from 'screens/App/';

const authRoutes = [
  {
    path: "/",
    name: "Login",
    icon: '',
    component: Login,
    layout: "",
    exact: false
  }
];

const appRoutes = [
  {
    path: "/home",
    name: "Dashboard",
    icon: Dashboard,
    component: AdminDashboard,
    layout: "admin",
    exact: false,
    subItems:[],
    showInSidebar:true
  },
  {
    path: "/train-list",
    name: "Train List",
    icon: List,
    component: TrainList,
    layout: "admin",
    exact: false,
    subItems:[],
    showInSidebar:true
  },
  {
    path: "/train-fare/:trainid",
    name: "Train fare",
    icon: List,
    component: TrainFare,
    layout: "admin",
    exact: false,
    subItems:[],
    showInSidebar:false
  },
  {
    path: "/train-manage/:trainid",
    name: "Manage List",
    icon: List,
    component: ManageTrain,
    layout: "admin",
    exact: false,
    subItems:[],
    showInSidebar:false
  },
  {
    path: "/train-schedules/:trainid",
    name: "Train Schedules",
    icon: List,
    component: TrainSchedules,
    layout: "admin",
    exact: false,
    subItems:[],
    showInSidebar:false
  },
  {
    path: "/home",
    name: "Dashboard",
    icon: Dashboard,
    component: UserDashboard,
    layout: "user",
    exact: false,
    subItems:[],
    showInSidebar:true
  },
  {
    path: "/train-search",
    name: "Train Search",
    icon: Train,
    component: TrainSearch,
    layout: "user",
    exact: false,
    subItems:[],
    showInSidebar:true
  },
  {
    path: "/book-ticket/:type",
    name: "Book Ticket",
    icon: ConfirmationNumber,
    component: BookTicket,
    layout: "user",
    exact: false,
    subItems:[],
    showInSidebar:false
  },
  {
    path: "/ticket-history/",
    name: "Ticket History",
    icon: ConfirmationNumber,
    component: TicketHistory,
    layout: "user",
    exact: false,
    subItems:[],
    showInSidebar:true
  },
  {
    path: "/view-ticket/:ticketid",
    name: "View Ticket",
    icon: null,
    component: ViewTicket,
    layout: "user",
    exact: false,
    subItems:[],
    showInSidebar:false
  },
];

export {
  authRoutes,
  appRoutes
};