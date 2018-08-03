import React from "react";
import { Input } from "reactstrap";

const FileInput = ({ input: {onUpload, ...restInput }, value, name, id, placeholder, meta }) => (
  <Input
    type="file"
    {...restInput}
    value={value}
    name={name}
    id={id}
    placeholder={placeholder}
  />
);

export default FileInput;
