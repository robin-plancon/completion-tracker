import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import classes from "../UI/form/form.module.css";

interface SubmittableBoss {
  name: string;
  link?: string;
  location?: string;
}

const bossValidationSchema = Yup.object().shape({
  name: Yup.string().required("Boss name is required."),
  link: Yup.string().url("Url is invalid."),
  location: Yup.string(),
});

const NewBoss = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SubmittableBoss>({ resolver: yupResolver(bossValidationSchema) });

  const onSubmit: SubmitHandler<SubmittableBoss> = (boss: SubmittableBoss) =>
    console.log(JSON.stringify(boss, null, 2));
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
          placeholder="optional"
          className={`${classes["form_input"]} ${
            errors.location ? classes["is_invalid"] : ""
          }`}
        />
        <button type="submit" className={classes["submit-button"]}>Submit</button>
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
