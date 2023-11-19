'use client';
import React, { useEffect, useState, useTransition } from 'react';
import logo from '../public/newlogo.png';
import Image from 'next/image';
import { CiSearch } from 'react-icons/ci';
import { BsFilterRight } from 'react-icons/bs';
import { SearchBar } from './Search';
import { useSession } from 'next-auth/react';
import { useLocale, useTranslations } from 'next-intl';
import { usePathname } from 'next-intl/client';
import Link from 'next-intl/link';
import { useRouter } from 'next-intl/client';
function Header({ setShowSidebar, dynamic }) {
  const [showLang, setShowLang] = useState(true);
  const [showSign, setShowSign] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [myLocale, setMyLocale] = useState();
  const session = useSession();

  const pathname = usePathname();
  const locale = useLocale();
  const [srcFlag, setSrcFlag] = useState('/jordan.png');
  const [langName, setLangName] = useState(locale);
  useEffect(() => {
    if (locale == 'ar') {
      setSrcFlag('/jordan.png');
      setLangName('Arabic');
    } else if (locale == 'en') {
      setSrcFlag('/england.png');
      setLangName('English');
    } else if (locale == 'es') {
      setSrcFlag('/spain.png');
      setLangName('Spanish');
    } else if (locale == 'fr') {
      setSrcFlag('/france.png');
      setLangName('Franch');
    } else if (locale == 'ru') {
      setSrcFlag('/russia.png');
      setLangName('Russian');
    }
  }, [locale]);

  const router = useRouter();

  const t = useTranslations('Header');

  const [isPending, startTransition] = useTransition();

  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState();

  const handleOptionClick = ({ value, flag, name }) => {
    setIsOpen(false);

    startTransition(() => {
      router.replace(pathname, { locale: value });
      setSelectedValue(value);
      // onChange(value);
    });
  };

  const toggleDropdown = () => {
    if (!isPending) {
      setIsOpen((prevIsOpen) => !prevIsOpen);
    }
  };

  const handleOutsideClick = (event) => {
    if (!event.target.closest('.dropdown')) {
      setIsOpen(false);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Escape') {
      setIsOpen(false);
    }
  };

  const [about, setAbout] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/pages`,
        {
          headers: {
            'Content-Type': 'application/json',
            'x-localization': `${locale}`,
          },
        }
      );
      const data = await response.json();
      setAbout(data?.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const langs = [
    { name: 'English', id: 'en', flag: '/england.png' },
    { name: 'Arabic', id: 'ar', flag: '/jordan.png' },
    { name: 'Spanish', id: 'es', flag: '/spain.png' },
    { name: 'French', id: 'fr', flag: '/france.png' },
    { name: 'Russian', id: 'ru', flag: '/russia.png' },
  ];

  return (
    <div className="w-full px-7  pt-4 xl:pt-3 sm:pt-1 xl:px-4 sm:px-1  border-b border-b-gray-200">
      <div className="flex w-full h-24 sm:flex-col sm:gap-3 sm:h-40 sm:justify-normal justify-between items-center ">
        <div className="flex items-center sm:justify-between sm:w-full sm:jusitems-between">
          <div className="flex">
            {setShowSidebar && (
              <button
                onClick={() =>
                  setShowSidebar((prevShowSidebar) => !prevShowSidebar)
                }
                className="mr-2 sm:mr-0 h-[67.2px] xl:w-[40px] sm:w-[25px]
            xl:h-[40px]  xl:min-h-[30px] sm:h-[30px] w-[64px] text-gray-700 flex justify-center items-center text-center rounded-xl bg-gray-100"
              >
                <BsFilterRight size={40} />
              </button>
            )}

            <div
              className="mr-4 ml-1 sm:mx-1 h-[67.2px] w-[67px]  text-gray-700 flex  xl:w-[40px] sm:w-[25px]
            xl:h-[40px]  xl:min-h-[20px] sm:h-[30px]
           justify-center items-center text-center rounded-xl bg-gray-100"
            >
              {session.status == 'authenticated' ? (
                <Link href={'/profile'}>
                  <Image
                    alt="active"
                    width={60}
                    height={30}
                    src={`${
                      session?.data?.user?.data?.user?.profile_image
                        ? 'https://dash.jordanstartshere.com/' +
                          session?.data?.user?.data?.user?.profile_image
                        : 'https://dash.jordanstartshere.com/' +
                          session?.data?.user?.user?.profile_image
                    }`}
                  />
                </Link>
              ) : (
                <div
                  className="  relative  h-[67.2px] w-full
                xl:h-[40px] sm:h-[30px]
                flex flex-col items-center justify-center
                text-center rounded-xl"
                >
                  <Image
                    onClick={() => setShowSign(!showSign)}
                    alt="active"
                    width={30}
                    height={30}
                    src={'/signin.png'}
                  />

                  {showSign && (
                    <div
                      className={` myList 
                      ${
                        locale == 'ar'
                          ? 'before:left-[91%]  right-0'
                          : 'before:left-[12%] left-0 '
                      }
                       min-h-[80px] w-[10rem] px-2    z-50
                           flex flex-col items-center absolute
                            text-center  -bottom-[7.5rem] rounded-xl
                            bg-gray-200 text-gray-700
                      `}
                    >
                      <div className=" flex flex-col text-center text-xl w-[10rem]">
                        <Link
                          href={'/auth/login'}
                          className="w-full hover:bg-gray-300 py-4 "
                        >
                          {t('signin')}
                        </Link>
                        <Link
                          href={'/auth/register'}
                          className="w-full hover:bg-gray-300 pb-4 "
                        >
                          {' '}
                          {t('signup')}{' '}
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="text-3xl flex font-tajawal items-center text-center xl:font-medium xl:text-2xl sm:font-medium sm:!text-base font-semibold pr-2 sm:pr-1">
              <div className=" text-red-900 flex gap-1">
                <div>{t('title')}, </div>
              </div>
              <div className="text-gray-900">
                {session.status == 'authenticated'
                  ? session?.data?.user?.data?.user?.name ||
                    session?.data?.user?.user?.name
                  : `${t('visitor')}`}
              </div>
            </div>
          </div>
          <Link
            href={'/home'}
            className="mr-5  ml-2 sm:ml-0 xl:mr-0 hidden sm:block sm:mx-1 xl:ml-1 xl:w-[65px] sm:w-[45px]
              "
          >
            <Image alt="Logo" src={logo} />
          </Link>
        </div>

        <div className="flex ">
          <div className="flex">
            <Link
              className={`mr-2 h-[67.2px] w-[64px] xl:w-[40px] sm:w-[25px]
              xl:h-[40px] sm:h-[30px]
              flex justify-center items-center
              text-center rounded-xl
              ${
                pathname.includes('home')
                  ? 'text-white  bg-red-900 '
                  : '  bg-gray-100 text-gray-700'
              }
              `}
              href={'/home'}
            >
              {pathname.includes('home') ? (
                <Image
                  alt="active"
                  width={30}
                  height={30}
                  src={'/activepxhome.png'}
                />
              ) : (
                <Image
                  alt="not"
                  width={30}
                  height={30}
                  src={'/notpxhome.png'}
                />
              )}
            </Link>
            <Link
              className={`mr-2 h-[67.2px] w-[64px] xl:w-[40px] sm:w-[30px]
              xl:h-[40px] sm:h-[30px]
              flex justify-center items-center
              text-center rounded-xl
              ${
                pathname.includes('discover')
                  ? 'text-white  bg-red-900 '
                  : '  bg-gray-100 text-gray-700'
              }
              `}
              href={'/partners/discover'}
            >
              {pathname.includes('discover') ? (
                <Image
                  alt="active"
                  width={30}
                  height={30}
                  src={'/discovernew.png'}
                />
              ) : (
                <Image alt="not" width={30} height={30} src={'/disc1.png'} />
              )}
            </Link>
            <button
              className={` relative bg-gray-100 rounded-xl mr-2  h-[67.2px] w-[64px] xl:w-[40px] 
              xl:h-[40px] sm:h-[30px]
              flex flex-col items-center justify-center
              rounded-xl"
              `}
            >
              <Image
                onClick={() => setShowAbout(!showAbout)}
                alt="not"
                width={30}
                height={30}
                src={'/about.png'}
              />
              {showAbout && (
                <div
                  className={` about
                      aboutlist 
                     'before:left-[50%]  '
                       min-h-[80px] w-[17rem] px-2    z-50
                           flex flex-col  absolute
                          -bottom-[12rem] sm:-bottom-[14rem] sm:w-[10rem] rounded-lg
                      `}
                >
                  <div className="text-xl w-[17rem] sm:w-[10rem]">
                    {about?.map((item) => (
                      <button
                        className="w-full  py-2 text-start"
                        onClick={() => router.push(`/about/${item.id}`)}
                        key={item.id}
                      >
                        {item.title}
                      </button>
                    ))}
                    <button
                      className="w-full  py-2 text-start"
                      onClick={() => router.push(`/contact-us`)}
                    >
                      {t('contactUs')}
                    </button>
                  </div>
                </div>
              )}
            </button>
            <Link
              className={`mr-2 h-[67.2px] w-[64px] xl:w-[40px] sm:w-[25px]
              xl:h-[40px] sm:h-[30px]
              flex justify-center items-center
              text-center rounded-xl  '
              ${
                pathname.includes('maps')
                  ? 'text-white  bg-red-900 '
                  : '  bg-gray-100 text-gray-700'
              }
              `}
              href={'/maps'}
            >
              {pathname.includes('maps') ? (
                <Image alt="not" width={30} height={30} src={'/mapnew.png'} />
              ) : (
                <Image alt="not" width={30} height={30} src={'/pxnotmap.png'} />
              )}
            </Link>
            <div
              className={`mr-2 sm:hidden
             flex  items-center 
              rounded-xl  bg-gray-100 text-gray-700
              cursor-pointer !text-xl
              xl:h-[40px]
              `}
            >
              <div className="flex justify-center  items-center">
                <span
                  className=" w-[64px] xl:w-[40px] 
                  xl:h-[40px]  flex justify-center text-center"
                  onClick={() => {
                    setShowSearch((prev) => !prev);
                  }}
                >
                  <Image
                    alt="not"
                    width={30}
                    height={30}
                    src={'/search-black.png'}
                  />
                </span>
                {showSearch && <SearchBar showSearch={showSearch} />}
              </div>
            </div>
            <Link
              className={`mr-2 h-[67.2px] w-[64px] xl:w-[40px] 
              xl:h-[40px] 
              flex justify-center items-center
              text-center rounded-xl
              ${
                pathname.includes('blogs')
                  ? 'text-white bg-red-900 '
                  : '  bg-gray-100 text-gray-700'
              }
              `}
              href={'/blogs'}
            >
              {pathname.includes('blogs') ? (
                <Image
                  width={30}
                  height={30}
                  alt="active"
                  src={'/blognew.png'}
                />
              ) : (
                <Image alt="not" width={30} height={30} src={'/blogs1.png'} />
              )}
            </Link>
            {session.status == 'authenticated' && (
              <Link
                className={`mr-2 h-[67.2px] w-[64px] xl:w-[40px] sm:w-[25px]
              xl:h-[40px] sm:h-[30px]
              flex justify-center items-center
              text-center rounded-xl 
              ${
                pathname.includes('my-saved')
                  ? 'text-white  bg-red-900 '
                  : '  bg-gray-100 text-gray-700'
              }
              `}
                href={'/my-saved'}
              >
                {pathname.includes('my-saved') ? (
                  <Image
                    width={30}
                    height={30}
                    alt="active"
                    src={'/favnew.png'}
                  />
                ) : (
                  <Image alt="not" width={30} height={30} src={'/heart1.png'} />
                )}{' '}
              </Link>
            )}
            {!dynamic && (
              <div
                className={`mr-2 min-h-[67.2px] w-[9rem] xl:w-[40px] sm:w-[25px]
              xl:h-[40px]  xl:min-h-[30px] sm:h-[30px]
            flex  items-center  
            text-center rounded-xl relative  !shadow-none
            bg-gray-100 text-gray-700 z-50

            `}
              >
                <div
                  className="dropdown mx-0"
                  onClick={toggleDropdown}
                  onKeyDown={handleKeyDown}
                >
                  <div className="selected-option mx-2 flex items-center text-lg gap-2">
                    <Image
                      width={37}
                      height={30}
                      src={srcFlag}
                      alt={langName}
                    />
                    <div className="sm:hidden">{langName}</div>
                  </div>
                  {isOpen && isPending == false && (
                    <ul
                      className="absolute mt-1 py-1 px-2 mx-0  w-full  bg-gray-100  rounded-xl shadow-lg z-10"
                      onClick={handleOutsideClick}
                    >
                      {langs.map((option) => (
                        <li
                          className="option cursor-pointer w-full flex gap-2 items-center"
                          key={option.id}
                          onClick={() =>
                            handleOptionClick({
                              value: option.id,
                              flag: option.flag,
                              name: option.name,
                            })
                          }
                        >
                          <Image
                            width={37}
                            height={30}
                            src={option.flag}
                            alt={option.name}
                          />
                          <span className="sm:hidden">{option.name}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  {isPending == true && (
                    <div className="loading">Loading...</div>
                  )}
                </div>
              </div>
            )}
          </div>
          <div
            className="mr-5 ml-2 xl:mr-0 sm:hidden sm:mr-0 xl:ml-1 xl:w-[65px] sm:w-[45px]
              xl:h-[65px] sm:h-[50px]"
          >
            <Image alt="Logo" src={logo} />
          </div>
        </div>
        <div
          className={`mr-2 hidden self-start
             sm:flex  items-center 
              rounded-xl  bg-gray-100 text-gray-700
              cursor-pointer !text-xl
              `}
        >
          <div className="flex items-center">
            <span
              className=" w-[64px] flex justify-center text-center"
              onClick={() => {
                setShowSearch((prev) => !prev);
              }}
            >
              <CiSearch size={40} />
            </span>
            {showSearch && <SearchBar showSearch={showSearch} />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
