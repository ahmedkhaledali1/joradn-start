'use client';
import axios from 'axios';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

function Weather() {
  const [weather, setWeather] = useState({});
  const apiKey = '3745034723c3477a982164542230508';
  const location = 'Amman';

  const fetchWeather = async () => {
    try {
      const response = await axios.get(
        `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}`
      );
      const data = response.data;
      // Handle the weather data
      setWeather(data);
    } catch (error) {
      // Handle the error
      console.error(error);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, []);
  return (
    <div className="w-full  pt-4 bg-light-blue-50 p-2 rounded-xl  ">
      <div className=" gap-2">
        <div className="h-15 w-full flex justify-end">
          {weather && <Image src="/sun.png" alt="sun" width={45} height={45} />}
        </div>
        {weather?.current?.temp_c && (
          <h2 className="font-bold text-4xl text-blue-200">
            {weather?.current?.temp_c}C
          </h2>
        )}
      </div>
      {weather && (
        <div className="py-3 px-2 text-xl">
          {weather?.location?.name} - {weather?.location?.country}
        </div>
      )}
    </div>
  );
}

export default Weather;
