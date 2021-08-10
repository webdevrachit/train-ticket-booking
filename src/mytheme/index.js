import { createMuiTheme } from '@material-ui/core/styles';

const primaryColor = ["#9c27b0", "#ab47bc", "#8e24aa", "#af2cc5", "#5f0e6d"];
const secondaryColor = ["#323232", "#636363", "#1f1f1f", "#323232", "#797979"];
const warningColor = ["#ff9800", "#ffa726", "#fb8c00", "#ffa21a", "#ab6601"];
const dangerColor = ["#f44336", "#ef5350", "#e53935", "#f55a4e", "#a72419"];
const successColor = ["#4caf50", "#66bb6a", "#43a047", "#5cb860", "#236b26"];
const infoColor = ["#00acc1", "#26c6da", "#00acc1", "#00d3ee", "#026c79"];
const grayColor = [ "#999", "#777", "#3C4858", "#AAAAAA", "#D2D2D2", "#DDD", "#b4b4b4", "#555555", "#333", "#a9afbb", "#eee", "#e7e7e7"];
const blackColor = "#000";
const whiteColor = "#FFF";

const baseTheme = createMuiTheme({
  props: {
    MuiPaper: {
      elevation: 0,
    },
    MuiAppBar: {
      elevation: 1,
    },
    MuiMenu: {
      elevation: 1,
    },
    MuiCard: {
      elevation: 0,
    },
  },
  overrides: {
    MuiButton: {
      root: {
        minWidth: 0,
      },
      contained: {
        boxShadow: 'none',
        '&:active': {
          boxShadow: 'none',
        },
        '&:focus': {
          boxShadow: 'none',
        },
      },
      containedSecondary: {
        color: '#fff',
        '&:hover': {
          backgroundColor: 'rgb(118, 195, 21)',
        },
      },
    },
    MuiButtonGroup: {
      root: {
        boxShadow: 'none',
      },
      contained: {
        boxShadow: 'none',
        '&:active': {
          boxShadow: 'none',
        },
        '&:focus': {
          boxShadow: 'none',
        },
      },
    },
    MuiListItemIcon: {
      root: {
        minWidth: 40,
        color: '#fff'
      },
    },
    MuiListItemText: {
      root: {
        color: '#fff'
      },
    },
    MuiList: {
      root: {
        background: secondaryColor[0],
      },
    },
    MuiButtonBase:{
      root:{
        color:'#fff'
      }
    },
  },
  palette: {
    primary: {
      main: primaryColor[0],
      light: primaryColor[1],
      dark: primaryColor[2],
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: secondaryColor[0],
      light: secondaryColor[1],
      dark: secondaryColor[2],
      contrastText: "#FFFFFF",
    }
  },
  typography: {
    fontFamily: 'Raleway, Arial',
    h1: {
      fontSize: '2rem',
    },
    h2: {
      fontSize: '1.8rem',
    },
    h3: {
      fontSize: '1.6rem',
    },
    h4: {
      fontSize: '1.4rem',
    },
    h5: {
      fontSize: '1.2rem',
    },
    h6: {
      fontSize: '1rem',
    },
  },

  header: {
    background: '#fff',
  },
  sidebar: {
    width: 255,
    widthCollapsed: 100,
    background: secondaryColor[0],
    color: '#fff',
  },

});

export default baseTheme

const hexToRgb = input => {
  input = input + "";
  input = input.replace("#", "");
  let hexRegex = /[0-9A-Fa-f]/g;
  if (!hexRegex.test(input) || (input.length !== 3 && input.length !== 6)) {
    throw new Error("input is not a valid hex color.");
  }
  if (input.length === 3) {
    let first = input[0];
    let second = input[1];
    let last = input[2];
    input = first + first + second + second + last + last;
  }
  input = input.toUpperCase(input);
  let first = input[0] + input[1];
  let second = input[2] + input[3];
  let last = input[4] + input[5];
  return (
    parseInt(first, 16) +
    ", " +
    parseInt(second, 16) +
    ", " +
    parseInt(last, 16)
  );
};

const drawerWidth = 260;

const transition = {
  transition: "all 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1)"
};

const container = {
  marginRight: "auto",
  marginLeft: "auto"
};

const defaultFont = {
  fontFamily: '"Raleway", "Helvetica", "Arial", sans-serif',
  fontWeight: "300",
  lineHeight: "1.5em"
};

const boxShadow = {
  boxShadow:
    "0 10px 30px -12px rgba(" +
    hexToRgb(blackColor) +
    ", 0.42), 0 4px 25px 0px rgba(" +
    hexToRgb(blackColor) +
    ", 0.12), 0 8px 10px -5px rgba(" +
    hexToRgb(blackColor) +
    ", 0.2)"
};

