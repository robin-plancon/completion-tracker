import React from "react";

import classes from "./Object.module.css";

interface ObjectItemProps {
  object: {
    _id: string;
    categoryId: string;
    link?: string;
    name: string;
    status: boolean;
    location?: string;
    details?: string;
    id: string;
  };
}

const ObjectItem: React.FC<ObjectItemProps> = (props) => {

  return (
    <div className={classes.object}>
      {!props.object.link && <div className={classes.object__name}><a href={props.object.link}>{props.object.name}</a></div>}
      { props.object.link && <div className={classes.object__name}>{props.object.name}</div>}
      <div className={classes.object__location}>{props.object.location}</div>
      <div className={classes.object__details}>{props.object.details}</div>
      
    </div>
  ) ;
};

export default ObjectItem;