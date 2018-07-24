import React from "react";
import { Input } from "reactstrap";

const Select = ({
  options,
  input: { onChange, ...restInput },
  value,
  name,
  id,
  onChangeFn
}) => (
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
          <option value={option.value}>{option.name}</option>
        ))
      : null}
  </Input>
);

export default Select;
