import React, { useState } from "react";

export default function InputComponent({
  inputType,
  inputName,
  inputPlaceholder,
  isRequired = true,
  getValue,
  defaultInputValue,
}) {
  const InputComponentClass = `form-floating mb-3 ${inputName}`;

  const [value, setValue] = useState();

  // () => {
  //   setValue(defaultInputValue);
  // }

  const handleChange = (e) => {
    setValue(e.target.value);
    getValue(e, inputName);
  };

  return (
    <div className={InputComponentClass}>
      <input
        type={inputType}
        className="form-control"
        id={inputName}
        name={inputName}
        value={value}
        onChange={handleChange}
        placeholder={inputPlaceholder}
        required={isRequired}
      />
      <label htmlFor={inputName}>{inputPlaceholder}</label>
    </div>
  );
}
