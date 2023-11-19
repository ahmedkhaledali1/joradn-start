'use client';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Card from '@/components/card';
import axios from 'axios';
import { useLocale, useTranslations } from 'next-intl';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const SearchResultsPage = () => {
  const locale = useLocale();

  let query;
  if (typeof window !== 'undefined') {
    const urlParams = new URLSearchParams(window.location.search);
    query = urlParams.get('query');
  }

  const [showSidebar, setShowSidebar] = useState(false);
  const [data1, setData] = useState([]);
  async function fetchData() {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/partners-by-name`,
        { name: query },
        {
          headers: {
            'Content-Type': 'application/json',
            'x-localization': `${locale}`,
          },
        }
      );
      setData(response?.data?.data);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    fetchData();
  }, []);
  const t = useTranslations('discoverPage');

  return (
    <>
      {data1.length > 0 && (
        <>
          <Header showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
          <div className="flex w-full">
            <div className={`flex-grow `}>
              <div className="h-[110vh]  w-full   ">
                <div className=" pl-16 w-full mt-20 pr-10 sm:!p-4 sm:mt-5">
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
      )}

      {
        (data1.length = 0 && (
          <div className=" text-3xl mt-20 text-center w-full">NO RESULTS</div>
        ))
      }
    </>
  );
};

export default SearchResultsPage;
