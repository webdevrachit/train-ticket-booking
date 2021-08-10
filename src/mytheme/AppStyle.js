import { makeStyles } from "@material-ui/core/styles";
import config from "config/";

import {
  hexToRgb,
  drawerWidth,
  transition,
  container,
  primaryColor,
  secondaryColor,
  warningColor,
  dangerColor,
  successColor,
  infoColor,
  roseColor,
  grayColor,
  blackColor,
  whiteColor
} from "mytheme/";

export default makeStyles(theme => ({
  wrapper: {
    position: "relative",
    top: "0",
    height: "100vh"
  },
  mainPanel: {
    [theme.breakpoints.up("md")]: {
      width: `calc(100% - ${drawerWidth}px)`
    },
    overflow: "auto",
    position: "relative",
    float: "right",
    ...transition,
    maxHeight: "100%",
    width: "100%",
    overflowScrolling: "touch"
  },
  content: {
    marginTop: "55px",
    padding: "30px",
    [theme.breakpoints.down("md")]: {
      padding: "30px 15px",
    },
    [theme.breakpoints.down("sm")]: {
      padding: "30px 10px",
    },
    minHeight: "calc(100vh - 123px)"
  },
  container,
  tblActionBtn:{
    width: '30px',
    height: '30px',
    minWidth: '30px',
    paddingTop: '5px'
  },
  mr1:{
    marginRight: theme.spacing(1)
  },
  mt1:{
    marginTop: theme.spacing(1)
  },
  mt2:{
    marginTop: theme.spacing(2)
  }
}));