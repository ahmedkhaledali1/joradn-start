'use client';
import { useLocale, useTranslations } from 'next-intl';
import React, { useEffect, useState } from 'react';

function Advice() {
  const [advice, setAvice] = useState('');
  const locale = useLocale();

  const fetchData = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/advices`,
        {
          headers: {
            'Content-Type': 'application/json',
            'x-localization': `${locale}`,
          },
        }
      );
      const data = await response.json();
      // console.log(data);
      setAvice(data?.data[0].body);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  const t = useTranslations('homeSide');

  return (
    <div className="w-full h-full bg-gray-100 p-2 px-4 rounded-xl">
      <h1 className="text-xl text-light-blue-600"> {t('advice')} :</h1>
      <p className="text-lg sm:text-base">{advice}</p>
    </div>
  );
}

export default Advice;
