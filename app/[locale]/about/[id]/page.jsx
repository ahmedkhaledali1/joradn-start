'use client';
import { useLocale, useTranslations } from 'next-intl';
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

function PrivacyScreen() {
  const t = useTranslations('privacyScreen');
  const [data, setData] = useState([]);
  const param = useParams();
  const locale = useLocale();
  const fetchData = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/page/${param.id}`,
        {
          headers: {
            'Content-Type': 'application/json',
            'x-localization': `${locale}`,
          },
        }
      );
      const data = await response.json();
      setData(data?.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  const paragraphs = data?.body?.split('<p>').slice('</p>');
  console.log(paragraphs);

  return (
    <div className="flex flex-col p-24 sm:p-2">
      <div className="h-[70vh] flex flex-col gap-6">
        <h1 className="text-red-900 text-4xl my-4 text-center font-semibold justify-center-center">
          {data?.title}
        </h1>
        <div className="w-[75%] sm:w-full text-gray-700 flex flex-col gap-5">
          {paragraphs?.map((p) => (
            <p className="text-2xl" key={p}>
              {p
                ?.replace(/<\/p>/g, '')
                .replace(/<br>/g, '')
                .replace(/&nbsp;/g, '')}
            </p>
          ))}

          {/* <p className="text-xl">{t('whenEnteringUserData')}</p>
          <p className="text-xl">{t('weMayUseYourUserData')}</p>
          <p className="text-xl">{t('sendPeriodicCorrespondence')}</p>
          <h2 className="font-medium text-2xl">{t('updates')}</h2>
          <p className="text-xl">{t('youCanNotifyUs')}</p> */}
        </div>
      </div>
    </div>
  );
}

export default PrivacyScreen;
