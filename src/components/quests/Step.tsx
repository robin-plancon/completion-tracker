import React from "react";

import classes from "./Step.module.css";

interface StepItemProps {
  step: {
    _id: string,
    text: string,
    link?: string,
    status?: boolean,
  },
  position: number,
}

const StepItem: React.FC<StepItemProps> = (props) => {
  return (
    <div className={classes.step}>
      <div className={classes["step__position"]}>
        {props.position}
      </div>
      <div className={classes["step__text"]}>
        {props.step.link && <a href={props.step.link}>{props.step.text}</a>}
        {!props.step.link && props.step.text}
      </div>
    </div>
  );
};

export default StepItem;
