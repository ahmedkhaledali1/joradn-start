'use client';
import Button from '@/components/Button';
import Image from 'next/image';
import React from 'react';
import congratulation from '@/public/congratulations.png';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

function SignUpDone() {
  const t = useTranslations('signupDone');
  const session = useSession();
  const router = useRouter();
  const go = () => {
    if (session.status == 'authenticated') {
      router.push('/home');
    } else if (session.status == 'unauthenticated') {
      router.push('/auth/login');
    }
  };
  return (
    <div className="h-screen w-full flex justify-center ">
      <div className="h-[32rem] bg-white w-96 rounded-lg mt-24 px-10 py-12">
        <Image src={congratulation} alt="congratulation" className="mx-auto" />
        <div className="mb-5">
          <h1 className="text-3xl mb-3 text-gray-700 font-bold">
            {t('congratulations')}
          </h1>
          <h1 className="text-2xl text-red-700 font-semibold mb-4">
            {t('accountCreated')}
          </h1>
          <p className="text-lg text-gray-700 font-medium">{t('canBrowse')}</p>
        </div>
        <div className="flex gap-2">
          <Button buttonH={'h-10'} onClick={go} buttonContent={t('goToHome')} />
        </div>
      </div>
    </div>
  );
}

export default SignUpDone;
