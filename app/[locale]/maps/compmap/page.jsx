'use client';
import React from 'react';
import GoogleMapReact from 'google-map-react';
import LocationPin from '@/components/LocationPin';

const Map = () => {
  const location = {
    address: 'Prince Hamza Bin Al Hussein St, Amman, Jordan',
    lat: 31.900278,
    lng: 35.855627,
  };

  return (
    <div className="map">
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
    </div>
  );
};
export default Map;
