import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import ReactFormChild from "./ReactFormChild";
import { Input } from "./components";
const ReactForm = () => {
  const { control, handleSubmit, watch} = useForm();

  const watchFields = watch();
  const submitHandler = (data) => {
    console.log(data);
  };

  const slugTransform = React.useCallback((value) => {
    if (value && typeof value === "string") {
      return value
        .trim()
        .toLowerCase()
        .replace(/^[a-zA-Z\d]+/g, "-");
    }

    return "";
  });

  // React.useEffect(() => {
  //   const subscription = watch((value, { name }) => {
  //     if (name === "username") {
  //       setValue("username", slugTransform(value.username));
  //     }
  //   });
  //   return () => subscription.unsubscribe();
  // }, [watch, slugTransform, setValue]);

  return (
    <div className="bg-slate-500 flex justify-center items-center min-h-screen">
      <form action="" onSubmit={handleSubmit(submitHandler)}>
        <ReactFormChild name="username" control={control} />
        <ReactFormChild name="password" control={control}/>
        <button type="submit" className="mt-10 bg-blue-200 p-3">
          Submit
        </button>
        {watchFields && <p>Name: {watchFields.username}</p>}
      </form>
    </div>
  );
};

export default ReactForm;
