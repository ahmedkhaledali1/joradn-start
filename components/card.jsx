'use client';
import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { HiLocationMarker } from 'react-icons/hi';
import { Rating } from 'react-simple-star-rating';
function Card({ data, fav }) {
  const router = useRouter();
  const [rating, setRating] = useState(data?.rating);
  const handleFav = async () => {
    try {
      const partner_id = +data.id;
      const response = await axios.post(
        `https://dash.jordanstartshere.com/api/toggle-favorite`,

        { partner_id },

        {
          headers: {
            'Content-Type': 'application/json',
            'x-localization': 'en',
          },
        }
      );
      // setData({ ...data1, is_favorite: response.data.is_favorite });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
    console.log(+data?.id);
  };
  return (
    <div className="w-full rounded-xl overflow-hidden  ">
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '300px',
          maxHeight: '300px',
          cursor: 'pointer',
        }}
      >
        {fav && (
          <div
            onClick={handleFav}
            className="absolute top-3 left-3 z-20 bg-black text-white bg-opacity-40 p-1 rounded-xl"
          >
            {data.is_favorite == true ? (
              <AiFillHeart size={30} />
            ) : (
              <AiOutlineHeart size={30} />
            )}
          </div>
        )}
        <Image
          onClick={() => router.push(`/partners/${data.id}?query=${data.name}`)}
          src={`https://dash.jordanstartshere.com/${data.logo}`}
          fill
          sizes="(max-width: 640px) 640px, (max-width: 768px) 768px, (max-width: 1024px) 1024px, 1280px"
          className="object-cover"
          alt="card photo"
        />
      </div>
      <div className="bg-gray-100 min-h-32 p-4">
        <div className="flex justify-between">
          <h3
            onClick={() => router.push(`/partners/${data.id}`)}
            className="multi-line-title text-red-700  text-lg cursor-pointer"
          >
            {data.name}
          </h3>
          <div className=" bg-red-800 max-h-7 rounded-xl text-white w-[4rem] text-center py-1">
            ${data.start_price}
          </div>
        </div>
        <div className="flex ">
          <HiLocationMarker className="text-gray-400" />

          <h3 className="mr-1  font-medium multi-line-title">
            {data.branches[0]?.city_name} - {data.branches[0]?.area_name}
          </h3>
        </div>
        <div>
          <div className="flex justify-between mt-2 ">
            <div
              style={{
                direction: 'ltr',
                fontFamily: 'sans-serif',
                touchAction: 'none',
              }}
            >
              <Rating
                iconsCount={5}
                size={25}
                emptyStyle={{ display: 'flex' }}
                fillStyle={{ display: '-webkit-inline-box' }}
                className="my-custom-class  flex justify-start "
                readonly={true}
                initialValue={rating}
              />
            </div>
            <p className="text-gray-600 font-medium text-xl">$$$</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
