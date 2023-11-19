import { useLocale } from 'next-intl';
import Image from 'next/image';
import { useState } from 'react';
import { AiOutlinePhone } from 'react-icons/ai';
import Input, {
  getCountries,
  getCountryCallingCode,
} from 'react-phone-number-input/input';
import en from 'react-phone-number-input/locale/en.json';
import 'react-phone-number-input/style.css';
const Phoneinput = ({ phoneNumber, setPhoneNumber }) => {
  const [onFocuseInput, setOnFocuseInput] = useState('');
  const [country, setCountry] = useState('US');
  const locale = useLocale();

  const CountrySelect = ({ value, onChange, labels, ...rest }) => (
    <select
      className="text-xl"
      {...rest}
      value={value}
      onChange={(event) => {
        onChange(event.target.value || undefined);
      }}
    >
      <option className="text-xl" value="">
        {country}
      </option>
      {getCountries().map((country) => (
        <option className="text-xl" key={country} value={country}>
          {labels[country]} +{getCountryCallingCode(country)}
        </option>
      ))}
    </select>
  );

  return (
    <>
      <div className="mb-6 flex  bg-gray-100">
        <div
          className={`cursor-pointer text-gray-600 flex justify-center items-center mx-4 text-2xl`}
        >
          <Image src={'/phonen.png'} width={25} height={25} alt="phone" />
        </div>
        <Input
          className={`${
            onFocuseInput === 'phoneNumber'
              ? 'focusedInput w-full'
              : 'registerInput w-full'
          } h-10 w-full rounded-[4px] bg-gray-100
          border-trans21 outline-none py-1  pr-5  pl-5`}
          placeholder="phoneNumber"
          dir="ltr"
          country={country}
          value={phoneNumber}
          onChange={setPhoneNumber}
          name="phoneNumber"
          onFocus={() => setOnFocuseInput('phoneNumber')}
          required
        />
        <CountrySelect
          className={`border-b-2 bg-none outline-none w-1/4 text-xl ${
            onFocuseInput === 'country' ? 'border-blue-700 ' : 'border-gray-300'
          }`}
          labels={en}
          // defaultCountry="US"
          value={country}
          onChange={setCountry}
          name="countrySelect"
          onFocus={() => setOnFocuseInput('country')}
        />
      </div>
    </>
  );
};

export default Phoneinput;
