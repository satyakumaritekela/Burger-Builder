import React from "react";
import classes from "./BuildControls.module.css";
import BuildControl from "./BuildControl/BuildControl";

const controls = [
  { label: "Salad", type: "salad" },
  { label: "Cheese", type: "cheese" },
  { label: "Bacon", type: "bacon" },
  { label: "Meat", type: "meat" },
];

const buildControls = (props) => (
  <div className={classes.BuildControls}>
    <div className={classes.Description}>CHOOSE YOUR BURGER</div>
    <p className={classes.Description}>
      BURGER PRICE: <strong>$ {props.totalPrice}</strong>
    </p>
    {controls.map((c) => (
      <BuildControl
        key={c.label}
        label={c.label}
        add={() => props.addIngredient(c.type)}
        remove={() => props.removeIngredient(c.type)}
        disabledRemove={props.disabledRemove[c.type]}
      />
    ))}
    <button
      className={classes.OrderButton}
      disabled={!props.purchasable}
      onClick={props.purchase}
    >
      ORDER NOW
    </button>
  </div>
);

export default buildControls;
