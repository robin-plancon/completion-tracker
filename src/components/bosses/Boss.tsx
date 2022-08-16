import React from "react";

import classes from "./Boss.module.css";

interface BossItemProps {
  boss: {
    _id: string;
    name: string;
    link?: string;
    status: boolean;
    location: string;
    id: string;
  };
}

const BossItem: React.FC<BossItemProps> = (props) => {

  return (
    <div className={classes.boss}>
      { props.boss.link && <div className={classes.boss_name}><a href={props.boss.link}>{props.boss.name}</a></div>}
      { !props.boss.link && <div className={classes.boss_name}>{props.boss.name}</div>}
      <div className={classes.boss_location}>{props.boss.location}</div>
    </div>
  ) ;
};

export default BossItem;