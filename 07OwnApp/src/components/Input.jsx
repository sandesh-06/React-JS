import React, { useId } from "react";

const Input = (
  { label, type = "text", className = "", ...props },
  ref
) => {
  const id = useId();

  return (
    <div className="w-full">
      {label && (
        <label className="inline-block mb-1 pl-1" htmlFor={id}>
          {label}
        </label>
      )}
      <input
        type={type}
        id={id}
        className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
        {...props}
        ref = {ref} //this will give refernce of this input field to the parent contianer
      />
    </div>
  );
};

export default  React.forwardRef(Input);
