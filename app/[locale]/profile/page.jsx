'use client';
import Advice from '@/components/advice';
import Weather from '@/components/weather';
import axios from 'axios';
import { signOut, useSession } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { AiOutlinePhone } from 'react-icons/ai';
import { BiUser } from 'react-icons/bi';
import { CiMail } from 'react-icons/ci';
import { RiLogoutCircleFill } from 'react-icons/ri';

function ProfileScreen() {
  const session = useSession();
  const router = useRouter();
  if (session.status == 'unauthenticated') {
    router.push('/auth/login');
  }

  const { update: update } = useSession();

  const [token, setToken] = useState('');

  useEffect(() => {
    if (session?.data?.user?.data) {
      setToken(session?.data?.user?.data?.token);
    } else if (session?.data?.user?.user) {
      setToken(session?.data?.user?.token);
    }
  }, [session]);

  const [form, setForm] = useState({
    name: '',
    last_name: '',
    user_id: '',
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/user-edit`,
        {
          name: form.name,

          last_name: form.last_name,
          user_id: session?.data?.user?.data?.user?.id,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
            'x-localization': 'ar',
          },
        }
      );
      console.log(response.data.user);
      session.data.user.data.user = response.data.user;
      update({
        ...session,
        data: {
          ...session.data,
          user: {
            ...session.data.user,
            data: { ...session.data.user.data, user: response.data.user },
          },
        },
      });
      console.log(session);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(session);
  const t = useTranslations('profile');

  return (
    <div className="w-full h-[90vh] sm:h-[100vh] p-12 sm:p-0 sm:pb-7 pt-24 flex sm:flex-col gap-16 sm:gap-2">
      <div className="bg-gray-100 px-6 py-10 flex flex-col items-center gap-3 h-[32rem] rounded-xl w-[22rem]">
        <div className="w-[13rem] sm:w-full flex flex-col justify-center items-center h-[22]  overflow-hidden  ">
          <div
            className="flex flex-col justify-center items-center"
            style={{
              position: 'relative',
              width: '100%',
              height: '200px',
              maxHeight: '200px',
            }}
          >
            {session && (
              <Image
                src={`${
                  session?.data?.user?.data?.user?.profile_image
                    ? 'https://dash.jordanstartshere.com/' +
                      session?.data?.user?.data?.user?.profile_image
                    : 'https://dash.jordanstartshere.com/' +
                      session?.data?.user?.user?.profile_image
                }`}
                fill
                sizes="(max-width: 640px) 640px, (max-width: 768px) 768px, (max-width: 1024px) 1024px, 1280px"
                className="object-cove rounded-xl"
                alt="card photo"
              />
            )}
          </div>
          <div className="text-center mb-3">
            <h3 className="text-xl text-gray-800 font-medium mt-3 ">
              {(session.status == 'authenticated' &&
                session?.data?.user?.data?.user?.name) ||
                session?.data?.user?.user?.name}
            </h3>
            <p className="text-gray-700 text-lg text-center">
              {session?.data?.user?.data?.user?.email}
            </p>
          </div>

          <div className="pt-6 flex flex-col gap-2">
            {session?.data?.user?.data?.user?.email && (
              <button
                onClick={handleUpdate}
                className="pl-5 pr-3 rounded-xl py-1 flex gap-3 text-red-800 border-red-800 hover:text-white hover:bg-red-800 font-medium border"
              >
                <span>
                  <Image src={'/pen.png'} alt="pen" width={22} height={22} />
                </span>
                <span>{t('editAcc')}</span>
              </button>
            )}

            <button
              onClick={() => signOut()}
              className="pl-5 pr-3 mb-6 rounded-xl py-1 flex gap-3 text-red-800 border-red-800 hover:text-white hover:bg-red-800 font-medium border"
            >
              <span className="brown">
                <RiLogoutCircleFill size={20} />
              </span>
              <span>{t('logout')}</span>
            </button>
            {/* {session?.data?.user?.data?.user?.email && (
              <button className="pl-5 pr-3 rounded-xl py-1 flex gap-3 text-red-800 border-red-800  hover:text-white hover:bg-red-800 font-medium border">
                <span>
                  <Image
                    src={'/delete.png'}
                    alt="delete"
                    width={22}
                    height={22}
                  />
                </span>
                <span>{t('deleteAcc')}</span>
              </button>
            )} */}
          </div>
        </div>
      </div>
      {session?.data?.user?.data && (
        <form className="w-[54rem] sm:w-full flex flex-col gap-10 z-10 ">
          <div className="flex sm:flex-col gap-5">
            <div className="w-[50%] sm:w-full flex flex-col gap-1 ">
              <label className="text-lg text-gray-700 font-medium pb-2 pr-1 block">
                {t('firstName')}
              </label>
              <div className="flex border-[3px] border-gray-100 z text-lg rounded-xl">
                <div className="cursor-pointer w-[10%] text-gray-600 flex  items-center pr-5 text-2xl">
                  <BiUser />
                </div>
                <input
                  min={3}
                  max={8}
                  value={form.name}
                  name="name"
                  onChange={handleChange}
                  type="text"
                  className="h-10 w-[90%]  
            outline-none py-1  pr-5  pl-5"
                />
              </div>
            </div>
            <div className="w-[50%] sm:w-full flex flex-col gap-1">
              <label className="text-lg text-gray-700 font-medium pb-2 pr-1 block">
                {t('lastName')}
              </label>
              <div className="flex border-[3px] border-gray-100 z-50 text-lg rounded-xl">
                <div className="cursor-pointer w-[10%] text-gray-600 flex  items-center pr-5 text-2xl">
                  <BiUser />
                </div>
                <input
                  min={3}
                  max={8}
                  value={form.last_name}
                  name="last_name"
                  onChange={handleChange}
                  type="text"
                  className="h-10 w-[90%]  
            outline-none py-1  pr-5  pl-2"
                />
              </div>
            </div>
          </div>
          <div className="flex sm:flex-col gap-5">
            <div className="w-[50%] sm:w-full flex flex-col gap-1 ">
              <label className="text-lg text-gray-700 font-medium pb-2 pr-1 block">
                {t('phoneNumber')}
              </label>
              <div className="flex border-[3px] border-gray-100 z text-lg rounded-xl">
                <div className="cursor-pointer w-[10%] text-gray-600 flex  items-center pr-5 text-2xl">
                  <AiOutlinePhone />
                </div>
                <input
                  value={session?.data?.user?.data?.user?.phone}
                  type="tel"
                  readOnly
                  className="h-10 w-[90%]  
            outline-none py-1  pr-5  pl-5"
                />
              </div>
            </div>
            <div className="w-[50%] sm:w-full flex flex-col gap-1">
              <label className="text-lg text-gray-700 font-medium pb-2 pr-1 block">
                {t('email')}
              </label>
              <div className="flex border-[3px] border-gray-100 z-50 text-lg rounded-xl">
                <div className="cursor-pointer w-[10%] text-gray-600 flex  items-center pr-5 text-2xl">
                  <CiMail />
                </div>
                <input
                  readOnly
                  value={session?.data?.user?.data?.user?.email}
                  type="text"
                  className="h-10 w-[90%]  
            outline-none py-1  pr-5  pl-2"
                />
              </div>
            </div>
          </div>
        </form>
      )}
      {session?.data?.user?.user?.name && (
        <div className="w-full h-fit">
          <Advice />
        </div>
      )}
      <div className="w-[20rem] sm:py-5 mb-2 sm:w-full  h-[9rem]">
        <Weather />
      </div>
    </div>
  );
}

export default ProfileScreen;
