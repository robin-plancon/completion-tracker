import React, { useEffect, useState } from "react";
import DownArrow from "../UI/icons/DownArrow";
import RightArrow from "../UI/icons/RightArrow";
import Object from "../objects/Iobject";
import ObjectsListItem from "../objects/ObjectsList";

import classes from "./Category.module.css";

interface CategoryItemProps {
  category: {
    _id: string;
    name: string;
    link?: string;
    parent?: string;
    parents?: {}[];
    }
    isExpanded?: boolean
    haveChilds?: boolean
}

const CategoryItem: React.FC<CategoryItemProps> = (props) => {
  const [loadedObjects, setLoadedObjects] = useState<Object[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchObjects = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          process.env.REACT_APP_BACKEND_URL + `/objects/${props.category._id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const responseData = await response.json();
        setLoadedObjects(responseData.objects);
        setIsLoading(false);
      } catch (err) {
        throw new Error("Cannot fetch categories data.");
      }
    };
    fetchObjects();
  }, [props]);

  return (
    <React.Fragment>
      <div className={classes.category}>
        {!props.category.link && (
          <div className={classes.category__name}>
            <a href={props.category.link}>{props.category.name}</a>
          </div>
        )}
        {props.category.link && (
          <div className={classes["category__name"]}>
            <p>{props.category.name}</p>
          </div>
        )}
        {props.haveChilds && props.isExpanded && (<div className={classes.icon}><DownArrow /></div>)}
        {props.haveChilds && !props.isExpanded && (<div className={classes.icon}><RightArrow /></div>)}
      </div>
      {!isLoading && loadedObjects.length > 0 && (
        <ObjectsListItem objects={loadedObjects} />
      )}
    </React.Fragment>
  );
};

export default CategoryItem;
