import React, { MouseEvent, useEffect, useState } from "react";
import CategoryItem from "./Category";
import Category from "./Icategory";

import classes from "./CategoriesList.module.css";

interface CategoryItemProps {
  category: {
    _id?: string;
    name: string;
    link?: string;
    parent?: string;
  };
}

const CategoriesListItem: React.FC<CategoryItemProps> = (props) => {
  const [loadedCategories, setLoadedCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const expandHandler = (event: MouseEvent) => {
    event.preventDefault();

    setIsExpanded(!isExpanded);
  };

  useEffect(() => {
    const fetchCategories = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          process.env.REACT_APP_BACKEND_URL +
            `/categories/${props.category._id}/childs`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const responseData = await response.json();
        setLoadedCategories(responseData.categories);
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        throw new Error("Cannot fetch categories data.");
      }
    };
    fetchCategories();
  }, [props]);

  return (
    <React.Fragment>
      <div className={classes.categories_list__element} onClick={expandHandler}>
        <CategoryItem key={props.category._id} category={props.category} isExpanded={isExpanded} haveChilds={loadedCategories.length > 0 ? true : false} />
      </div>
      {isExpanded && !isLoading && loadedCategories.length > 0 && (
        <div className={classes.categoriesList__new_list}>
          {loadedCategories.map((category) => {
            return (
              <CategoriesListItem key={category._id} category={category} />
            );
          })}
        </div>
      )}
    </React.Fragment>
  );
};

export default CategoriesListItem;
