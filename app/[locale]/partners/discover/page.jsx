'use client';
import React, { useEffect, useState } from 'react';
import Card from '@/components/card';
import Footer from '@/components/Footer';
import DiscoverSidebar from '@/components/DiscoverSide';
import Header from '@/components/Header';
import axios from 'axios';
import { useLocale, useTranslations } from 'next-intl';
function FirstPage() {
  const [showSidebar, setShowSidebar] = useState(true);
  const [data1, setData] = useState([]);
  const [originData, setOrigidata] = useState([]);
  const t = useTranslations('discoverPage');
  const locale = useLocale();

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
      setOrigidata(response?.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  console.log(data1);

  return (
    <>
      <Header showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
      <div className="flex w-full">
        {showSidebar && (
          <div className="w-[20rem]  sm:absolute sm:right-0 sm:w-full sm:z-50  border-l-gray-300">
            <DiscoverSidebar
              partenrs={data1}
              originData={originData}
              setPartenrs={setData}
            />
          </div>
        )}
        <div className={`flex-grow ${showSidebar && 'sm:hidden'}`}>
          <div className=" w-full   ">
            <div className=" pl-16 w-full mt-20 pr-10 ">
              <h1 className="text-3xl ">{t('discover')}</h1>

              <div className="cards flex-grow grid grid-cols-4 xl:grid-cols-2 sm:!grid-cols-1 pt-8 sm:z-30 gap-4">
                {data1.map((item) => (
                  <Card key={item.name} data={item} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`fixed bottom-0 -z-10   ${
          locale == 'ar' ? 'left-0' : 'right-0'
        } `}
      >
        <Footer />
      </div>
    </>
  );
}

export default FirstPage;
