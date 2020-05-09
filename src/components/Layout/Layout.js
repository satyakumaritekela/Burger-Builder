import React, { Fragment } from "react";
import classes from "./Layout.module.css";
import ToolBar from "../Navigation/Toolbar/Toolbar";
import SideDrawer from "../Navigation/SideDrawer/SideDrawer";

class Layout extends React.Component {
  state = {
    showDrawer: false,
  };

  sideDrawerHandler = () => {
    this.setState({
      showDrawer: false,
    });
  };

  showDrawerHandler = () => {
    this.setState((prevState) => {
      return {
        showDrawer: !prevState.showDrawer,
      };
    });
  };

  render() {
    return (
      <Fragment>
        <ToolBar
          showdrawer={this.showDrawerHandler}
        />
        <SideDrawer
          open={this.state.showDrawer}
          closed={this.sideDrawerHandler}
        />
        <main className={classes.Builder_Margin}>{this.props.children}</main>
      </Fragment>
    );
  }
}

export default Layout;
