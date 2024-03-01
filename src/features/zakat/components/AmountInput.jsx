import React from "react";

export default function AmountInput({
  name,
  onChangeValue,
  onValidationError,
  required,
  ...props
}) {
  const _onChange = (e) => {
    const value = e.target.value;
    if (!value && required) return onValidationError(name, "Field is required");
    else if (!value) {
      onValidationError(name, "");
      return onChangeValue(name, 0);
    }
    const num = Number(value);
    if (isNaN(num) || num < 0) return onValidationError(name, "Invalid value");
    onValidationError(name, "");
    return onChangeValue(name, num);
  };
  return <input {...props} name={name} onChange={_onChange} />;
}
