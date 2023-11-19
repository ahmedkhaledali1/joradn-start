import React from 'react';

const Button = ({
  buttonType = 'submit',
  buttonClases,
  buttonContent,
  buttonH = '12',
  buttonBg = 'bg-red-900',
  buttonTextColor = 'text-white',
  rounded = 'rounded-md',
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      type={buttonType}
      className={`
      flex justify-center items-center text-center w-full
      ${buttonH} border-none px-2 font-medium cursor-pointer 
      ${buttonBg}
      !${buttonClases}   
      ${buttonTextColor}
      ${rounded} 
      `}
    >
      {buttonContent}
    </button>
  );
};

export default Button;
