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
    {controls.map((c) => (
      <BuildControl key={c.label} label={c.label} />
    ))}
  </div>
);

export default buildControls;
