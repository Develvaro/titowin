import React from "react";
import { Input } from "reactstrap";

const Select = ({
  options,
  meta: {touched, error, warning},
  input: { onChange, ...restInput },
  value,
  name,
  id,
  onChangeFn
}) => (
  <div>
  <Input
    type="select"
    {...restInput}
    onChange={event => {
      onChange(event);
      if (onChangeFn) onChangeFn(event.target.value);
    }}
    value={value}
    name={name}
    id={id}
  >
    {options
      ? options.map(option => (
          <option key={option.value} value={option.value}>{option.name}</option>
        ))
      : null}
  </Input>

      {touched &&
    ((error && <span>{error}</span>) ||
      (warning && <span>{warning}</span>))}
  
  </div>
);

export default Select;
