import React, { Fragment } from "react";
import classes from "./BuildControl.module.css";

const buildControl = (props) => (
  <Fragment>
    <div className={classes.BuildControl}>
      <button
        className={classes.Remove}
        onClick={props.remove}
        disabled={props.disabledRemove}
      >
        Remove
      </button>
      <div className={classes.Label}>{props.label}</div>
      <button
        className={classes.Add}
        onClick={props.add}
      >
        Add
      </button>
    </div>
    {props.disabledAdd ? (
      <div className={classes.IngredientError}>Cannot add more {props.label}</div>
    ) : (
      ""
    )}
  </Fragment>
);

export default buildControl;
