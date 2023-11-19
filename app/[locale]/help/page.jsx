'use client';
import axios from 'axios';
import { useTranslations } from 'next-intl';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { AiOutlinePhone } from 'react-icons/ai';
import { BsWhatsapp } from 'react-icons/bs';

// export const metadata = {
//   title: {
//     default: 'Acme',
//     template: '%s | Acme',
//   },
// };

function Help() {
  const [data1, setData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/helps`,
        {
          headers: {
            'Content-Type': 'application/json',
            'x-localization': 'ar',
          },
        }
      );
      setData(response?.data?.data);
      //   console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  const t = useTranslations('helping');

  return (
    <>
      <Head>
        <title>Acmdsfe</title>
      </Head>
      <div className="w-full ">
        <div className="w-full h-full flex gap-16 flex-col items-center p-14">
          <h1 className="mt-10 mb-6 text-4xl sm:text-2xl font-semibold">
            {t('securityForces')}
          </h1>
          <div className="w-[90%] bg-gray-100  text-white justify-between items-center flex h-[12rem] rounded-2xl overflow-hidden">
            <div
              style={{ backgroundColor: '#C89A49', writingMode: 'vertical-rl' }}
              className="h-full  transform rotate-180 text-center text-2xl p-4"
            >
              {t('publicSecurity')}
            </div>
            <div>
              <Image src="/jordanlogo.png" alt="sun" width={130} height={130} />
            </div>
            <div className="h-full flex flex-col items-center gap-5 text-2xl ml-10 mt-12 ">
              <Link
                href={'https://wa.me/+962797911911'}
                target={'_blank'}
                style={{ backgroundColor: '#6EBE72' }}
                className="py-3 px-8 flex gap-6 items-center w-full rounded-xl"
              >
                <BsWhatsapp size={40} />

                <p>{t('whatsapp')}</p>
              </Link>
              <Link
                href={'tel:911'}
                target={'_blank'}
                style={{ backgroundColor: '#C89A49' }}
                className="py-3 px-8 flex gap-6 items-center w-full rounded-xl"
              >
                <AiOutlinePhone size={40} />
                <p>{t('call')}</p>
              </Link>
            </div>
          </div>
          <div className="w-[90%] bg-gray-100  text-white justify-between items-center flex h-[12rem] rounded-2xl overflow-hidden">
            <div
              style={{ backgroundColor: '#C89A49', writingMode: 'vertical-rl' }}
              className="h-full  transform rotate-180 text-center text-2xl p-4"
            >
              {t('ambulance')}
            </div>
            <div>
              <Image
                src="/jordanlogo2.png"
                alt="sun"
                width={130}
                height={130}
              />
            </div>
            <div className="h-full flex flex-col items-center gap-5 text-2xl ml-10 mt-12 ">
              <Link
                href={'https://wa.me/+962799555347'}
                target={'_blank'}
                style={{ backgroundColor: '#6EBE72' }}
                className="py-3 px-8 flex gap-6 items-center w-full rounded-xl"
              >
                <BsWhatsapp size={40} />

                <p>{t('whatsapp')}</p>
              </Link>
              <Link
                href={'tel:+962799555347'}
                target={'_blank'}
                style={{ backgroundColor: '#C89A49' }}
                className="py-3 px-8 flex gap-6 items-center w-full rounded-xl"
              >
                <AiOutlinePhone size={40} />
                <p>{t('call')}</p>
              </Link>
            </div>
          </div>
          <div className="w-[90%] bg-gray-100  text-white justify-between items-center flex h-[12rem] rounded-2xl overflow-hidden">
            <div
              style={{ backgroundColor: '#C89A49', writingMode: 'vertical-rl' }}
              className="h-full  transform rotate-180 text-center text-2xl p-4"
            >
              {t('tourism')}
            </div>
            <div>
              <Image
                src="/jordanlogo2.png"
                alt="sun"
                width={130}
                height={130}
              />
            </div>
            <div className="h-full flex flex-col items-center gap-5 text-2xl ml-10 mt-12 ">
              <Link
                href={'https://wa.me/+962790333066'}
                target={'_blank'}
                style={{ backgroundColor: '#6EBE72' }}
                className="py-3 px-8 flex gap-6 items-center w-full rounded-xl"
              >
                <BsWhatsapp size={40} />

                <p>{t('whatsapp')}</p>
              </Link>
              <Link
                href={'tel:+962790333066'}
                target={'_blank'}
                style={{ backgroundColor: '#C89A49' }}
                className="py-3 px-8 flex gap-6 items-center w-full rounded-xl"
              >
                <AiOutlinePhone size={40} />
                <p>{t('call')}</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Help;
