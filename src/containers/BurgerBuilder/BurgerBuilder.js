import React, { Component } from "react";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import classes from "./BurgerBuilder.module.css";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-orders"
import Spinner from "../../components/UI/Spinner/Spinner";

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
    purchasable: false,
    purchasing: false,
    loading: false
  };

  updatePurchase = (ingredients) => {
    const sum = Object.values(ingredients).reduce(
      (totalSum, ingredientCount) => totalSum + ingredientCount,
      0
    );

    this.setState({
      purchasable: sum > 0,
    });
  };

  addIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;
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
    this.updatePurchase(updatedIngredients);
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
    this.updatePurchase(updatedIngredients);
  };

  purchaseHandler = () => {
    this.setState({
      purchasing: true,
    });
  };

  purchaseCancelHandler = () => {
    this.setState({
      purchasing: false,
    });
  };

  purchaseContinueHandler = () => {
    this.setState({
      loading: true
    })
    const order = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice,
      customer: {
        name: 'Satya Kumar',
        address: {
          street: 'South Park Street'
        }
      },
      deliveryMethod: 'fastest'
    }
    axios.post('/orders.json', order)
      .then(response => this.setState({
        loading: false,
        purchasing: false
      }))
      .catch(error => this.setState({
        loading: false,
        purchasing: false
      }));
  };

  render() {
    const disabledRemoveInfo = {
      ...this.state.ingredients,
    };
    for (let key in disabledRemoveInfo) {
      disabledRemoveInfo[key] = disabledRemoveInfo[key] <= 0;
    }
    let orderSummary = <OrderSummary
      ingredients={this.state.ingredients}
      price={this.state.totalPrice}
      purchaseCancel={this.purchaseCancelHandler}
      purchaseContinue={this.purchaseContinueHandler}
    />
    if (this.state.loading) {
      orderSummary = <Spinner />
    }
    const newTotalPrice = this.state.totalPrice.toFixed(2);
    return (
      <div className={classes.BurgerBuilder}>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          addIngredient={this.addIngredientHandler}
          removeIngredient={this.removeIngredientHandler}
          disabledRemove={disabledRemoveInfo}
          totalPrice={newTotalPrice}
          purchasable={this.state.purchasable}
          purchase={this.purchaseHandler}
        />
      </div>
    );
  }
}

export default BurgerBuilder;
