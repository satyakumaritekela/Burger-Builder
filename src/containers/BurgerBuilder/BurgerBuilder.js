import React, { Component, Fragment } from "react";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import classes from "./BurgerBuilder.module.css";

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 1,
      cheese: 1,
      meat: 1,
    },
  };

  render() {
    return (
        <div className={classes.BurgerBuilder}>
          <Burger ingredients={this.state.ingredients} />
          <BuildControls />
        </div>
    );
  }
}

export default BurgerBuilder;
