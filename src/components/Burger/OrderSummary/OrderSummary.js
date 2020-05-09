import React, { Fragment } from "react";
import Button from "../../UI/Button/Button";
import classes from "./OrderSummary.module.css";

class OrderSummary extends React.Component {
    componentWillUpdate() {
      console.log("OrderSum")
  }
  render() {
    const ingredientSummary = Object.keys(this.props.ingredients).map(
      (ingredient, index) => {
        return (
          <li key={index} className={classes.ListStyle}>
            <span
              style={{ textTransform: "capitalize", minWidth: "100px" }}
              className={classes.Ingredient}
            >
              {ingredient}
            </span>
            {this.props.ingredients[ingredient]}
          </li>
        );
      }
    );
    return (
      <Fragment>
        <h3 className={classes.Description}>ORDER SUMMARY</h3>
        <ul className={classes.OrderListStyle}>{ingredientSummary}</ul>
        <p>
          <strong>Total Price: $ {this.props.price.toFixed(2)}</strong>
        </p>
        <p className={classes.Checkout}>Continue to checkout</p>
        <Button btnType="Danger" clicked={this.props.purchaseCancel}>
          CANCEL
        </Button>
        <Button btnType="Success" clicked={this.props.purchaseContinue}>
          CONTINUE
        </Button>
      </Fragment>
    );
  }
}

export default OrderSummary;