const primaryBoxShadow = {
  boxShadow:
    "0 4px 20px 0 rgba(" +
    hexToRgb(blackColor) +
    ",.14), 0 7px 10px -5px rgba(" +
    hexToRgb(primaryColor[0]) +
    ",.4)"
};
const infoBoxShadow = {
  boxShadow:
    "0 4px 20px 0 rgba(" +
    hexToRgb(blackColor) +
    ",.14), 0 7px 10px -5px rgba(" +
    hexToRgb(infoColor[0]) +
    ",.4)"
};
const successBoxShadow = {
  boxShadow:
    "0 4px 20px 0 rgba(" +
    hexToRgb(blackColor) +
    ",.14), 0 7px 10px -5px rgba(" +
    hexToRgb(successColor[0]) +
    ",.4)"
};
const warningBoxShadow = {
  boxShadow:
    "0 4px 20px 0 rgba(" +
    hexToRgb(blackColor) +
    ",.14), 0 7px 10px -5px rgba(" +
    hexToRgb(warningColor[0]) +
    ",.4)"
};
const dangerBoxShadow = {
  boxShadow:
    "0 4px 20px 0 rgba(" +
    hexToRgb(blackColor) +
    ",.14), 0 7px 10px -5px rgba(" +
    hexToRgb(dangerColor[0]) +
    ",.4)"
};

const warningCardHeader = {
  background:
    "linear-gradient(to left, " + warningColor[0] + ", " + warningColor[3] + ")",
  ...warningBoxShadow
};
const successCardHeader = {
  background:
    "linear-gradient(to left, " + successColor[0] + ", " + successColor[3] + ")",
  ...successBoxShadow
};
const dangerCardHeader = {
  background:
    "linear-gradient(to left, " + dangerColor[0] + ", " + dangerColor[3] + ")",
  ...dangerBoxShadow
};
const infoCardHeader = {
  background:
    "linear-gradient(to left, " + infoColor[0] + ", " + infoColor[3] + ")",
  ...infoBoxShadow
};
const primaryCardHeader = {
  background:
    "linear-gradient(to left, " + primaryColor[0] + ", " + primaryColor[3] + ")",
  ...primaryBoxShadow
};

const cardActions = {
  margin: "0 20px 10px",
  paddingTop: "10px",
  borderTop: "1px solid " + grayColor[10],
  height: "auto",
  ...defaultFont
};

const cardHeader = {
  margin: "-20px 15px 0",
  borderRadius: "3px",
  padding: "15px"
};

const card = {
  display: "inline-block",
  position: "relative",
  width: "100%",
  margin: "25px 0",
  boxShadow: "0 1px 4px 0 rgba(" + hexToRgb(blackColor) + ", 0.14)",
  borderRadius: "3px",
  color: "rgba(" + hexToRgb(blackColor) + ", 0.87)",
  background: whiteColor
};

const defaultBoxShadow = {
  border: "0",
  borderRadius: "3px",
  boxShadow:
    "0 10px 20px -12px rgba(" +
    hexToRgb(blackColor) +
    ", 0.42), 0 3px 20px 0px rgba(" +
    hexToRgb(blackColor) +
    ", 0.12), 0 8px 10px -5px rgba(" +
    hexToRgb(blackColor) +
    ", 0.2)",
  padding: "10px 0",
  transition: "all 150ms ease 0s"
};

const title = {
  color: grayColor[2],
  textDecoration: "none",
  fontWeight: "300",
  marginTop: "30px",
  marginBottom: "25px",
  minHeight: "32px",
  fontFamily: "'Raleway', 'Helvetica', 'Arial', sans-serif",
  "& small": {
    color: grayColor[1],
    fontWeight: "400",
    lineHeight: "1"
  }
};

const cardTitle = {
  ...title,
  marginTop: "0",
  marginBottom: "3px",
  minHeight: "auto",
  "& a": {
    ...title,
    marginTop: ".625rem",
    marginBottom: "0.75rem",
    minHeight: "auto"
  }
};

const cardSubtitle = {
  marginTop: "-.375rem"
};

const cardLink = {
  "& + $cardLink": {
    marginLeft: "1.25rem"
  }
};

export {
  hexToRgb,
  drawerWidth,
  transition,
  container,
  boxShadow,
  card,
  defaultFont,
  primaryColor,
  secondaryColor,
  warningColor,
  dangerColor,
  successColor,
  infoColor,
  grayColor,
  blackColor,
  whiteColor,
  primaryBoxShadow,
  infoBoxShadow,
  successBoxShadow,
  warningBoxShadow,
  dangerBoxShadow,
  warningCardHeader,
  successCardHeader,
  dangerCardHeader,
  infoCardHeader,
  primaryCardHeader,
  cardActions,
  cardHeader,
  defaultBoxShadow,
  title,
  cardTitle,
  cardSubtitle,
  cardLink
};
