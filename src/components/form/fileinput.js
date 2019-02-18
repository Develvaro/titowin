import React from "react";
import { Input, FormFeedback } from "reactstrap";


const FileInput = ({
  input: { value, onUpload, ...restInput },
  name,
  id,
  placeholder,
}) => (
  <div>
    <Input

      type="file"
      {...restInput}
      value={value}
      name={name}
      id={id}
      placeholder={placeholder}
    />


  </div>
);

export default FileInput;
