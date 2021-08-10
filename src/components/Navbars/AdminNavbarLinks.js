import React from "react";
import classNames from "classnames";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { MenuList, MenuItem, Grow, Paper, ClickAwayListener, Hidden, Divider, Grid, Poppers } from 'components/Muicore';

import { Person, Search } from '../Muiicons';
import CustomButton  from "../CustomButton";

import { UserActions } from "store/actions/";
import { Storage } from "utils";

import headerStyle from './style';

export default function AdminNavbarLinks() {
  const classes = headerStyle();
  const history = useHistory();

  const root = useSelector((state) => state.root);
  const user = useSelector((state) => state.user);

  const [openProfile, setOpenProfile] = React.useState(null);

  const handleClickProfile = event => {
    if (openProfile && openProfile.contains(event.target)) {
      setOpenProfile(null);
    } else {
      setOpenProfile(event.currentTarget);
    }
  };

  const _logout = () => {
    handleCloseProfile();
    UserActions.logout({ id: user.id});
  };

  const _goTo = (url)=>{
    history.push(url);
    handleCloseProfile();
  }

  const handleCloseProfile = () => {
    setOpenProfile(null);
  };
  return (
    <Grid container alignItems="flex-start" justify="flex-end" direction="row">
      <div className={classes.searchWrapper}>
        <CustomButton color="transparent" aria-label="edit" justIcon round>
          <Search />
        </CustomButton>
      </div>
      <div className={classes.manager}>
        <CustomButton
          color={"transparent"}
          aria-owns={openProfile ? "profile-menu-list-grow" : null}
          aria-haspopup="true"
          onClick={handleClickProfile}
          className={classes.buttonLink}
          round
        >
          <Person className={classes.icons} /> <strong>{user.name}</strong>
        </CustomButton>
        <Poppers
          open={Boolean(openProfile)}
          anchorEl={openProfile}
          transition
          disablePortal
          className={
            classNames({ [classes.popperClose]: !openProfile }) +
            " " +
            classes.popperNav
          }
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              id="profile-menu-list-grow"
              style={{
                transformOrigin:
                  placement === "bottom" ? "center top" : "center bottom"
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleCloseProfile}>
                  <MenuList role="menu">
                    <MenuItem
                      onClick={()=>{}}
                      className={classes.dropdownItem}
                    >
                      Profile
                    </MenuItem>
                    <Divider light />
                    <MenuItem
                      onClick={_logout}
                      className={classes.dropdownItem}
                    >
                      Logout
                    </MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Poppers>
      </div>
    </Grid>
  );
}
