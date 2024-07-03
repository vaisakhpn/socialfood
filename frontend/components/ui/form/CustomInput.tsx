import React from "react";
import { useFormContext } from "react-hook-form";

interface CustomInputProps {
  label: string;
  placeholder: string;
  name: string;
  type: string;
}

const CustomInput: React.FC<CustomInputProps> = ({
  label,
  placeholder,
  name,
  type,
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const error = errors[name];

  return (
    <div className="form-item">
      <p className="form-label">{label}</p>
      <input
        {...register(name)}
        placeholder={placeholder}
        type={type}
        className={`input-class shadow-md ${error ? "border-red-500" : ""}`}
      />
      {error && (
        <p className="text-red-500 text-sm mt-1">
          {error.message as React.ReactNode}
        </p>
      )}
    </div>
  );
};

export default CustomInput;
