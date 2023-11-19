'use client';
import React, { useState } from 'react';
import updown from '@/public/updown.svg';
import Image from 'next/image';
import hamburger from '@/public/hamburger.png';
import cart from '@/public/cart.png';
import game from '@/public/game.png';
import tourism from '@/public/tourism.png';
import {
  MdOutlineKeyboardDoubleArrowUp,
  MdOutlineKeyboardDoubleArrowDown,
} from 'react-icons/md';
function Sidebar() {
  const [menuVisible, setMenuVisible] = useState(false);
  const [menuTowns, setMenuTowns] = useState(false);
  const [menuRate, setMenuRate] = useState(false);
  const [showDepartments, seshowDepartments] = useState(false);
  const [departmentSlelected, setDepartmentSlelected] = useState('resturants');

  return (
    <div dir="rtl" className=" flex flex-col w-full border-l pl-4 ">
      <div className=" mt-12 mr-10 text-gray-600 ">
        <div className="  flex gap-2.5  text-2xl font-medium cursor-pointer ">
          <div className="pt-1">
            <Image src={updown} alt="updown" />
          </div>

          <div
            className=" pr-1 w-[90%] rounded-xl"
            onClick={() => seshowDepartments((visible) => !visible)}
          >
            <div className=""> الاقسام الريسية</div>
          </div>
        </div>

        {showDepartments && (
          <ul className="pr-4 pt-3 flex flex-col gap-1">
            <li
              onClick={() => setDepartmentSlelected('resturants')}
              className={`
            ${
              departmentSlelected === 'resturants'
                ? 'bg-red-700 text-white'
                : 'bg-gray-100 text-black'
            }
            
             text-xl font-medium h-12
             rounded-lg flex  items-center mb-1`}
            >
              <Image src={hamburger} className="mr-3" alt="hamburger" />
              <span className="mr-3">مطاعم</span>
            </li>

            <li
              onClick={() => setDepartmentSlelected('cart')}
              className={`
            ${
              departmentSlelected === 'cart'
                ? 'bg-red-700 text-white'
                : 'bg-gray-100 text-black'
            }
            
             text-xl font-medium h-12 mb-1
             rounded-lg flex  items-center`}
            >
              <Image src={cart} className="mr-3" alt="hamburger" />
              <span className="mr-3">متاجر</span>
            </li>
            <li
              onClick={() => setDepartmentSlelected('game')}
              className={`
            ${
              departmentSlelected === 'game'
                ? 'bg-red-700 text-white'
                : 'bg-gray-100 text-black'
            }
            
             text-xl font-medium h-12 mb-1
             rounded-lg flex  items-center`}
            >
              <Image src={game} className="mr-3" alt="hamburger" />
              <span className="mr-3">محلات ترفيهية</span>
            </li>
            <li
              onClick={() => setDepartmentSlelected('tourism')}
              className={`
            ${
              departmentSlelected === 'tourism'
                ? 'bg-red-700 text-white'
                : 'bg-gray-100 text-black'
            }
            
             text-xl font-medium h-12 mb-1
             rounded-lg flex  items-center`}
            >
              <Image src={tourism} className="mr-3" alt="hamburger" />
              <span className="mr-3">مناطق سيايحية</span>
            </li>
          </ul>
        )}
      </div>
      <div className=" mt-6 mr-10 text-gray-600 ">
        <div className=" mb-6 flex gap-2.5  text-2xl font-medium ">
          <div className="pt-1">
            <Image src={updown} alt="updown" />
          </div>
          <div className="">التصفية</div>
        </div>
        <div className="mb-4">
          <div
            className="bg-gray-100  py-3 pr-3 w-[95%] rounded-xl"
            onClick={() => setMenuVisible((visible) => !visible)}
          >
            <button className="px-3 w-full text-xl flex justify-between font-medium">
              <span className=" text-gray-600">المدينة</span>
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
            <ul className="pr-4 py-3 rounded-md bg-gray-50 flex flex-col gap-1">
              <li className="!p-0">
                <label className="inline-flex text-xl rounded-lg items-center ">
                  <input
                    type="checkbox"
                    className="form-checkbox h-5 w-5 bg-gray-100 rounded-md text-gray-600"
                  />
                  <span className="mr-3  text-gray-700"> عمان</span>
                </label>
              </li>
              <li className="!p-0">
                <label className="inline-flex text-xl rounded-lg items-center ">
                  <input
                    type="checkbox"
                    className="form-checkbox h-5 w-5 bg-gray-100 rounded-md text-gray-600"
                  />
                  <span className="mr-3  text-gray-700"> وادي رم</span>
                </label>
              </li>
              <li>
                <label className="inline-flex text-xl rounded-lg items-center ">
                  <input
                    type="checkbox"
                    className="form-checkbox h-5 w-5 bg-gray-100 rounded-md text-gray-600"
                  />
                  <span className="mr-3  text-gray-700"> الكرك</span>
                </label>
              </li>
              <li>
                <label className="inline-flex text-xl rounded-lg items-center">
                  <input
                    type="checkbox"
                    className="form-checkbox h-5 w-5 bg-gray-100 rounded-md text-gray-600"
                  />
                  <span className="mr-3  text-gray-700"> الزرقاء</span>
                </label>
              </li>
              <li>
                <label className="inline-flex text-xl rounded-lg overflow-hidden items-center ">
                  <input
                    type="checkbox"
                    className="form-checkbox h-5 w-5 bg-gray-100 rounded-md  text-gray-600"
                  />
                  <span className="mr-3  text-gray-700"> مادبا</span>
                </label>
              </li>
              <li>
                <label className="inline-flex text-xl rounded-lg overflow-hidden items-center ">
                  <input
                    type="checkbox"
                    className="form-checkbox h-5 w-5 bg-gray-100 rounded-md  text-gray-600"
                  />
                  <span className="mr-3  text-gray-700"> العقبة</span>
                </label>
              </li>
            </ul>
          )}
        </div>
        <div className="mb-4">
          <div
            className="bg-gray-100  py-3 pr-3 w-[95%] rounded-xl"
            onClick={() => setMenuTowns((visible) => !visible)}
          >
            <button className="px-3 w-full text-xl flex justify-between font-medium">
              <span className=" text-gray-600">المنطقة</span>
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
            <ul className="pr-4 py-3 rounded-md bg-gray-50 flex flex-col gap-1">
              <li className="!p-0">
                <label className="inline-flex text-xl rounded-lg items-center ">
                  <input
                    type="checkbox"
                    className="form-checkbox h-5 w-5 bg-gray-100 rounded-md text-gray-600"
                  />
                  <span className="mr-3  text-gray-700"> عمان</span>
                </label>
              </li>
              <li className="!p-0">
                <label className="inline-flex text-xl rounded-lg items-center ">
                  <input
                    type="checkbox"
                    className="form-checkbox h-5 w-5 bg-gray-100 rounded-md text-gray-600"
                  />
                  <span className="mr-3  text-gray-700"> وادي رم</span>
                </label>
              </li>
              <li>
                <label className="inline-flex text-xl rounded-lg items-center ">
                  <input
                    type="checkbox"
                    className="form-checkbox h-5 w-5 bg-gray-100 rounded-md text-gray-600"
                  />
                  <span className="mr-3  text-gray-700"> الكرك</span>
                </label>
              </li>
              <li>
                <label className="inline-flex text-xl rounded-lg items-center">
                  <input
                    type="checkbox"
                    className="form-checkbox h-5 w-5 bg-gray-100 rounded-md text-gray-600"
                  />
                  <span className="mr-3  text-gray-700"> الزرقاء</span>
                </label>
              </li>
              <li>
                <label className="inline-flex text-xl rounded-lg overflow-hidden items-center ">
                  <input
                    type="checkbox"
                    className="form-checkbox h-5 w-5 bg-gray-100 rounded-md  text-gray-600"
                  />
                  <span className="mr-3  text-gray-700"> مادبا</span>
                </label>
              </li>
              <li>
                <label className="inline-flex text-xl rounded-lg overflow-hidden items-center ">
                  <input
                    type="checkbox"
                    className="form-checkbox h-5 w-5 bg-gray-100 rounded-md  text-gray-600"
                  />
                  <span className="mr-3  text-gray-700"> العقبة</span>
                </label>
              </li>
            </ul>
          )}
        </div>
        <div className="mb-4">
          <div
            className="bg-gray-100  py-3 pr-3 w-[95%] rounded-xl"
            onClick={() => setMenuRate((visible) => !visible)}
          >
            <button className="px-3 w-full text-xl flex justify-between font-medium">
              <span className=" text-gray-600">المدينة</span>
              <span className=" text-red-800 text-3xl">
                {menuRate ? (
                  <MdOutlineKeyboardDoubleArrowUp />
                ) : (
                  <MdOutlineKeyboardDoubleArrowDown />
                )}
              </span>
            </button>
          </div>
          {menuRate && (
            <ul className="pr-4 py-3 rounded-md bg-gray-50 flex flex-col gap-1">
              <li className="!p-0">
                <label className="inline-flex text-xl rounded-lg items-center ">
                  <input
                    type="checkbox"
                    className="form-checkbox h-5 w-5 bg-gray-100 rounded-md text-gray-600"
                  />
                  <span className="mr-3  text-gray-700"> عمان</span>
                </label>
              </li>
              <li className="!p-0">
                <label className="inline-flex text-xl rounded-lg items-center ">
                  <input
                    type="checkbox"
                    className="form-checkbox h-5 w-5 bg-gray-100 rounded-md text-gray-600"
                  />
                  <span className="mr-3  text-gray-700"> وادي رم</span>
                </label>
              </li>
              <li>
                <label className="inline-flex text-xl rounded-lg items-center ">
                  <input
                    type="checkbox"
                    className="form-checkbox h-5 w-5 bg-gray-100 rounded-md text-gray-600"
                  />
                  <span className="mr-3  text-gray-700"> الكرك</span>
                </label>
              </li>
              <li>
                <label className="inline-flex text-xl rounded-lg items-center">
                  <input
                    type="checkbox"
                    className="form-checkbox h-5 w-5 bg-gray-100 rounded-md text-gray-600"
                  />
                  <span className="mr-3  text-gray-700"> الزرقاء</span>
                </label>
              </li>
              <li>
                <label className="inline-flex text-xl rounded-lg overflow-hidden items-center ">
                  <input
                    type="checkbox"
                    className="form-checkbox h-5 w-5 bg-gray-100 rounded-md  text-gray-600"
                  />
                  <span className="mr-3  text-gray-700"> مادبا</span>
                </label>
              </li>
              <li>
                <label className="inline-flex text-xl rounded-lg overflow-hidden items-center ">
                  <input
                    type="checkbox"
                    className="form-checkbox h-5 w-5 bg-gray-100 rounded-md  text-gray-600"
                  />
                  <span className="mr-3  text-gray-700"> العقبة</span>
                </label>
              </li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
