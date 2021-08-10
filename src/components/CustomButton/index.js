import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";

import { Button } from "../Muicore";

import buttonStyle from "./style.js";

export default function CustomButton(props) {
  const classes = buttonStyle();
  const {
    color,
    round,
    children,
    disabled,
    simple,
    size,
    block,
    bordered,
    link,
    justIcon,
    xsDownIcon,
    className,
    muiClasses,
    ...rest
  } = props;
  const btnClasses = classNames({
    [classes.button]: true,
    [classes[size]]: size,
    [classes[color]]: color,
    [classes.round]: round,
    [classes.disabled]: disabled,
    [classes.simple]: simple,
    [classes.block]: block,
    [classes.link]: link,
    [classes.justIcon]: justIcon,
    [classes.xsDownIcon]: xsDownIcon,
    [classes.bordered]: bordered,
    [className]: className
  });
  return (
    <Button {...rest} classes={muiClasses} className={btnClasses}>
      {children}
    </Button>
  );
}

CustomButton.propTypes = {
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "danger",
    "rose",
    "white",
    "transparent"
  ]),
  size: PropTypes.oneOf(["sm", "lg"]),
  simple: PropTypes.bool,
  round: PropTypes.bool,
  disabled: PropTypes.bool,
  block: PropTypes.bool,
  link: PropTypes.bool,
  justIcon: PropTypes.bool,
  xsDownIcon: PropTypes.bool,
  bordered: PropTypes.bool,
  className: PropTypes.string,
  type: PropTypes.string,
  href: PropTypes.string,
  target: PropTypes.string,
  // use this to pass the classes props from Material-UI
  muiClasses: PropTypes.object,
  children: PropTypes.node,
  onClick: PropTypes.func
};
