import React from "react";
import { useDispatch, useSelector } from "react-redux";
import classNames from "classnames";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

import { Collapse, SwipeableDrawer, Drawer, Hidden, List, ListItem, ListItemText, Icon } from "../Muicore";
import { ExpandMore, KeyboardArrowRight } from '../Muiicons';

import AdminNavbarLinks from "../Navbars/AdminNavbarLinks";
import { CommonActions } from "store/actions";
import sidebarStyle from "./style";

export default function Sidebar(props) {
  const classes = sidebarStyle();
  const user = useSelector((state) => state.user);

  // verifies if routeName is the one active (in browser input)
  function activeRoute(routeName) {
    return window.location.href.indexOf(routeName) > -1 ? true : false;
  }
  const color = 'purple';
  const { logo, image, logoText, routes } = props;

  const [openMenu, toggleMenu] = React.useState(null);

  const _toggleMenu = (e, prop, key) => {
    if(prop.subItems.length>0){
      e.preventDefault();
    }
    toggleMenu(key);
    if(prop.subItems.length==0){
      toggleSidebar(false);
    }
  };
  const toggleSidebar = (show) => {
    CommonActions.showMobileDrawer(show);
  };

  var links = (
    <List className={classes.list}>
      {routes.map((prop, key) => {
        var activePro = " ";
        var listItemClasses;
        listItemClasses = classNames({
          [" " + classes[color]]: activeRoute(prop.path) && !prop.subItems.length
        });
        const whiteFontClasses = classNames({
          [" " + classes.whiteFont]: activeRoute(prop.path)
        });

        if(!prop.showInSidebar || user.role != prop.layout ) return null;

        return (
          <div key={prop.path}>
            <NavLink
              to={prop.subItems.length ? '#' : prop.path}
              className={activePro + classes.item}
              activeClassName="active"
            >
              <ListItem button className={classes.itemLink + listItemClasses} onClick={(event)=>_toggleMenu(event,prop,key)}>
                {typeof prop.icon === "string" ? (
                  <Icon
                    className={classNames(classes.itemIcon, whiteFontClasses)}
                  >
                    {prop.icon}
                  </Icon>
                ) : (
                  <prop.icon
                    className={classNames(classes.itemIcon, whiteFontClasses)}
                  />
                )}
                <ListItemText
                  primary={ prop.name}
                  className={classNames(classes.itemText, whiteFontClasses)}
                  disableTypography={true}
                />
              </ListItem>
            </NavLink>
          </div>
        );
      })
      }
    </List>
  );
  var brand = (
    <div className={classes.logo}>
      <a
        href="/"
        className={classNames(classes.logoLink)}
      >
        <div className={classes.logoImage}>
          <img src={logo} alt="logo" className={classes.img} />
        </div>
        {logoText}
      </a>
    </div>
  );
  return (
    <div>
      <Hidden mdUp implementation="css">
        <SwipeableDrawer
          variant="temporary"
          anchor={"left"}
          open={props.open}
          classes={{
            paper: classNames(classes.drawerPaper)
          }}
          onClose={()=>toggleSidebar(false)}
          onOpen={()=>toggleSidebar(true)}
          ModalProps={{
            keepMounted: true // Better open performance on mobile.
          }}
        >
          {brand}
          <div className={classes.sidebarWrapper}>
            {links}
          </div>
          {image !== undefined ? (
            <div
              className={classes.background}
              style={{ backgroundImage: "url(" + image + ")" }}
            />
          ) : null}
        </SwipeableDrawer>
      </Hidden>
      <Hidden smDown implementation="css">
        <Drawer
          anchor={"left"}
          variant="permanent"
          open
          classes={{
            paper: classNames(classes.drawerPaper)
          }}
        >
          {brand}
          <div className={classes.sidebarWrapper}>{links}</div>
          {image !== undefined ? (
            <div
              className={classes.background}
              style={{ backgroundImage: "url(" + image + ")" }}
            />
          ) : null}
        </Drawer>
      </Hidden>
    </div>
  );
}

Sidebar.propTypes = {
  bgColor: PropTypes.oneOf(["purple", "blue", "green", "orange", "red"]),
  logo: PropTypes.string,
  image: PropTypes.string,
  logoText: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.object),
  open: PropTypes.bool
};
