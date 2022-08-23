import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import classes from "../UI/form/form.module.css";
import Category from "./Icategory";

interface NewCategoryProps {
  loadedCategories: Category[];
  setLoadedCategories: React.Dispatch<React.SetStateAction<Category[]>>;
}

interface SubmittableCategory {
  name: string;
  link?: string;
  parent?: string;
}

const categoryValidationSchema = Yup.object().shape({
  name: Yup.string().required("Name of category is required."),
  link: Yup.string()
    .url("Url is invalid.")
    .transform((value) => (value === "" ? undefined : value))
    .nullable()
    .optional(),
});

const NewCategory: React.FC<NewCategoryProps> = (props) => {
  const { loadedCategories, setLoadedCategories } = props;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SubmittableCategory>({
    resolver: yupResolver(categoryValidationSchema),
  });

  const onSubmit: SubmitHandler<SubmittableCategory> = async (
    category: SubmittableCategory
  ) => {
    try {
      const response = await fetch(
        process.env.REACT_APP_BACKEND_URL + "/categories",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(category, null, 2),
        }
      );
      const responseData = await response.json();
      setLoadedCategories([...loadedCategories, responseData.category]);
      reset();
    } catch (err) {
      throw new Error("Cannot add new category.");
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

export default NewCategory;
