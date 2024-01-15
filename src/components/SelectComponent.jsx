import React, { useState } from "react";

export default function SelectComponent({
  selectName,
  values,
  Placeholder,
  getValue,
}) {
  const SelectComponentClass = `form-floating mb-3 ${selectName}`;

  const [value, setValue] = useState("");

  const handleChange = (e) => {
    // if (e) {
    setValue(e.nativeEvent.srcElement.value);
    // }
    // getValue(e, selectName);
    console.log(value);
  };

  return (
    <div className={SelectComponentClass}>
      <select
        className="form-select"
        id={selectName}
        name={selectName}
        aria-label={Placeholder}
        onChange={handleChange}
      >
        {/* <!-- <option selected>Sexe</option> --> */}
        <option defaultValue value=""></option>
        <option value={values[0]}>{values[0]}</option>
        <option value={values[1]}>{values[1]}</option>
      </select>
      <label htmlFor={selectName}>{Placeholder}</label>
    </div>
  );
}
