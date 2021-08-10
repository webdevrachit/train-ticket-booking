import loginBgImg from "assets/img/train-bg.jpg";
import appLogoSmall from "assets/img/logo.png";
import appLogo from "assets/img/logo.png";

const apiBaseURL = process.env.NODE_ENV === 'production' ? "https://node-mongo-api-push.herokuapp.com/": "http://localhost:5005/";
const appBaseURL = process.env.NODE_ENV === 'production' ? 'demo/finwego-task/' : '/';

const config = {
  appName : 'Train Ticket',
  companyName : 'Train',
  appLogo : appLogo,
  appLogoSmall : appLogoSmall,
  loginBgImg: loginBgImg,
  adminSidemenuBgImg: '',
  navigationType: 'history',
  api: {
    appBaseURL : appBaseURL,
    apiBaseURL : apiBaseURL,
    user : 'user/',
    train : 'train/',
    seats : 'seats-availability/',
    interlist : 'interlist/',
    bookticket : 'book-ticket/',
  },
}

export default config
