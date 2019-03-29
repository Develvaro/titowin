import React from "react";
import { Input, FormFeedback } from "reactstrap";


const FileInput = ({
  input: { value, onUpload, ...restInput },
  name,
  id,
  placeholder,
  meta: { touched, error, warning }

}) => (
  <div>
    <Input
      type="file"
      {...restInput}
      name={name}
      id={id}
      placeholder={placeholder}
    />


{touched &&
      ((error && <FormFeedback>{error}</FormFeedback>) ||
        (warning && <span>{warning}</span>))}
  </div>
);

export default FileInput;
