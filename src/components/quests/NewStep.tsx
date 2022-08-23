import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import classes from "../UI/form/form.module.css";

interface SubmittableStep {
  text: string;
  link?: string;
}

const stepValidationSchema = Yup.object().shape({
  text: Yup.string().required("Step description is required."),
  link: Yup.string().url("Url is invalid.")
});

const NewStep = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SubmittableStep>({ resolver: yupResolver(stepValidationSchema) });

  const onSubmit: SubmitHandler<SubmittableStep> = (boss: SubmittableStep) =>
    console.log(JSON.stringify(boss, null, 2));
  return (
    <React.Fragment>
      <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
        <label className={classes["form_label"]}>Step description:</label>
        <textarea
          {...register("text", { required: true })}
          placeholder="required"
          className={`${classes["form_input"]} ${
            errors.text ? classes["is_invalid"] : ""
          }`}
          rows={3}
        />

        <label className={classes["form_label"]}>Link :</label>
        <input
          {...register("link")}
          placeholder="optional"
          className={`${classes["form_input"]} ${
            errors.link ? classes["is_invalid"] : ""
          }`}
        />
        <button type="submit" className={classes["submit-button"]}>Submit</button>
      </form>
      <div className={classes["error-feedback"]}>{errors.text?.message}</div>
      <div className={classes["error-feedback"]}>{errors.link?.message}</div>
    </React.Fragment>
  );
};

export default NewStep;