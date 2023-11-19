'use client';
import Card from '@/components/card';
import Slider from '@/components/Slider';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useLocale } from 'next-intl';
import React, { useEffect, useState } from 'react';

function HomeScreen() {
  const [data1, setData] = useState([]);
  const session = useSession();
  const locale = useLocale();

  console.log(session);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/partners`,
        {
          headers: {
            'Content-Type': 'application/json',
            'x-localization': `${locale}`,
          },
        }
      );
      setData(response?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="w-full">
      <div className="h-[80vh] p-6 sm:p-0 sm:h-[60vh]">
        <Slider />
      </div>
      <div className=" w-full pt-5  ">
        <div className="flex pl-16 sm:pl-3 w-full ">
          <div className="cards flex-grow grid grid-cols-4 xl:grid-cols-2 mb-10 sm:!grid-cols-1 pt-8  pr-10 sm:pr-3  gap-4">
            {data1?.slice(0, 12).map((item) => (
              <Card key={item.id} data={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeScreen;
