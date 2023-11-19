'use client';
import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

function Cities() {
  const [cities, setCities] = useState([]);
  const locale = useLocale();

  const fetchCities = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/cities`,
        {
          headers: {
            'Content-Type': 'application/json',
            'x-localization': `${locale}`,
          },
        }
      );
      const data = await response.json();
      setCities(data?.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchCities();
  }, []);
  const goCity = (cityName) => {
    window.location.href = `/partners/discover?query=${cityName}`;
  };

  const t = useTranslations('discoverSide');

  return (
    <div className="w-full p-20">
      <div className="w-full flex flex-col mb-10  gap-16 items-center p-2">
        <h1 className=" text-4xl font-bold text-gray-700">{t('city')}</h1>
        <div className="w-[70%] grid grid-cols-6 gap-7">
          {cities &&
            cities.map((city) => (
              <div
                onClick={() => goCity(city.name)}
                key={city.id}
                className="rounded-xl overflow-hidden relative"
                style={{
                  position: 'relative',
                  width: '100%',
                  height: '130px',
                  maxHeight: '150px',
                  cursor: 'pointer',
                  backgroundColor: 'black',
                }}
              >
                <h3 className="absolute left-0 right-0 mx-auto text-xl text-center  z-30 top-[40%] text-white">
                  {city.name}
                </h3>
                <Image
                  src={`https://dash.jordanstartshere.com/${city.image}`}
                  alt="sun"
                  fill
                  sizes="(max-width: 640px) 640px, (max-width: 768px) 768px, (max-width: 1024px) 1024px, 1280px"
                  className="object-cover rounded-xl opacity-50"
                />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default Cities;
