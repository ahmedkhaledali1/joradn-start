'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';

function Footer2() {
  const [data, setData] = useState([]);
  const locale = useLocale();
  const t = useTranslations('footer2');

  const fetchData = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/pages`,
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
  return (
    <div className="sm:hidden mb-0 h-14 p-3 text-lg px-14 bg-red-900 text-white flex items-center justify-between ">
      <div>
        <div>
          {t('footer2')} -
          <Link
            className="hover:underline"
            target={'_blank'}
            href={
              'https://wecan.jo/?fbclid=IwAR2K3eWyALWUtXDW7aU5RAooAPblog64SvDcy9RTjeQj0OTyjwCPksJwHLM'
            }
          >
            We Can
          </Link>
        </div>
      </div>
      <div className="flex gap-5 flex-row-reverse">
        {data.map((item) => (
          <Link key={item.id} href={`/about/${item.id}`}>
            {item.title}
          </Link>
        ))}
        <Link href={'/contact-us'}>{t('contactUs')}</Link>
      </div>
    </div>
  );
}

export default Footer2;
