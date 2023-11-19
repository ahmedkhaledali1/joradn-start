'use client';
import React, { useEffect, useState } from 'react';
import Card from '@/components/card';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useLocale } from 'next-intl';
function MyFav() {
  const [showSidebar, setShowSidebar] = useState(true);
  const [data1, setData] = useState([]);
  const session = useSession();
  const locale = useLocale();

  const [token, setToken] = useState('');
  useEffect(() => {
    if (session.data?.user?.data?.user.active == false) {
      window.location.href = `/auth/register?query=${session.data?.user?.data?.user.email}`;
    }
    setToken(session?.data?.user?.data?.token || session?.data?.user?.token);
  }, [session]);
  console.log(session?.data?.user?.data?.token);
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/my-favorites`,

        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
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
    if (token) {
      fetchData();
    }
  }, [token]);
  console.log(data1);
  return (
    <>
      <Header showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
      <div className="flex w-full">
        <div className={`flex-grow `}>
          <div className="  w-full   ">
            <div className=" pl-16 sm:!px-3 w-full mt-10 pr-10 ">
              <div className="cards flex-grow grid grid-cols-4 xl:grid-cols-2 sm:!grid-cols-1 pt-8 sm:z-30 gap-4">
                {data1.map((item) => (
                  <Card key={item.name} data={item} fav />
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

export default MyFav;
