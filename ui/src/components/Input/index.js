import React from "react";
import Input from "@material-ui/core/Input";
import "./index.scss";

function InputElement({ ...props }, ref) {
  return (
    <Input
      ref={ref}
      onKeyDown={props.onChange}
      placeholder={props.placeholder}
      className="Input"
      {...props}
    />
  );
}

const InputRef = React.forwardRef(InputElement);
export default InputRef;
