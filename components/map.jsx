'use client';
import React, { useEffect, useState } from 'react';
import GoogleMapReact from 'google-map-react';
import LocationPin from './LocationPin';
import Image from 'next/image';
import axios from 'axios';
import { Rating } from 'react-simple-star-rating';
import { HiLocationMarker } from 'react-icons/hi';
import Link from 'next/link';

const Map = ({
  branches,
  zoomLevel,
  data1,
  setData,
  originData,
  setOrigidata,
}) => {
  const [selectedBranche, setSelectedBranche] = useState(undefined);
  const handlePinClick = (branche) => {
    setSelectedBranche(branche);
  };
  const selectedPartner = data1?.filter((partner) =>
    partner.branches.some((branch) => branch === selectedBranche)
  );
  useEffect(() => {}, [data1]);
  console.log(selectedPartner);
  // console.log(selectedBranche);
  // {selectedPartner !== data1 && selectedPartner }
  // console.log(selectedPartner);

  const location = {
    address: 'Martins coffee and sweets, Naltshek Street, Amman, Jordan',
    lat: 31.963158,
    lng: 35.930359,
  };
  return (
    <div className="map">
      <div className="google-map h-screen relative">
        <GoogleMapReact
          bootstrapURLKeys={{
            key: 'AIzaSyCcOWxQgXGToRfKLlt1KjU_ev-ohFmPbRY',
          }}
          defaultCenter={location}
          defaultZoom={zoomLevel}
        >
          {branches &&
            branches?.map((branche) => (
              <LocationPin
                key={branche.lat}
                lat={branche.lat}
                lng={branche.long}
                text={branche.name}
                onClick={() => handlePinClick(branche)}
              />
            ))}
        </GoogleMapReact>
        {selectedBranche !== undefined ? (
          <div className="flex gap-3 w-[30%] z-50 sm:w-[90%] bg-white rounded-xl absolute bottom-5 left-0 right-0 mx-auto p-2 mb-4">
            <Link
              href={`/partners/${selectedPartner[0]?.id}`}
              className="block"
            >
              <div
                style={{
                  position: 'relative',
                  width: '9rem',
                  height: '9rem',
                  maxHeight: '9rem',
                }}
              >
                {(selectedPartner !== data1) &
                  (selectedPartner != undefined) && (
                  <Image
                    src={`https://dash.jordanstartshere.com/${selectedPartner[0]?.logo}`}
                    fill
                    sizes="(max-width: 640px) 640px, (max-width: 768px) 768px, (max-width: 1024px) 1024px, 1280px"
                    className="object-cover rounded-lg"
                    alt="card photo"
                  />
                )}
              </div>
            </Link>
            <div className="flex-grow">
              <div className="flex flex-col w-full justify-between">
                <div className=" bg-red-900 self-end rounded-xl text-white px-4 text-center py-1 ml-1 mt-1">
                  {(selectedPartner !== data1) &
                    (selectedPartner != undefined) &&
                    selectedPartner[0]?.start_price}
                  {''}$
                </div>
                <h3 className="text-red-700  text-xl cursor-pointer">
                  {(selectedPartner !== data1) &
                    (selectedPartner != undefined) && selectedPartner[0]?.name}
                </h3>
              </div>
              <div className="flex gap-1">
                <HiLocationMarker className="text-gray-400" />
                <p>
                  {selectedBranche?.city_name} - {selectedBranche?.area_name}
                </p>
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
                      size={28}
                      emptyStyle={{ display: 'flex' }}
                      fillStyle={{ display: '-webkit-inline-box' }}
                      className="my-custom-class  flex justify-start "
                      readonly={true}
                      initialValue={selectedPartner[0]?.rating}
                    />
                  </div>
                  <p className="text-gray-600 font-medium text-xl">$$$</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          ''
        )}
      </div>
    </div>
  );
};
export default Map;
