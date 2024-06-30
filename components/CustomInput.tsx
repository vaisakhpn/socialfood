import React from "react";

interface CustomInputProps {
  label: string;
  placeholder: string;
}

const CustomInput: React.FC<CustomInputProps> = ({ label, placeholder }) => {
  return (
    <div className="form-item">
      <p className="form-label">{label}</p>
      <input placeholder={placeholder} className="input-class shadow-md" />
    </div>
  );
};

export default CustomInput;
