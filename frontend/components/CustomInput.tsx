import React from "react";

interface CustomInputProps {
  label: string;
  placeholder: string;
  name: string;
}

const CustomInput: React.FC<CustomInputProps> = ({
  label,
  placeholder,
  name,
}) => {
  return (
    <div className="form-item">
      <p className="form-label">{label}</p>
      <input
        placeholder={placeholder}
        type={name === "password" ? "password" : "text"}
        className="input-class shadow-md"
      />
    </div>
  );
};

export default CustomInput;
