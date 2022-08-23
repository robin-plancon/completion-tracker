import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import classes from "../UI/form/form.module.css";
import Quest from "./Iquest";

interface NewQuestProps {
  loadedQuests: Quest[];
  setLoadedQuests: React.Dispatch<React.SetStateAction<Quest[]>>;
}

interface SubmittableQuest {
  name: string;
  link?: string;
}

const bossValidationSchema = Yup.object().shape({
  name: Yup.string().required("Boss name is required."),
  link: Yup.string()
    .url("Url is invalid.")
    .transform((value) => (value === "" ? undefined : value))
    .nullable()
    .optional(),
});

const NewQuest: React.FC<NewQuestProps> = (props) => {
  const { loadedQuests, setLoadedQuests } = props;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SubmittableQuest>({
    resolver: yupResolver(bossValidationSchema),
  });

  const onSubmit: SubmitHandler<SubmittableQuest> = async (
    quest: SubmittableQuest
  ) => {
    try {
      console.log(JSON.stringify(quest, null, 2));
      const response = await fetch(
        process.env.REACT_APP_BACKEND_URL + "/quests",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(quest, null, 2),
        }
      );
      const responseData = await response.json();
      setLoadedQuests([...loadedQuests, responseData.quest]);
      reset();
    } catch (err) {
      throw new Error("Cannot add new quest.");
    }
  };
  
  return (
    <React.Fragment>
      <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
        <label className={classes["form_label"]}>Name:</label>
        <input
          {...register("name", { required: true })}
          placeholder="required"
          className={`${classes["form_input"]} ${
            errors.name ? classes["is_invalid"] : ""
          }`}
        />

        <label className={classes["form_label"]}>Link :</label>
        <input
          {...register("link")}
          placeholder="optional"
          className={`${classes["form_input"]} ${
            errors.link ? classes["is_invalid"] : ""
          }`}
        />
        <button type="submit" className={classes["submit-button"]}>
          Submit
        </button>
      </form>
      <div className={classes["error-feedback"]}>{errors.name?.message}</div>
      <div className={classes["error-feedback"]}>{errors.link?.message}</div>
    </React.Fragment>
  );
};

export default NewQuest;
