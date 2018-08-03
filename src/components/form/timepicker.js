import React from "react";
import { Input } from "reactstrap";

const TimePicker = ({ name, id, input }) => (
  <Input type="time" name={name} id={id} {...input} />
);

export default TimePicker;
