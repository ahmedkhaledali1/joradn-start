'use client';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import LeftSide from '@/components/LeftSide';
import { useLocale } from 'next-intl';
function SingleBlogPage() {
  const param = useParams();
  const id = param.id;
  const locale = useLocale();

  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/blog/${id}`,
        {
          headers: {
            'Content-Type': 'application/json',
            'x-localization': `${locale}`,
          },
        }
      );
      const data = await response.json();
      // console.log(data);
      setData(data?.data);
    } catch (error) {
      console.log(error);
    }
  };
  // console.log(data.created_at.toString().slice(0, 10).replace(/-/g, '.'));
  useEffect(() => {
    fetchData();
  }, [id]);

  return (
    <div className=" py-12 sm:py-8 pr-16 sm:px-0 pl-16 flex gap-6 ">
      <div className="w-[73%] sm:w-full">
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: '33rem',
            maxHeight: '33rem',
            borderRadius: '12px',
            overflow: 'hidden',
          }}
        >
          <Image
            src={`https://dash.jordanstartshere.com/${data.image}`}
            fill
            sizes="(max-width: 640px) 640px, (max-width: 768px) 768px, (max-width: 1024px) 1024px, 1280px"
            className="object-cover"
            alt="card photo"
          />
        </div>
        <div className="flex flex-col gap-2 sm:px-2">
          <div className="flex justify-between ">
            <h1 className="text-3xl sm:text-base text-red-900 font-bold my-4">
              {data.title}{' '}
            </h1>
            <div className="flex gap-7 sm:gap-2 sm:flex-col mt-6 text-xl sm:text-sm pl-3 sm:pl-0 font-medium">
              <p className=" text-red-900 ">{data.section_name} </p>
              <p className="text-gray-600 ">
                {data?.created_at?.slice(0, 10).replace(/-/g, '.')}
              </p>
            </div>
          </div>
          <p className="text-xl">{data.description}</p>
        </div>
      </div>
      <div className="w-[28%] sm:hidden">
        <LeftSide />
      </div>
    </div>
  );
}

export default SingleBlogPage;
