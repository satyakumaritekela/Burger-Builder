import React, { Component } from "react";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import classes from "./BurgerBuilder.module.css";

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      cheese: 0,
      meat: 0,
      bacon: 0,
    },
    totalPrice: 4,
  };

  addIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;
    if (updatedCount > 5) {
      return;
    }
    const updatedIngredients = {
      ...this.state.ingredients,
    };
    updatedIngredients[type] = updatedCount;
    const priceAddition = INGREDIENT_PRICES[type];
    const oldTotalPrice = this.state.totalPrice;
    const newTotalPrice = oldTotalPrice + priceAddition;
    this.setState({
      totalPrice: newTotalPrice,
      ingredients: updatedIngredients,
    });
  };

  removeIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount - 1;
    if (updatedCount < 0) {
      return;
    }
    const updatedIngredients = {
      ...this.state.ingredients,
    };
    updatedIngredients[type] = updatedCount;
    const priceDeduction = INGREDIENT_PRICES[type];
    const oldTotalPrice = this.state.totalPrice;
    const newTotalPrice = oldTotalPrice - priceDeduction;
    this.setState({
      totalPrice: newTotalPrice,
      ingredients: updatedIngredients,
    });
  };

  render() {
    const disabledRemoveInfo = {
      ...this.state.ingredients,
    };
    const disabledAddInfo = {
      ...this.state.ingredients,
    };
    for (let key in disabledRemoveInfo) {
      disabledRemoveInfo[key] = disabledRemoveInfo[key] <= 0;
    }
    for (let key in disabledAddInfo) {
      disabledAddInfo[key] = disabledAddInfo[key] > 4;
    }
    return (
      <div className={classes.BurgerBuilder}>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          addIngredient={this.addIngredientHandler}
          removeIngredient={this.removeIngredientHandler}
          disabledRemove={disabledRemoveInfo}
          disabledAdd={disabledAddInfo}
        />
      </div>
    );
  }
}

export default BurgerBuilder;
