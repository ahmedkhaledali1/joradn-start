'use client';
import Button from '@/components/Button';
import FormInput from '@/components/input';
import vectorright from '@/public/vectorright.png';
import vectorleft from '@/public/vectorleft.png';
import google from '@/public/google.png';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import Phoneinput from '@/components/InputPhone';
import { useTranslations } from 'next-intl';
function LoginScreen() {
  const [form, setForm] = useState({
    // phone: '',
    password: '',
  });
  const pathname = usePathname();
  console.log(pathname);
  const [error, setError] = useState(null);
  const [loading, setIsLoading] = useState(false);
  const session = useSession();
  const router = useRouter();
  useEffect(() => {
    if (session.status == 'authenticated') {
      router.push('/home');
    }
  }, [session, router]);
  {
    session && console.log(session);
  }
  const [phoneNumber, setPhoneNumber] = useState();

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  // const handleFacebookLogin = async () => {
  // const facebook = signIn('facebook', {
  //   callbackUrl: '/',
  // });
  // };
  // console.log(form.phone);
  const handleLog = async (e) => {
    e.preventDefault();
    setError(null);
    console.log(form);

    if (!e.target.checkValidity()) {
      setError('Please fill in all required fields');
      return;
    }
    try {
      const data = await signIn('credentials', {
        phone: phoneNumber,
        password: form.password,
        redirect: false,
      });

      if (!data.error) {
        router.push(`/home`);
        // console.log(data);
      } else {
        setError(data.error);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleGoogleLogin = async () => {
    const google = signIn('google', {
      callbackUrl: '/home',
      // redirect: false,
    });
    console.log(google);
  };

  const t = useTranslations('login');

  return (
    <div className="h-screen w-full flex justify-center ">
      <div className=" h-[75vh] bg-white w-[25rem] sm:w-[20rem] rounded-xl mt-20 px-8 pb-11 pt-8">
        <div className="mb-5">
          <h1 className="text-2xl  font-semibold mb-3"> {t('hello')}</h1>
          <h2 className="text-red-700 text-2xl  font-semibold mb-4">
            {t('signin')}
          </h2>
          <p className="text-gray-700 text-sm ">
            {t('newUser')}
            <Link
              href={'/auth/register'}
              className="text-red-900 hover:underline"
            >
              {t('signup')}
            </Link>{' '}
            {t('or')}{' '}
            <Link href={'/home'} className="text-red-900 hover:underline">
              {t('skip')}
            </Link>{' '}
          </p>
        </div>
        <form onSubmit={handleLog}>
          <div className="flex flex-col gap-1">
            <Phoneinput
              phoneNumber={phoneNumber}
              setPhoneNumber={setPhoneNumber}
            />
            <FormInput
              required={true}
              type={'password'}
              name="password"
              value={form.password}
              onChange={handleChange}
              className={'flex justify-end'}
            />
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <p className="text-gray-700 pl-1 font-medium mb-6 mt-4 text-sm self-end">
            <Link href={'/auth/forgetpassword'} className=" hover:underline">
              {t('forgetPassword')}
            </Link>{' '}
          </p>
          <div className="w-full justify-center  ">
            <Button buttonH={'h-10'} buttonContent={`${t('signin')}`} />
          </div>
        </form>
        <div className="flex justify-center items-center gap-3 mt-6">
          <Image src={vectorright} alt="vectorright" />
          <span>{t('signin')}</span>
          <Image src={vectorleft} alt="vectorleft" />
        </div>
        <div className="flex justify-center items-center mt-3 gap-3">
          {/* <button onClick={handleFacebookLogin}>
            <Image src={face} alt="fecebook" />
          </button> */}
          <button onClick={handleGoogleLogin}>
            <Image src={google} alt="google" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginScreen;
