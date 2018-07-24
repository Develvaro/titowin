import React from "react";
import { Input } from "reactstrap";

const DatePicker = ({ name, id, input }) => (
  <Input type="date" name={name} id={id} {...input} />
);

export default DatePicker;
