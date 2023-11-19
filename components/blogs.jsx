'use client';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import LeftSide from '@/components/LeftSide';
import axios from 'axios';
import Slider from '@/components/Slider';
import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

function Blogs() {
  const locale = useLocale();
  const router = useRouter();
  const [data, setData] = useState([]);
  const [sections, setSections] = useState([]);
  const [activeSection, setActiveSection] = useState(0);

  const fetchSectoins = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/sections`,
        {
          headers: {
            'Content-Type': 'application/json',
            'x-localization': `${locale}`,
          },
        }
      );

      setSections(response?.data?.data);
      console.log(sections);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/get-blogs/${activeSection}`,
        {
          headers: {
            'Content-Type': 'application/json',
            'x-localization': `${locale}`,
          },
        }
      );
      const data = await response.json();
      console.log(data);
      setData(data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchSectoins();
    {
      activeSection && fetchData();
    }
  }, [activeSection]);

  const t = useTranslations('blogs');

  return (
    <div className=" py-12 px-20 sm:px-5 sm:py-3 flex gap-8 sm:gap-0 w-full">
      <div className="w-[70%] sm:!w-full">
        <h1 className="text-3xl pt-2 pb-8 font-medium text-gray-800">
          {t('department')}
        </h1>
        <div className="grid grid-cols-5 sm:grid-cols-3 gap-3 mb-8">
          {sections.map((item) => (
            <button key={item.name} onClick={() => setActiveSection(item.id)}>
              <p
                className={`py-2 px-3 sm:px-1 sm:py-1  rounded-xl text-lg sm:text-sm ${
                  activeSection === item.id
                    ? 'bg-red-900 text-white '
                    : '  bg-gray-200 text-gray-800'
                }  decoration-slice`}
              >
                {item.name}
              </p>
            </button>
          ))}
        </div>
        {activeSection ? (
          <div className="grid grid-cols-3  sm:!grid-cols-1 xl:grid-cols-2 gap-4 w-full">
            {data.map((card) => (
              <div key={card.id} className="bg-white rounded-2xl  p-2">
                <Link href={`/blogs/${card.id}`}>
                  <div
                    onClick={() => router.push(`/blogs/${card.id}`)}
                    style={{
                      position: 'relative',
                      width: '100%',
                      height: '17rem',
                      maxHeight: '20rem',
                    }}
                  >
                    <Image
                      src={`https://dash.jordanstartshere.com/${card.image}`}
                      fill
                      sizes="(max-width: 640px) 640px, (max-width: 768px) 768px, (max-width: 1024px) 1024px, 1280px"
                      className="object-cover rounded-t-2xl"
                      alt="card photo"
                    />
                  </div>
                </Link>
                <div className="bg-gray-200 h-[8rem] xl:h-[10rem]  text-gray-700 px-4 pb-4 pt-2 rounded-b-2xl flex flex-col">
                  <Link
                    href={`/blogs/${card.id}`}
                    className="text-xl font-medium multi-line-title hover:underline "
                  >
                    {card.title}
                  </Link>
                  <div className="h-[3rem] mb-2">
                    <p className="multi-line-ellipsis my-2 text-gray-600  ">
                      {card.description}
                    </p>
                  </div>

                  <div className="  self-end  font-medium text-gray-700">
                    {card.created_at?.slice(0, 10).replace(/-/g, '.')}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            <h2
              className={`font-medium text-3xl text-gray-700 pr-5 mt-20 sm:mt-10 mb-1 ${
                locale == 'ar' ? 'mx-1' : 'mx-2'
              }`}
            >
              {t('latestBlogs')}
            </h2>
            <div className="sm:h-[400px] h-[900px]">
              <Slider />
            </div>
          </>
        )}
      </div>
      <div className="w-[30%] sm:hidden">
        <LeftSide />
      </div>
    </div>
  );
}

export default Blogs;
