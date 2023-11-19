'use client';
import Button from '@/components/Button';
import NewPasswordDone from '@/components/NewDone';
import FormInput from '@/components/input';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useLocale, useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

function LoginScreen() {
  const [otp, setOtp] = useState(new Array(6).fill(''));
  const [email, setEmail] = useState();
  const [error, setError] = useState(null);
  console.log(error);
  const [passwordError, setPasswordError] = useState('');
  const [loading, setIsLoading] = useState(false);
  const [password, setPassword] = useState('');
  const session = useSession();
  const router = useRouter();
  useEffect(() => {
    if (session.status == 'authenticated') {
      router.push('/home');
    }
  }, [session, router]);
  const locale = useLocale();
  const [step, setStep] = useState(3);
  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;
    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);
    if (element.nextSibling) {
      element.nextSibling.focus();
    }
  };
  const stringOtp = otp.join('');
  console.log(stringOtp);

  const handleEmail = async (e) => {
    e.preventDefault();

    try {
      const sendOtp = await axios.post(
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
      console.log(sendOtp);

      if (sendOtp?.status == 200) {
        setStep(2);
        setError(null);
      }
    } catch (error) {
      console.log(error?.response?.data?.msg);
      setError(error?.response?.data?.msg);
    }
  };

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
        setStep(3);
      }
    } catch (error) {
      setError('somthing is wrong');
    }
  };
  const newPass = async (e) => {
    e.preventDefault();

    try {
      const newPassword = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/update-password`,
        {
          email: email,
          password: password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'x-localization': `${locale}`,
          },
        }
      );
      console.log(newPassword);
      if (newPassword.status == 200) {
        setStep(4);
      }
    } catch (error) {
      console.log('mmmm');
    }
    if (password.length < 5) {
      setPasswordError('Password Should be mora that 4 charts');
    }
  };

  const t = useTranslations('mobileVerify');
  console.log(password.length);
  return (
    <>
      {step == 1 && (
        <div className="h-[100vh] w-full flex justify-center ">
          <div className=" h-[25rem] bg-white w-[26rem] sm:w-[20rem] rounded-xl mt-28 px-10 sm:px-5 py-14 ">
            <div className="mb-5">
              <h1 className="text-2xl  font-semibold mb-5">{t('confirm')}</h1>
            </div>
            <form>
              <FormInput
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type={'email'}
                label={t('phoneNumber')}
              />

              {error && <p className="text-sm text-red-600">{error}</p>}

              <div className="w-full mt-8 justify-center  ">
                <Button
                  onClick={handleEmail}
                  buttonH={'h-10'}
                  buttonContent={`${t('next')}`}
                />
              </div>
            </form>
          </div>
        </div>
      )}

      {step == 2 && (
        <div className="h-[100vh] w-full flex justify-center ">
          <div className=" h-[25rem] bg-white w-[26rem] sm:w-[20rem] rounded-xl mt-28 px-10 sm:px-5 py-14 ">
            <div className="mb-5">
              <h1 className="text-2xl  font-semibold mb-5">{t('confirm')}</h1>

              <p className="text-gray-700 text-2xl mb-5">{t('sendOTP')} </p>
            </div>
            <form>
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
              {error && <p className="text-sm text-red-600">{error}</p>}

              <div className="w-full mt-8 justify-center  ">
                <Button
                  onClick={handleVerify}
                  buttonH={'h-10'}
                  buttonContent={`${t('next')}`}
                />
              </div>
            </form>
          </div>
        </div>
      )}
      {step == 3 && (
        <div className="h-[100vh] w-full flex justify-center ">
          <div className=" h-[25rem] bg-white w-[26rem] sm:w-[20rem] rounded-xl mt-28 px-10 sm:px-5 py-14 ">
            <div className="mb-5">
              <p className="text-gray-700 text-2xl mb-5">{t('newPassword')} </p>
            </div>
            <form>
              <FormInput
                minLength={5}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type={'password'}
                label={'New Password'}
              />
              {error && <p className="text-sm text-red-600">{error}</p>}
              {passwordError != '' && (
                <p className="text-sm text-red-600">{passwordError}</p>
              )}
              <div className="w-full mt-8 justify-center  ">
                <Button
                  onClick={newPass}
                  buttonH={'h-10'}
                  buttonContent={`${t('next')}`}
                />
              </div>
            </form>
          </div>
        </div>
      )}
      {step == 4 && <NewPasswordDone />}
    </>
  );
}

export default LoginScreen;
