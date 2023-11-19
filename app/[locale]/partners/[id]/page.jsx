'use client';
import Image from 'next/image';
import React, { useCallback, useEffect, useState } from 'react';
import map1 from '@/public/map1.png';
import { Rating } from 'react-simple-star-rating';
import { useParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { BsWhatsapp } from 'react-icons/bs';
import { AiFillHeart, AiOutlineHeart, AiOutlinePhone } from 'react-icons/ai';
import { HiOutlineClipboardList } from 'react-icons/hi';
import Button from '@/components/Button';
import Link from 'next/link';
import axios from 'axios';
import { useLocale, useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
function PartnerScreen() {
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const locale = useLocale();

  const router = useRouter();
  const param = useParams();

  const session = useSession();
  const [token, setToken] = useState('');
  const [userId, setUserId] = useState();
  useEffect(() => {
    if (session?.data?.user?.data) {
      setToken(session?.data?.user?.data?.token);
      setUserId(session?.data?.user?.data?.user?.id);
    } else if (session?.data?.user?.user) {
      setToken(session?.data?.user?.token);
      setUserId(session?.data?.user?.user?.id);
    }
  }, [session]);
  const [data1, setData] = useState([]);
  let photos = data1?.landscape_images?.map((item) => item.image);
  const scrCover =
    photos & !selectedPhoto & (data1?.portrait_images !== undefined)
      ? `https://dash.jordanstartshere.com/${data1?.portrait_images[0]?.image}`
      : `https://dash.jordanstartshere.com/${selectedPhoto}`;
  const fetchData = useCallback(async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/partner/${param.id}`,
        {
          headers: {
            'Content-Type': 'application/json',
            'x-localization': `${locale}`,
          },
        }
      );
      const data = await response.json();
      setData(data?.data);
      // console.log(data);
    } catch (error) {
      console.log(error);
    }
  }, [param]);
  const fetchDataAuth = useCallback(async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/single-partner/${param.id}`,
        {
          headers: {
            'Content-Type': 'application/json',
            'x-localization': `${locale}`,
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      setData(data?.data);
      // console.log(data);
      // console.log(param.id);
    } catch (error) {
      console.log(error);
    }
  }, [param, session, token]);
  useEffect(() => {
    if (data1.length === 0) {
      if (session?.status == 'authenticated') {
        fetchDataAuth();
        // console.log('auth');
      } else if (session.status == 'unauthenticated') {
        fetchData();
        // console.log('no');
      }
    }
    // console.log(data1);
  }, [fetchData, data1, session, token]);

  const handleFav = async () => {
    try {
      const response = await axios.get(
        `https://dash.jordanstartshere.com/api/toggle-favorite/${data1.id}`,
        {
          headers: {
            'Content-Type': 'application/json',
            'x-localization': `${locale}`,
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setData({ ...data1, is_favorite: response?.data?.data?.is_favorite });
      // console.log(response?.data?.data?.is_favorite);
    } catch (error) {
      console.log(error);
    }
  };

  const date = new Date(data1?.created_at);
  const months = [
    'يناير',
    'فبراير',
    'مارس',
    'إبريل',
    'مايو',
    'يونيو',
    'يوليو',
    'أغسطس',
    'سبتمبر',
    'أكتوبر',
    'نوفمبر',
    'ديسمبر',
  ];
  const formattedDate =
    date.getDate() + ' ' + months[date.getMonth()] + ' ' + date.getFullYear();
  // console.log(data1); // Outputs: 5 يناير 2023
  // console.log(session);
  const t = useTranslations('singlePartner');
  const go = async ({ whatsapp, counter }) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/${counter}`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      const data = await response.json();
      setData(data?.data);
      // console.log(param.id);
    } catch (error) {
      console.log(error);
    }

    router.push(`${whatsapp}`);
  };
  console.log(data1);

  const [comment, setComment] = useState('');

  const [rating, setRating] = useState(0);
  const [handeledRate, setHandledRate] = useState(0);
  const handleRating = () => {
    setRating(handeledRate);
  };
  const onPointerMove = (value) => setHandledRate(value);

  const addComment = async () => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/review-create`,
        {
          content: comment,
          partner_id: data1.id,
          user_id: userId,
          points: rating,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'x-localization': `${locale}`,
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status == 20) {
        setData({
          ...data1,
          reviews: [...data1.reviews, response?.data?.data],
        });
      }
      // console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  // console.log(session);
  return (
    <div className="w-full flex flex-col relative">
      <div
        className={`h-[30rem] w-[30rem] px-9 shadow-lg pt-10 bg-white sm:hidden fixed ${
          locale == 'ar' ? 'left-[8%]' : 'right-[8%]'
        } bottom-5 rounded-2xl  z-40`}
      >
        {session.status == 'authenticated' ? (
          <>
            <h2 className="text-3xl  font-tajwal mb-8 font-medium text-red-900">
              {t('discoverNow')} {''}
              {data1?.name}
            </h2>
            <p className="text-2xl text-gray-700 mb-10">
              {t('ifYouWantToVisit')}
              {data1?.name}
            </p>
            <div className="text-2xl text-gray-700 flex justify-between">
              <div>
                {t('priceRate')}
                {data1?.price_rate}$
              </div>
              <div>
                {' '}
                {t('startingFrom')} {data1?.start_price}$
              </div>
            </div>
            <div className="grid gap-3 mt-8 grid-cols-3 text-xl h-12 text-white">
              <div className="bg-green-400 rounded-xl px-3 flex items-center gap-2">
                <BsWhatsapp size={20} />
                <button
                  onClick={() =>
                    go({
                      whatsapp: `https://wa.me/${data1.whatsapp}`,
                      counter: 'whatsapp-counter',
                    })
                  }
                >
                  {t('whatsapp')}
                </button>
              </div>
              <div className="bg-blue-400 rounded-xl px-3 flex items-center gap-2">
                <AiOutlinePhone size={20} />
                <button
                  onClick={() => () =>
                    go({
                      whatsapp: `tel:${data1.phone}`,
                      counter: 'call-counter',
                    })}
                >
                  {t('call')}
                </button>
              </div>
              <div
                style={{ backgroundColor: '#C89A49' }}
                className=" rounded-xl px-3 flex items-center gap-2"
              >
                <HiOutlineClipboardList size={20} />
                <button>{t('menu')}</button>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="text-3xl flex flex-col  font-tajwal mb-8 font-medium text-red-900">
              {t('pleaseLogin')}
            </div>
            <div className="flex gap-4 mt-20 w-full ">
              <Link href={'/auth/register'} className="w-[50%]">
                <Button buttonH={'h-10'} buttonContent={'إنشاء حساب'} />
              </Link>
              <Link href={'/auth/login'} className="w-[50%]">
                <Button
                  buttonH={'h-10'}
                  buttonBg="bg-red-100"
                  buttonTextColor="text-gray-700"
                  buttonContent={'تسجيل الدخول'}
                />
              </Link>
            </div>
          </>
        )}
      </div>
      <div className=" w-full flex justify-center mb-2 ">
        <div
          className="sm:w-full"
          style={{
            position: 'relative',
            width: '95%',
            height: '600px',
            maxHeight: '600px',
            cursor: 'pointer',
          }}
        >
          {session.status == 'authenticated' && (
            <div
              onClick={() => handleFav()}
              className="absolute top-3 left-3 z-20 bg-black text-white bg-opacity-40 p-1 rounded-xl"
            >
              {data1.is_favorite == true ? (
                <AiFillHeart size={40} />
              ) : (
                <AiOutlineHeart size={40} />
              )}
            </div>
          )}
          {data1?.landscape_images != undefined && (
            <Image
              src={
                !selectedPhoto
                  ? `https://dash.jordanstartshere.com/${data1?.landscape_images[0]?.image}`
                  : `https://dash.jordanstartshere.com/${selectedPhoto}`
              }
              fill
              sizes="(max-width: 640px) 640px, (max-width: 768px) 768px, (max-width: 1024px) 1024px, 1280px"
              className="object-center "
              alt="card photo"
            />
          )}
        </div>
      </div>
      <div
        className={`slider w-[60%] sm:w-full sm:pr-0  mt-3 flex ${
          locale == 'ar' ? 'pr-24' : 'pl-24'
        } `}
      >
        {photos?.map((photo) => (
          <div
            key={photo}
            style={{
              position: 'relative',
              width: '170px',
              height: '100px',

              maxHeight: '100px',
              cursor: 'pointer',
              marginRight: '8px',
            }}
            onClick={() => setSelectedPhoto(photo)}
          >
            <Image
              src={`https://dash.jordanstartshere.com/${photo}`}
              fill
              sizes="(max-width: 640px) 640px, (max-width: 768px) 768px, (max-width: 1024px) 1024px, 1280px"
              className={`object-fill ${
                selectedPhoto !== photo && 'opacity-50'
              }`}
              alt="Slider photo"
            />
          </div>
        ))}
      </div>
      <div
        className={`desc flex flex-col border-b-2 w-[60%] sm:w-full sm:px-2 sm:mt-4 sm:mr-0 sm:py-5  border-b-gray-200 ${
          locale == 'ar' ? 'mr-16 sm:mr-0 ' : 'ml-16 sm:ml-0'
        } mt-16 pb-12`}
      >
        <h1 className="text-3xl sm:text-xl font-tajwal mb-8 sm:mb-2 font-semibold text-red-900">
          {data1?.name}
        </h1>
        <p className="text-2xl sm:text-lg  text-gray-700">
          {data1?.description}
        </p>
      </div>
      <div className="flex flex-col w-[60%] sm:w-full sm:px-2 sm:mt-4 sm:py-5 pb-8 border-b-2  border-b-gray-200 sm:mr-0 mr-16">
        <div className="desc w-full flex flex-col sm:w-full sm:px-2 sm:mt-4 sm:py-5 pl-16 mt-16 pb-8">
          <h1 className="text-3xl sm:text-xl font-tajwal mb-8 font-semibold text-red-900">
            {t('branchesAndAddresses')}
          </h1>
          {data1?.branches?.map((branche) => (
            <div
              key={branche.id}
              className="text-xl sm:text-lg w-full flex  justify-between font-medium"
            >
              <div className="w-[50%]">
                <h3 className="text-2xl sm:text-lg  font-semibold mb-4">
                  {branche.name}
                </h3>
                <div className="text-2xl sm:text-lg  text-gray-700">
                  <p className="mb-6 ">
                    {branche.city_name} -{branche.area_name}
                  </p>
                </div>
              </div>
              <div className="w-[50%]">
                <Link
                  target={'_blank'}
                  className="w-full"
                  href={`/maps/${data1.id}`}
                >
                  <Image src={map1} alt="map" />
                </Link>
              </div>
            </div>
          ))}
        </div>
        {/* <div className="desc w-full flex flex-col border-t-2  border-r-gray-200  pt-8 pb-12">
          <h1 className="text-3xl sm:text-xl font-tajwal mb-8 font-semibold text-red-900">
            اوقات وساعات العمل
          </h1>
          <div className="w-[70%] flex flex-col ">
            <div className="flex justify-between mb-4">
              <p className="text-2xl sm:text-lg font-medium"> الاحد - الخميس</p>
              <p className="text-xl sm:text-lg text-gray-500">
                {' '}
                11:00 - 10:00 ص
              </p>
            </div>
            <div className="flex justify-between">
              <p className="text-2xl sm:text-lg font-medium"> السبت - الحمعة</p>
              <p className="text-xl sm:text-lg text-gray-500 ">
                {' '}
                12:00 - 9:00 ص
              </p>
            </div>
          </div>
        </div> */}
      </div>
      <div className="desc flex flex-col w-[60%] sm:w-full border-b-2 text-gray-700 border-b-gray-200 mx-16 mt-16 sm:mt-5 sm:px-2 sm:mx-0 pb-12">
        <h1 className="text-3xl sm:text-xl font-tajwal mb-8 font-semibold text-red-900">
          {t('ratings')}
        </h1>
        <div className="flex mb-12">
          {data1.rating ? (
            <>
              <div className="font-semibold text-3xl sm:text-xl ml-3 ">
                {data1.rating}
              </div>
              <div>
                <Rating
                  iconsCount={5}
                  size={25}
                  emptyStyle={{ display: 'flex' }}
                  fillStyle={{ display: '-webkit-inline-box' }}
                  className="my-custom-class flex justify-start"
                  readonly={true}
                  initialValue={data1?.rating}
                />
                <div className="text-gray-400">{data1?.reviews?.length}</div>
              </div>
            </>
          ) : (
            <div className="text-2xl ">Have No Rating</div>
          )}
        </div>
        <div>
          <div className="mb-5">
            {data1?.reviews?.map((review) => (
              <div key={review.id} className="mb-10">
                <div className="flex mb-4">
                  <div className="mx-5">
                    <Image
                      width={50}
                      height={50}
                      className="rounded-full"
                      src={`https://dash.jordanstartshere.com/${review?.user?.profile_image}`}
                      alt="commment photo"
                    />
                  </div>

                  <div>
                    <h1 className="text-xl font-semibold">
                      {' '}
                      {review?.user?.name}
                      {''} {review?.user?.last_name}
                    </h1>
                    <div className="text-gray-400">
                      {' '}
                      {new Date(review?.created_at).getDate() +
                        ' ' +
                        new Date(review?.created_at).getMonth() +
                        ' ' +
                        new Date(review?.created_at).getFullYear()}
                    </div>
                  </div>
                </div>
                <div className="text-2xl px-16 sm:px-2 sm:text-lg">
                  {review?.content ? (
                    review?.content
                  ) : (
                    <div> starts {review?.points}</div>
                  )}
                </div>
              </div>
            ))}
          </div>
          {session.status == 'authenticated' && (
            <div className="mb-10 flex gap-5 items-center sm:flex-col">
              <input
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-[24rem] sm:w-[18rem] p-2 px-4 outline-none border h-10 rounded-2xl"
                placeholder="let me see your opinion ..."
              />
              <Rating
                iconsCount={5}
                size={30}
                emptyStyle={{ display: 'flex' }}
                fillStyle={{ display: '-webkit-inline-box' }}
                className="my-custom-class flex justify-start"
                initialValue={data1?.rating}
                onClick={handleRating}
                onPointerMove={onPointerMove}
              />
              <button
                onClick={addComment}
                className="w-24 text-center px-5 py-1 rounded-2xl bg-red-900 text-white"
              >
                Enter
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default PartnerScreen;
