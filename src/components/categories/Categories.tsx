import React, { useEffect, useState } from "react";
import LoadingSpinner from "../Loader/LoadingSpinner";

import classes from "./Categories.module.css";
import CategoriesListItem from "./CategoriesList";
import Category from "./Icategory";
import NewCategory from "./NewCategory";

const Categories = () => {
  const [loadedCategories, setLoadedCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          process.env.REACT_APP_BACKEND_URL + "/categories/root",
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
  }, []);

  return (
    <React.Fragment>
      <div className={classes.categories__title_section}>Objects</div>
      <div className={classes.categories__loading_info}>
        {isLoading && (
          <div className="center">
            <LoadingSpinner />
          </div>
        )}
        {!isLoading && loadedCategories.length === 0 && (
          <p>No Categories found!</p>
        )}
      </div>
      <NewCategory loadedCategories={loadedCategories} setLoadedCategories={setLoadedCategories} />
      <div className={classes.categories}>
        {!isLoading &&
          loadedCategories.length > 0 &&
          loadedCategories.map((category) => {
            return (
              <CategoriesListItem key={category._id} category={category} />
            );
          })}
      </div>
    </React.Fragment>
  );
};

export default Categories;
