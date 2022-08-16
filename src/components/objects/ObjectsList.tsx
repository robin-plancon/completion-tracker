import React from "react";

import ObjectItem from "./Object";

import classes from "./ObjectsList.module.css";

interface ObjectsItemProps {
  objects: {
    _id: string;
    categoryId: string;
    name: string;
    status: boolean;
    link?: string;
    location?: string;
    details?: string;
    id: string;
  }[];
}

const ObjectsListItem: React.FC<ObjectsItemProps> = (props) => {
  return (
    <div className={classes.objects_list}>
        <div className={classes.objects_list__labels_name}>Name</div>
        <div className={classes.objects_list__labels_location}>Location</div>
        <div className={classes.objects_list__labels_details}>Details</div>
      {props.objects.map((object) => <ObjectItem key={object._id} object={object} />)}
    </div>
  ) ;
};

export default ObjectsListItem;