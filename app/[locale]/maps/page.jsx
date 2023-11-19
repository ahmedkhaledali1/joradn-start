'use client';
import DiscoverSidebar from '@/components/DiscoverSide';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Map from '@/components/map';
import axios from 'axios';
import { useLocale } from 'next-intl';
import React, { useEffect, useState } from 'react';

function Maps() {
  const [showSidebar, setShowSidebar] = useState(true);
  const [data1, setData] = useState([]);
  const branches = data1?.map((partner) => partner.branches);
  const bigArray = branches.reduce(
    (acc, innerArray) => [...acc, ...innerArray],
    []
  );
  const locale = useLocale();
  const [originData, setOrigidata] = useState([]);
  const location = {
    address: 'Martins coffee and sweets, Naltshek Street, Amman, Jordan',
    lat: 31.963158,
    lng: 35.930359,
  };
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
  console.log(bigArray);
  console.log(data1);
  return (
    <>
      <Header showSidebar={showSidebar} setShowSidebar={setShowSidebar} />

      <div className="flex w-full ">
        {showSidebar && (
          <div className="w-[20rem]  h-screen overflow-y-scroll bg-white sm:absolute sm:right-0 sm:w-full sm:z-50  border-l-gray-300">
            <DiscoverSidebar
              partenrs={data1}
              originData={originData}
              setPartenrs={setData}
            />
          </div>
        )}
        <div className={`flex-grow ${showSidebar && 'sm:hidden'}`}>
          <div className="h-[110vh]  w-full   ">
            <div className=" w-full">
              <div className="cards flex-grow  sm:z-30 h-screen ">
                <Map
                  branches={bigArray}
                  zoomLevel={15}
                  data1={data1}
                  setData={setData}
                  originData={originData}
                  setOrigidata={setOrigidata}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="fixed bottom-0 -z-10 left-0">
        <Footer />
      </div>
    </>
  );
}

export default Maps;
