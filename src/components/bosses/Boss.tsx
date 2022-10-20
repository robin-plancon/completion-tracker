import Trashcan from "../UI/icons/Trashcan";

import classes from "./Boss.module.css";
import Boss from "./Iboss";

interface BossItemProps {
  boss: {
    _id: string;
    name: string;
    link?: string;
    status?: boolean;
    location: string;
    id?: string;
  };
  loadedBosses: Boss[];
  setLoadedBosses: React.Dispatch<React.SetStateAction<Boss[]>>;
}

const deleteBoss = async (
  boss_id: string,
  loadedBosses: Boss[],
  setLoadedBosses: React.Dispatch<React.SetStateAction<Boss[]>>
) => {
  try {
    const response = await fetch(
      process.env.REACT_APP_BACKEND_URL + "/bosses/" + boss_id,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    await response.json();
    loadedBosses.splice(
      loadedBosses.findIndex((boss: Boss) => boss.id === boss_id),
      1
    );
    setLoadedBosses([...loadedBosses]);
  } catch (err) {
    throw new Error("Cannot delete boss.");
  }
};

const BossItem: React.FC<BossItemProps> = (props) => {
  const { loadedBosses, setLoadedBosses } = props;

  console.log(loadedBosses);

  return (
    <div className={classes.boss}>
      {props.boss.link && (
        <div className={classes.boss_name}>
          <a href={props.boss.link} target="_blank" rel="noreferrer">
            {props.boss.name}
          </a>
        </div>
      )}
      {!props.boss.link && (
        <div className={classes.boss_name}>{props.boss.name}</div>
      )}
      <div className={classes.boss_location}>{props.boss.location}</div>
      <div
        className={classes.trash_icon}
        onClick={() =>
          deleteBoss(props.boss._id, loadedBosses, setLoadedBosses)
        }
      >
        <Trashcan />
      </div>
    </div>
  );
};

export default BossItem;
