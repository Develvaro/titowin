import React from "react";
import { Input } from "reactstrap";

const TimePicker = ({ name, id, input: { value, ...rest } }) => (
  <Input type="time" name={name} id={id} {...rest} />
);

export default TimePicker;
