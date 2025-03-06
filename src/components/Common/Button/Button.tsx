import React from "react";

const Button = ({ className, text, onClick}:any) => {
  const baseStyles = "px-4 py-2 rounded focus:outline-none transition";
  
  return (
    <button
      className={`${className}`}
      onClick={onClick}
      
    >
    {text}  
    </button>
  );
};

export default Button;