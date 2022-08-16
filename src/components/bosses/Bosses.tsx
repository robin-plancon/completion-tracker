import React, { useEffect, useState } from "react";
import LoadingSpinner from "../Loader/LoadingSpinner";
import BossItem from "./Boss";
import Boss from "./Iboss";

import classes from "./Bosses.module.css";

const BossesItem: React.FC = () => {
  const [loadedBosses, setLoadedBosses] = useState<Boss[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          process.env.REACT_APP_BACKEND_URL + "/bosses",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const responseData = await response.json();
        setLoadedBosses(responseData.bosses);
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
      <div className={classes.bosses__section_title}>Bosses</div>
      <div className={classes.bosses__loading_info}>
      {isLoading && (
          <div className="center">
            <LoadingSpinner />
          </div>
        )}
      </div>
      <div className={classes.bosses}>
        <div className={classes.bosses__label_name}>Name</div>
        <div className={classes.bosses__label_location}>Location</div>
        {!isLoading && loadedBosses.length > 0 && (
            loadedBosses.map((boss) => {
              return <BossItem key={boss._id} boss={boss} />;
            })
        )}
      </div>
    </React.Fragment>
  );
};

export default BossesItem;
