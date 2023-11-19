'use client';
import Button from '@/components/Button';
import Image from 'next/image';
import React from 'react';
import congratulation from '@/public/congratulations.png';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
function NewPasswordDone() {
  const t = useTranslations('newPasswordDone');
  const router = useRouter();
  return (
    <div className="h-screen w-full flex justify-center ">
      <div className="h-[27rem] sm:w-[20rem] bg-white w-[30rem] rounded-lg mt-24 p-14">
        <Image
          src={congratulation}
          alt="congratulation"
          className="mx-auto mb-3"
        />
        <h2 className="text-gray-700 text-2xl font-semibold pr-3 ">
          {t('newPasswordDone')}
        </h2>
        <div className="flex gap-2 mt-8">
          <Button
            buttonH={'h-10'}
            onClick={() => router.push('/auth/login')}
            buttonContent={`${t('goToHome')}`}
          />
        </div>
      </div>
    </div>
  );
}

export default NewPasswordDone;
