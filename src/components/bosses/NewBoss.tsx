import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import classes from "../UI/form/form.module.css";
import Boss from "./Iboss";

interface NewBossProps {
  loadedBosses: Boss[];
  setLoadedBosses: React.Dispatch<React.SetStateAction<Boss[]>>;
}

interface SubmittableBoss {
  name: string;
  link?: string;
  location: string;
}

const bossValidationSchema = Yup.object().shape({
  name: Yup.string().required("Boss name is required."),
  link: Yup.string()
    .url("Url is invalid.")
    .transform((value) => (value === "" ? undefined : value))
    .nullable()
    .optional(),
  location: Yup.string().required("Boss location is required."),
});

const NewBoss: React.FC<NewBossProps> = (props) => {
  const { loadedBosses, setLoadedBosses } = props;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SubmittableBoss>({ resolver: yupResolver(bossValidationSchema) });

  const onSubmit: SubmitHandler<SubmittableBoss> = async (
    boss: SubmittableBoss
  ) => {
    try {
      const response = await fetch(
        process.env.REACT_APP_BACKEND_URL + "/bosses",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(boss, null, 2),
        }
      );
      const responseData = await response.json();
      setLoadedBosses([...loadedBosses, responseData.boss]);
      reset();
    } catch (err) {
      throw new Error("Cannot add new boss.");
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

        <label className={classes["form_label"]}>Location : </label>
        <input
          {...register("location")}
          placeholder="required"
          className={`${classes["form_input"]} ${
            errors.location ? classes["is_invalid"] : ""
          }`}
        />
        <button type="submit" className={classes["submit-button"]}>
          Submit
        </button>
      </form>
      <div className={classes["error-feedback"]}>{errors.name?.message}</div>
      <div className={classes["error-feedback"]}>{errors.link?.message}</div>
      <div className={classes["error-feedback"]}>
        {errors.location?.message}
      </div>
    </React.Fragment>
  );
};

export default NewBoss;
