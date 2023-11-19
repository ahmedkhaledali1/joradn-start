'use client';
import Image from 'next/image';
import React, { useCallback, useEffect, useState } from 'react';
import Advice from './advice';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Weather from './weather';
import { useLocale, useTranslations } from 'next-intl';

function HomeSide() {
  const [categories, setCategories] = useState([]);
  const [cities, setCities] = useState([]);
  const [suggestedPartnerId, setSsuggestedPartnerId] = useState();
  const router = useRouter();
  const locale = useLocale();
  const fetchCtegories = useCallback(async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/categories`,
        {
          headers: {
            'Content-Type': 'application/json',
            'x-localization': `${locale}`,
          },
        }
      );
      setCategories(response?.data?.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const fetchCities = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/cities`,
        {
          headers: {
            'Content-Type': 'application/json',
            'x-localization': `${locale}`,
          },
        }
      );
      const data = await response.json();
      setCities(data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const goCategory = (categoryId) => {
    window.location.href = `/partners/categories-partners?query=${categoryId}`;
  };
  const goCity = (cityName) => {
    window.location.href = `/partners/discover?query=${cityName}`;
  };
  const fetchSuggestedPartnerId = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/suggested-partner`,
        {
          headers: {
            'Content-Type': 'application/json',
            'x-localization': `${locale}`,
          },
        }
      );
      const data = await response.json();
      setSsuggestedPartnerId(data?.data?.id);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCtegories();
    fetchCities();
    fetchSuggestedPartnerId();
  }, []);

  const t = useTranslations('homeSide');

  return (
    <div className=" flex flex-col h-max overflow-clip w-full border-l px-6 sm:px-2 pt-12 text-gray-600 ">
      <div className=" min-h-[21rem] w-full">
        <div className="min-h-[7rem] flex gap-4">
          <div className="w-[65%]">
            <Advice />
          </div>

          <div className="w-[35%]">
            <Weather />
          </div>
        </div>
        <div className="h-[6rem] flex mt-3 gap-4">
          <div className="w-[55%] h-full ">
            <Link
              href={'/help'}
              className="h-full flex gap-7 items-center pr-6 bg-pink-900 bg-opacity-20 p-2 rounded-xl"
            >
              <div className="h-10">
                <Image
                  src="/help.png"
                  alt="sun"
                  className="text-opacity-70"
                  width={20}
                  height={20}
                />
              </div>
              <span className="text-lg font-medium"> {t('help')} !</span>
            </Link>
          </div>
          <Link
            href={`/partners/${suggestedPartnerId}`}
            className="w-[45%] gap-3 flex justify-center items-center rounded-xl h-full bg-opacity-50 bg-green-100"
          >
            <Image src="/zahr.png" alt="sun" width={25} height={25} />
            <p className="text-lg font-medium">{t('suggest')}</p>
          </Link>
        </div>
        <div className="grid grid-cols-5 gap-2  my-4">
          {categories &&
            categories?.map((category) => (
              <button
                key={category.id}
                onClick={() => goCategory(category.id)}
                className=" bg-gray-100 rounded-lg h-[5rem] flex justify-center items-center"
              >
                <Image
                  src={`https://dash.jordanstartshere.com/${category?.image}`}
                  alt="sun"
                  className="text-opacity-70"
                  width={40}
                  height={40}
                />
              </button>
            ))}
        </div>
      </div>
      <div className="mb-4">
        <div
          className="bg-gray-50  py-3 pr-3 w-fullrounded-xl"
          // onClick={() => setMenuVisible((visible) => !visible)}
        >
          <button className="px-3 w-full text-xl flex justify-between font-medium">
            <span className=" text-gray-600 flex gap-3 ">
              <span>
                <Image
                  src={'/elmadena.png'}
                  alt="more"
                  width={22}
                  height={22}
                />
              </span>
              <span>{t('city')}</span>
            </span>
            <span className="flex gap-4 items-center text-center pl-4">
              <Link href={'/cities'} className="text-center">
                {t('more')}
              </Link>
              <div className="h-full">
                <Image src={'/more.png'} alt="more" width={22} height={22} />
              </div>
            </span>
          </button>
        </div>
        <div className=" py-3  rounded-md bg-gray-50 grid grid-cols-3 gap-3">
          {cities &&
            cities.map((city) => (
              <button
                className=" rounded-xl"
                onClick={() => goCity(city.name)}
                key={city.id}
                style={{
                  position: 'relative',
                  width: '100%',
                  height: '170px',
                  maxHeight: '170px',
                  cursor: 'pointer',
                  backgroundColor: 'black',
                }}
              >
                <h3 className="absolute left-0 right-0 mx-auto text-center  text-xl z-30 top-[40%] text-white">
                  {city.name}
                </h3>
                <Image
                  src={`https://dash.jordanstartshere.com/${city.image}`}
                  fill
                  sizes="(max-width: 640px) 640px, (max-width: 768px) 768px, (max-width: 1024px) 1024px, 1280px"
                  className="object-fill rounded-xl opacity-50"
                  alt="card photo"
                />
              </button>
            ))}
        </div>
      </div>
    </div>
  );
}

export default HomeSide;
