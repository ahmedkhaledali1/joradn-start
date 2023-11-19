'use client';
import React, { useEffect, useRef, useState } from 'react';
import updown from '@/public/updown.svg';
import Image from 'next/image';
import {
  MdOutlineKeyboardDoubleArrowUp,
  MdOutlineKeyboardDoubleArrowDown,
} from 'react-icons/md';
import { Rating } from 'react-simple-star-rating';
import { useLocale, useTranslations } from 'next-intl';

function CategorySidebar({
  partenrs,
  setPartenrs,
  originData,
  categories,
  departmentSlelectedId,
  setdepartmentSlelectedId,
  subdepartmentSlelectedId,
}) {
  const locale = useLocale();

  const [menuVisible, setMenuVisible] = useState(false);
  const [menuTowns, setMenuTowns] = useState(false);
  const [showDepartments, seshowDepartments] = useState(true);

  const [cities, setCities] = useState([]);
  const [checkedCity, setCheckedCity] = useState({});
  const [checkedCityName, setCheckedCityName] = useState(undefined);
  const [checkedAreaName, setCheckedAreaName] = useState(undefined);
  const prices = originData?.map((item) => item?.start_price);

  const maxPrice = Math.max(...prices);

  const [price, setPrice] = useState(0);

  const [rating, setRating] = useState(0);
  const [handeledRate, setHandledRate] = useState(0);
  const handleRating = () => {
    setRating(handeledRate);
  };
  const onPointerMove = (value) => setHandledRate(value);

  const fetchData = async () => {
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
  useEffect(() => {
    fetchData();
  }, []);

  const filtering = async (data) => {
    let filteredData = data;

    if (checkedCityName !== undefined) {
      filteredData = filteredData.filter((partner) =>
        partner.branches.some((branch) => branch.city_name === checkedCityName)
      );
    }

    if (checkedAreaName !== undefined) {
      filteredData = filteredData.filter((partner) =>
        partner.branches.some((branch) => branch.area_name === checkedAreaName)
      );
    } else {
    }

    if ((price > 0) & (price < maxPrice)) {
      filteredData = filteredData.filter(
        (partner) =>
          partner.start_price === price || partner.start_price > price
      );
      console.log(filteredData);
    }
    if (rating) {
      filteredData = filteredData.filter(
        (partner) => partner.rating == rating || partner.rating > rating
      );
    }

    setPartenrs(filteredData);
  };

  function filter() {
    filtering(originData);
  }

  useEffect(() => {
    setCheckedCity({});
    setCheckedCityName();
    setCheckedAreaName();
    setPrice(0);
    setRating(0);
    setMenuVisible(false);
  }, [departmentSlelectedId, subdepartmentSlelectedId]);
  const t = useTranslations('categorySide');

  return (
    <div
      className={`flex flex-col mt-20  w-full ${
        locale == 'ar' ? 'border-l pl-4' : 'border-r pr-4'
      }  `}
    >
      <div className={` text-gray-600  `}>
        <div className="  flex gap-2.5  text-2xl font-medium cursor-pointer ">
          <div className="pt-1">
            <Image src={updown} alt="updown" />
          </div>

          <div
            className=" pr-1 w-[90%] rounded-xl"
            onClick={() => seshowDepartments((visible) => !visible)}
          >
            <div className="">{t('mainDepartments')}</div>
          </div>
        </div>

        {showDepartments && (
          <ul className=" pt-3 flex flex-col gap-1">
            {categories &&
              categories.map((categorie) => (
                <li
                  key={categorie.id}
                  onClick={() => {
                    setdepartmentSlelectedId(categorie.id);
                  }}
                  className={`
           ${
             departmentSlelectedId == categorie.id
               ? 'bg-red-900 text-white'
               : 'bg-gray-100 text-black'
           }           
            text-xl font-medium h-12
            rounded-lg flex  items-center mb-1`}
                >
                  <Image
                    width={20}
                    height={20}
                    src={`https://dash.jordanstartshere.com/${categorie.image}`}
                    className={`  ${locale == 'ar' ? 'mr-3' : 'ml-3'} `}
                    alt={categorie.name}
                  />
                  <span className={`  ${locale == 'ar' ? 'mr-3' : 'ml-3'} `}>
                    {categorie.name}
                  </span>
                </li>
              ))}
          </ul>
        )}
      </div>
      <div className=" mt-6  text-gray-600 ">
        <div className=" mb-6 flex gap-2.5  text-2xl font-medium ">
          <div className="pt-1">
            <Image src={updown} alt="updown" />
          </div>
          <div className="">{t('filtering')}</div>
        </div>
        <div className="mb-4">
          <div
            className="bg-gray-100  py-3 px-3 w-[95%] rounded-xl"
            onClick={(e) => {
              e.preventDefault(), setMenuVisible((visible) => !visible);
            }}
          >
            <button className="px-3 w-full text-xl flex justify-between font-medium">
              <span className=" text-gray-600">{t('city')}</span>
              <span className=" text-red-800 text-3xl">
                {menuVisible ? (
                  <MdOutlineKeyboardDoubleArrowUp />
                ) : (
                  <MdOutlineKeyboardDoubleArrowDown />
                )}
              </span>
            </button>
          </div>
          {menuVisible && (
            <ul
              className={` ${
                locale == 'ar' ? 'pr-4' : 'pl-4'
              } py-3 w-[95%] rounded-md bg-gray-50 flex flex-col gap-1`}
            >
              <form>
                {cities &&
                  cities.map((city) => (
                    <li key={city.id} className="!p-0">
                      <label className="inline-flex text-xl rounded-lg items-center ">
                        <input
                          type="radio"
                          name="filter"
                          onChange={() => {
                            setCheckedCityName(city.name);
                            setCheckedCity(city);
                            setCheckedAreaName(undefined);
                          }}
                          value={checkedCityName}
                          className="form-checkbox h-5 w-5 bg-gray-100 rounded-md text-gray-600"
                        />
                        <span className="mx-3 .multi-line-title overflow-y-hidden max-w-[80%]  text-gray-700">
                          {city.name}
                        </span>
                      </label>
                    </li>
                  ))}
              </form>
            </ul>
          )}
        </div>
        <div className="mb-4">
          <div
            className="bg-gray-100  py-3 pr-3 w-[95%] rounded-xl"
            onClick={(e) => {
              e.preventDefault(), setMenuTowns((visible) => !visible);
            }}
          >
            <button className="px-3 w-full text-xl flex justify-between font-medium">
              <span className=" text-gray-600">{t('area')}</span>
              <span className=" text-red-800 text-3xl">
                {menuTowns ? (
                  <MdOutlineKeyboardDoubleArrowUp />
                ) : (
                  <MdOutlineKeyboardDoubleArrowDown />
                )}
              </span>
            </button>
          </div>
          {menuTowns && (
            <ul className="pr-4 py-3 w-[95%] rounded-md bg-gray-50 flex flex-col gap-1">
              <form>
                {checkedCity &&
                  checkedCity?.areas?.map((area) => (
                    <li key={area.id} className="!p-0">
                      <label className="inline-flex text-xl rounded-lg items-center ">
                        <input
                          type="radio"
                          name="filter"
                          onChange={() => {
                            setCheckedAreaName(area.name);
                          }}
                          value={checkedAreaName}
                          className="form-checkbox h-5 w-5 bg-gray-100 rounded-md text-gray-600"
                        />
                        <span className="mx-3 .multi-line-title max-h-5 overflow-y-hidden max-w-[80%] text-gray-700">
                          {area.name}
                        </span>
                      </label>
                    </li>
                  ))}
              </form>
            </ul>
          )}
        </div>
        <div className="flex justify-center w-full">
          <div
            className=" mb-4 py-3 flex justify-center "
            style={{
              direction: 'ltr',
              fontFamily: 'sans-serif',
              touchAction: 'none',
            }}
          >
            <Rating
              iconsCount={5}
              size={40}
              emptyStyle={{ display: 'flex' }}
              fillStyle={{ display: '-webkit-inline-box' }}
              className="my-custom-class  flex justify-start "
              onClick={handleRating}
              onPointerMove={onPointerMove}
            />
          </div>
        </div>

        <div className="mb-4 h-44">
          <div className="bg-gray-100 flex flex-col justify-between pt-3 pb-10  w-[95%] h-full rounded-xl">
            <h1 className="px-3 w-full text-xl flex pr-3 justify-between font-medium text-gray-700">
              {t('priceAverege')}
            </h1>

            <div className=" range">
              <div className="relative w-full mb-3 h-[45px] block sliderValue ">
                <span
                  style={{
                    left: `${(price / maxPrice) * 100}%`,
                  }}
                  className={`absolute h-[45px] text-white text-center w-[45px] top-0  z-10   `}
                >
                  {price}
                </span>
              </div>

              <input
                style={{ background: 'red', color: 'red' }}
                type="range"
                dir="ltr"
                value={price}
                onChange={(e) => setPrice(+e.target.value)}
                min={0}
                max={maxPrice}
                className="w-full outline-0 outline-offset-0 border-0 block "
              />
            </div>
          </div>
        </div>
        <button
          className="rounded-2xl w-[95%] bg-red-900 mt-10 text-white text-xl flex justify-center items-center h-12"
          onClick={filter}
        >
          {t('submit')}
        </button>
      </div>
    </div>
  );
}

export default CategorySidebar;
