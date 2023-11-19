'use client';
import { useLocale, useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { redirect, useRouter } from 'next/navigation';
import { Link } from 'next/link';
export default function AboutPage() {
  const [data, setData] = useState([]);
  const router = useRouter();
  const locale = useLocale();
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
    <div className="bg-red-900 text-xl h-screen sm:p-5 p-20 flex justify-between  text-white">
      <div className="flex flex-col items-start">
        {data?.map((item) => (
          <button
            className="my-10 text-3xl text-start"
            onClick={() => router.push(`/about/${item.id}`)}
            key={item.id}
          >
            {item.title}
          </button>
        ))}
      </div>
      <button
        onClick={() => router.back()}
        className="bg-gray-100 h-fit p-3 rounded-xl sm:w-10 sm:h-10"
      >
        <Image src={'/x.png'} alt="x" width={35} height={30} />
      </button>
    </div>
  );
}
