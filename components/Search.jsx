'use client';
import axios from 'axios';
import { useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
// import Router from 'next/router';
import { useState } from 'react';

export const SearchBar = (showSearch) => {
  const [results, setResults] = useState([]);
  const locale = useLocale();
  const [input, setInput] = useState('');

  async function fetchData() {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/partners-by-name`,
        { name: input },
        {
          headers: {
            'Content-Type': 'application/json',
            'x-localization': `${locale}`,
          },
        }
      );
      setResults(response?.data?.data);
    } catch (error) {
      console.log(error);
    }
  }

  const handleChange = (value) => {
    if (showSearch) {
      setInput(value);
      fetchData(value);
    }
  };
  const router = useRouter();

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      window.location.href = `/search?query=${input}`;
    }
  };

  return (
    <div className="h-full relative overflow-visible ">
      <input
        className="outline-none h-full bg-inherit text-2xl "
        value={input}
        onChange={(e) => handleChange(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      {input !== '' && (
        <div
          className={`  w-full z-50   max-h-[400px] 
                           flex flex-col   absolute
                            left-0 rounded-b-xl pt-2
                         bg-gray-100 text-gray-700
                         overflow-y-auto
                      `}
        >
          {results.map((item) => (
            <div
              key={item.id}
              onClick={() => {
                setInput(item.name), handleKeyDown;
              }}
              className="my-1 hover:bg-blue-gray-200 p-2"
            >
              {item.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
