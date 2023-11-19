'use client';
import React, { useCallback, useEffect, useState } from 'react';
import GoogleMapReact from 'google-map-react';
import LocationPin from '@/components/LocationPin';
import { useParams } from 'next/navigation';

const Map = ({}) => {
  const param = useParams();
  console.log(param);
  const [data1, setData] = useState(undefined);
  const [location, setLocation] = useState(undefined);
  const fetchData = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/partner/${param.idmap}`,
        {
          headers: {
            'Content-Type': 'application/json',
            'x-localization': 'ar',
          },
        }
      );
      const data = await response.json();
      setData(data?.data);
      console.log(data);
      // console.log(param.id);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    if (data1 !== undefined) {
      setLocation({
        address: data1?.branches[0]?.location,
        lat: data1?.branches[0].lat,
        lng: data1?.branches[0].long,
      });
      console.log(data1?.branches[0]?.name);
    }
  }, [data1]);

  return (
    <div className="map">
      {(data1 !== undefined) & (location !== undefined) && (
        <div className="google-map h-screen relative">
          <GoogleMapReact
            bootstrapURLKeys={{
              key: 'AIzaSyCcOWxQgXGToRfKLlt1KjU_ev-ohFmPbRY',
            }}
            center={location}
            defaultZoom={15}
          >
            <LocationPin
              lat={location.lat}
              lng={location.lng}
              text={location.address}
              onClick={() => {}}
            />
          </GoogleMapReact>
        </div>
      )}
    </div>
  );
};
export default Map;
