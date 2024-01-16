import PhoneInput from "react-phone-input-2";

export const PhoneField = ({ name, value, handleChange }) => (
  <PhoneInput
    country={"au"}
    placeholder="+38 (000) 000 - 00 - 00"
    value={value}
    inputStyle={{
      width: "100%",
      maxHeight: "2.75rem",
      height: "2.75rem",
      paddingLeft: "3rem",
    }}
    id={name}
    onChange={handleChange}
    inputProps={{
      name: { name },
    }}
  />
);

