'use client';
import React from 'react';
import { Icon } from '@iconify/react';
import locationIcon from '@iconify/icons-mdi/map-marker';
import Image from 'next/image';

const LocationPin = ({ text, lat, lng, onClick }) => (
  <div className="pin w-[8rem]" onClick={onClick}>
    <Icon icon={locationIcon} className="pin-icon" width={50} height={50} />
  </div>
);

export default LocationPin;
