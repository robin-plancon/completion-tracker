import React, { useEffect, useState } from "react";
import LoadingSpinner from "../Loader/LoadingSpinner";
import Quest from "./Iquest";
import QuestItem from "./Quest";

import classes from "./Quests.module.css";

const Quests = () => {
  const [loadedQuests, setLoadedQuests] = useState<Quest[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchQuests = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          process.env.REACT_APP_BACKEND_URL + "/quests",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const responseData = await response.json();
        setLoadedQuests(responseData.quests);
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        throw new Error("Cannot fetch quests data.");
      }
    };
    fetchQuests();
  }, []);

  return (
    <React.Fragment>
      <div className={classes.quests__title_section}>Quests</div>
      <div className={classes.quests__loading_info}>
        {isLoading && (
          <div className="center">
            <LoadingSpinner />
          </div>
        )}
        {!isLoading && loadedQuests.length === 0 && (
          <p>No Categories found!</p>
        )}
      </div>
      <div className={classes.quests}>
          {!isLoading && loadedQuests.length > 0 && loadedQuests.map((quest) => {
            return <QuestItem key={quest._id} quest={quest} />
          })}
      </div>
    </React.Fragment>
  )

}

export default Quests;