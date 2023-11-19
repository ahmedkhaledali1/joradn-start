'use client';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

function LeftSide() {
  const { data: session } = useSession();
  const [token, setToken] = useState('');
  const Locale = useLocale();
  const router = useRouter();
  useEffect(() => {
    if (session) {
      setToken(session?.user?.token);
    }
  }, [session]);
  // .log(token);

  const [data, setData] = useState([]);
  const [adds, setAdds] = useState([]);
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/recent-blogs`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `bearer ${token}`,
            'x-localization': `${Locale}`,
          },
        }
      );
      setData(response?.data?.data);
    } catch (error) {}
  };
  const fetchAdds = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/ads`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `bearer ${token}`,
            'x-localization': `${Locale}`,
          },
        }
      );
      // console.log(response);
      setAdds(response?.data?.data);
    } catch (error) {}
  };
  useEffect(() => {
    fetchData();
    fetchAdds();
  }, []);
  const t = useTranslations('leftSide');
  console.log(data);
  return (
    <div className="w-full py-2 sm:hidden">
      <div
        onClick={() => router.push(adds[0]?.link)}
        style={{
          position: 'relative',
          width: '100%',
          height: '20rem',
          maxHeight: '22rem',
        }}
      >
        <Image
          src={`https://dash.jordanstartshere.com/${adds[0]?.image}`}
          fill
          sizes="(max-width: 640px) 640px, (max-width: 768px) 768px, (max-width: 1024px) 1024px, 1280px"
          className="object-cover rounded-xl"
          alt="card photo"
        />
      </div>
      <h3 className="text-red-900 text-3xl font-semibold my-10 pr-2">
        {t('mostView')}{' '}
      </h3>
      <div className="my-4">
        {data.map((card) => (
          <div key={card.id} className="flex bg-gray-100 rounded-lg  p-2 mb-4">
            <Link href={`/blogs/${card.id}`} className="w-[40%]">
              <div
                style={{
                  position: 'relative',
                  width: '8rem',
                  height: '7rem',
                  maxHeight: '7rem',
                }}
              >
                <Image
                  src={`https://dash.jordanstartshere.com/${card.image}`}
                  fill
                  sizes="(max-width: 640px) 640px, (max-width: 768px) 768px, (max-width: 1024px) 1024px, 1280px"
                  className="object-cover rounded-lg"
                  alt="card photo"
                />
              </div>
            </Link>
            <div className="bg-gray-100 px-3  rounded-lg">
              <div className="flex flex-col">
                <h1 className="multi-line-title font-medium text-xl max-h-14 overflow-hidden text-gray-700">
                  {card?.title}
                </h1>
                <div className="h-[3rem] mb-2">
                  <p className="multi-line-ellipsis my-1 text-lg text-gray-600  ">
                    {card?.description}
                  </p>
                </div>
                <div className="flex flex-row-reverse justify-between">
                  <div className=" px-1 self-end  font-medium text-gray-700">
                    {card?.created_at?.slice(0, 10).replace(/-/g, '.')}
                  </div>
                  <div className=" px-1 self-start  font-medium text-red-900">
                    {card?.section_name}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LeftSide;
