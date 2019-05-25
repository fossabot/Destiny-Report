import { withRouter } from "next/router";
import Link from "next/link";
import React, { Children } from "react";
import cx from "classnames";

const ActiveLink = ({ router, children, ...props }) => {
  const child = Children.only(children);

  const className = cx(child.props.className, {
    [props.activeClassName]: router.asPath === props.as && props.activeClassName
  });

  delete props.activeClassName;

  return <Link {...props}>{React.cloneElement(child, { className })}</Link>;
};

export default withRouter(ActiveLink);
