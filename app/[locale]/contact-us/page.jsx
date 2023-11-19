'use client';
import Button from '@/components/Button';
import FormInput from '@/components/input';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';
import mapscontact from '@/public/mapscontact.png';
import contact from '@/public/contact.png';
import { useTranslations } from 'next-intl';

function ContactUsScreen() {
  const t = useTranslations('contactUsScreen');
  const router = useRouter();
  return (
    <div className="w-full ">
      <div className="p-16 sm:!p-4">
        <h1 className="text-3xl font-bold text-red-900">{t('contactUs')}</h1>
        <div className="p-3 pt-10 flex gap-24">
          <div className="w-[40%] sm:w-full">
            <h3 className="text-2xl">{t('haveQuestions')}</h3>
            <div className="mt-16 flex flex-col gap-3">
              <div className="flex gap-3 items-center">
                <div className="p-3 rounded-xl bg-gray-100 w-fit">
                  <Image
                    alt="active"
                    width={25}
                    height={25}
                    src={'/phone.png'}
                  />
                </div>
                <span className="text-xl text-gray-700">+962 7 9955 5347</span>
              </div>
              <div className="flex gap-3 items-center">
                <div className="p-3 rounded-xl bg-gray-100 w-fit">
                  <Image
                    alt="active"
                    width={25}
                    height={25}
                    src={'/mail.png'}
                  />
                </div>
                <span className="text-xl text-gray-700">
                  info@jordanstartshere.com
                </span>
              </div>
            </div>
            <div className="p-8  border-[3px] mt-16 rounded-2xl">
              <form>
                <div className="flex flex-col gap-1">
                  <FormInput label={t('fullName')} />
                  <FormInput type={'email'} label={t('email')} />
                  <FormInput type={'number'} label={t('phoneNumber')} />
                </div>
                <div className="pt-4">
                  <h2 className="text-lg text-gray-700 font-medium pb-2 pr-1 block">
                    {t('message')}
                  </h2>
                  <textarea
                    name="message"
                    className="rounded-[4px] bg-gray-100 w-full
           border-trans21 outline-none py-3  pr-5  pl-5"
                    id=""
                  ></textarea>
                </div>

                <div className="w-full justify-center mt-7 mb-4 ">
                  <Button
                    className="rounded-2xl"
                    buttonH={'h-10'}
                    buttonContent={t('send')}
                  />
                </div>
              </form>
            </div>
          </div>
          <div className="60% sm:hidden">
            <div className="rounded-2xl overflow-hidden">
              <Image
                alt="map"
                src={mapscontact}
                onClick={() => router.push('/maps/compmap')}
              />
            </div>
            <div className="rounded-2xl overflow-hidden">
              <Image alt="map" width={800} src={contact} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactUsScreen;
