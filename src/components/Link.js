import { withRouter } from "next/router";
import Link from "next/link";
import React, { Children } from "react";
import cx from "classnames";

const ActiveLink = ({ router, activeClassName, children, ...props }) => {
  const child = Children.only(children);

  const className = cx(child.props.className, {
    [activeClassName]: router.asPath === props.as
  });

  return <Link {...props}>{React.cloneElement(child, { className })}</Link>;
};

export default withRouter(ActiveLink);
