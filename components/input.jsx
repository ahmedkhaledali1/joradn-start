'use client';
import { useLocale } from 'next-intl';
import Image from 'next/image';
import React, { useState } from 'react';
import { AiOutlineEyeInvisible, AiOutlinePhone } from 'react-icons/ai';
import { AiOutlineEye } from 'react-icons/ai';

const FormInput = ({
  minLength,
  label, // optional
  subLabel, // optional
  theType, // optional
  type,
  onChange,
  value,
  name,
  placeholder, // optional
  defaultValue, // optional
  required,
  disabled, // optional
  small, // optional
  className, // optional
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const locale = useLocale();
  return (
    <div className=" w-full">
      {label && (
        <label
          className="text-lg text-gray-700 font-medium pb-2 pr-1 block"
          htmlFor={name}
        >
          {label}
        </label>
      )}

      {subLabel && <p className="text-[#B8B8B8] text-xs">{subLabel}</p>}
      <div className=" flex bg-gray-100 text-xl  ">
        {type === 'password' && (
          <div
            className={`cursor-pointer flex text-gray-600 justify-center items-center ${
              locale == 'ar' ? 'pr-5' : 'pl-5'
            } text-2xl`}
          >
            <Image src={'/kfl.png'} width={25} height={25} alt="phone" />
          </div>
        )}
        <input
          minLength={minLength ? minLength : 1}
          className={`h-10 w-full rounded-[4px] bg-gray-100
           border-trans21 outline-none py-1  pr-5  pl-5
           ${(type === 'password') & (showPassword == false) && 'text-6xl pb-4'}
           !${className}         
           `}
          required={required ? required : false}
          type={(type === 'password') & (showPassword == true) ? 'text' : type}
          placeholder={placeholder}
          defaultValue={defaultValue}
          disabled={disabled}
          value={value}
          name={name}
          onChange={onChange}
        />
        {type === 'password' && showPassword && (
          <div
            className={` cursor-pointer flex justify-center items-center ${
              locale == 'ar' ? 'pr-5' : 'pl-5'
            } text-2xl`}
            onClick={() => setShowPassword(false)}
          >
            <AiOutlineEye />
          </div>
        )}
        {type === 'password' && !showPassword && (
          <div
            className={`cursor-pointer  flex justify-center items-center ${
              locale == 'ar' ? 'pr-5' : 'pl-5'
            } text-2xl`}
            onClick={() => setShowPassword(true)}
          >
            <AiOutlineEyeInvisible />
          </div>
        )}
        {type === 'tel' && (
          <div
            className={`cursor-pointer  flex justify-center items-center ${
              locale == 'ar' ? 'pr-5' : 'pl-5'
            } text-2xl`}
            onClick={() => setShowPassword(true)}
          >
            <AiOutlineEyeInvisible />
          </div>
        )}
      </div>
    </div>
  );
};

export default FormInput;
