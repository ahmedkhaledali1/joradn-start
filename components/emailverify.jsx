'use client';
import Button from '@/components/Button';
import FormInput from '@/components/input';
import axios from 'axios';
import { useLocale, useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import SignUpDone from './signupdone';

function Emailverify() {
  const [otp, setOtp] = useState(new Array(6).fill(''));
  const [email, setEmail] = useState();
  const [error, setError] = useState(null);
  const [loading, setIsLoading] = useState(false);
  const [sended, setSended] = useState(null);
  const locale = useLocale();
  const router = useRouter();
  const [step, setStep] = useState(1);

  let query;
  if (typeof window !== 'undefined') {
    const urlParams = new URLSearchParams(window.location.search);
    query = urlParams.get('query');
  }
  useEffect(() => {
    if (query) {
      setEmail(query);
    }
  }, []);

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;
    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);
    if (element.nextSibling) {
      element.nextSibling.focus();
    }
  };
  const stringOtp = otp.join('');
  console.log(stringOtp);
  const handleVerify = async (e) => {
    e.preventDefault();
    try {
      const otp = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/check-otp`,
        {
          email: email,
          otp: stringOtp,
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
  };

  const sendAgain = async (e) => {
    e.preventDefault();

    try {
      const otp = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/send-otp`,
        {
          email: email,
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
        setSended('OTP IS SENT SUCSSESFULLY');
        setError(null);
      }
    } catch (error) {
      setError(error.response.data.msg);
    }
  };
  const t = useTranslations('mobileVerify');

  return (
    <>
      {step == 1 && (
        <div className="h-[100vh] w-full flex justify-center ">
          <div className=" h-[31rem] bg-white w-[26rem] sm:w-[20rem] rounded-xl mt-28 px-10 sm:px-5 py-14 ">
            <div className="mb-5">
              <h1 className="text-2xl  font-semibold mb-5">{t('confirm')}</h1>

              <p className="text-gray-700 text-2xl mb-5">{t('sendOTP')} </p>
            </div>
            <form>
              <FormInput
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type={'email'}
                label={t('phoneNumber')}
              />

              {sended ? (
                <p className="text-green-500">{sended}</p>
              ) : (
                <button
                  onClick={sendAgain}
                  className="hover:underline text-gray-700"
                >
                  send otp again?
                </button>
              )}
              <div className="flex justify-between">
                {otp.map((data, index) => {
                  return (
                    <input
                      className="m-1 sm:mx-[.1px] text-center my-6 text-3xl focus:outline-none rounded-md h-14 sm:h-10 bg-gray-100 w-12 sm:w-8"
                      type="text"
                      name="otp"
                      maxLength="1"
                      key={index}
                      value={data}
                      onChange={(e) => handleChange(e.target, index)}
                      onFocus={(e) => e.target.select()}
                    />
                  );
                })}
              </div>
              {error && <p className="text-red-700 my-2">{error}</p>}

              <div className="w-full justify-center  ">
                <Button
                  onClick={handleVerify}
                  buttonH={'h-10'}
                  buttonContent={`${t('signin')}`}
                />
              </div>
            </form>
          </div>
        </div>
      )}

      {step == 2 && (
        <>
          <SignUpDone />
        </>
      )}
    </>
  );
}

export default Emailverify;
