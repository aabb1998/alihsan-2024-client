import React from "react";

export const TextArea = ({ value, name, handleChange, maxLength=500 }) => {
  const handleInputChange = (event) => {
    let inputValue = event.target.value;
    if (inputValue.length <= maxLength) {
      inputValue = inputValue.slice(0, maxLength);
      handleChange(event);
    }
  };

  return (
    <div className="relative">
      <textarea
        className="min-h-[6.5rem] w-full resize-none"
        rows="4"
        name={name}
        placeholder="Message"
        onChange={handleInputChange}
        value={value}
      ></textarea>
      <div className="absolute z-10 text-sm bg-white bottom-2 right-2">
        {value?.length}/{maxLength}
      </div>
    </div>
  );
};

export default TextArea;
