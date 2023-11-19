'use client';
import Button from '@/components/Button';
import Phoneinput from '@/components/InputPhone';
import Emailverify from '@/components/emailverify';
import FormInput from '@/components/input';
import axios from 'axios';
import { useLocale, useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';

import React, { useEffect, useState } from 'react';

function RegisterScreen() {
  const t = useTranslations('RegisterScreen');
  let query;
  if (typeof window !== 'undefined') {
    const urlParams = new URLSearchParams(window.location.search);
    query = urlParams.get('query');
  }
  useEffect(() => {
    if (query) {
      setStep(2);
    }
  }, []);

  const [error, setError] = useState(null);
  const [loading, setIsLoading] = useState(false);
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    name: '',
    lastName: '',
    email: '',
    password: '',
  });
  const [phone, setPhone] = useState('');

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }
  const locale = useLocale();

  const handleLog = async (e) => {
    e.preventDefault();
    setError(null);
    console.log(form);

    if (!e.target.checkValidity()) {
      setError('Please fill in all required fields');
      return;
    }
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/user-reg`,
        {
          name: form.name,
          last_name: form.lastName,
          phone: phone,
          email: form.email,
          password: form.password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'x-localization': `${locale}`,
          },
        }
      );

      if (!response.error) {
        try {
          const otp = await axios.post(
            `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/send-otp`,
            {
              email: form.email,
            },
            {
              headers: {
                'Content-Type': 'application/json',
                'x-localization': `${locale}`,
              },
            }
          );
          console.log(otp);
          if (otp.status == 200) {
            setStep(2);
          }
        } catch (error) {
          setError('somthing is wrong');
        }
      }
    } catch (error) {
      console.log(error);
      setError(error.response.data.msg);
    }
  };

  return (
    <>
      {step == 1 && (
        <div className="h-[100vh] w-full flex justify-center ">
          <div className=" h-[41rem] bg-white w-[25rem] sm:w-[20rem] rounded-xl mt-20 px-8 pb-11 pt-8">
            <div className="mb-5">
              <h1 className="text-2xl  font-semibold mb-3">{t('welcome')}</h1>

              {/* <p className="text-gray-700 text-lg ">{t('fillInFields')}</p> */}
            </div>
            <form>
              <div className="flex flex-col gap-1">
                <FormInput
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  type={'email'}
                  label={t('email')}
                />
                <FormInput
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  label={t('firstName')}
                />
                <FormInput
                  name="lastName"
                  value={form.lastName}
                  onChange={handleChange}
                  label={t('lastName')}
                />

                <div className="text-lg text-gray-700 font-medium pb-2 pr-1 block">
                  {t('phoneNumber')}
                </div>
                <Phoneinput phoneNumber={phone} setPhoneNumber={setPhone} />
                <FormInput
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  type={'password'}
                  label={t('password')}
                  className={'flex justify-end'}
                />
              </div>

              <div className="w-full justify-center mt-7 mb-4 ">
                <Button
                  onClick={handleLog}
                  buttonH={'h-10'}
                  buttonContent={t('login')}
                />
              </div>
              {error && <p className=" text-red-700">{error}</p>}
            </form>
          </div>
        </div>
      )}
      {step == 2 && <Emailverify />}
    </>
  );
}

export default RegisterScreen;
