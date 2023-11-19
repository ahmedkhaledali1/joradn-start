import Image from 'next/image';
import React from 'react';

function ListCategories() {
  return (
    <div className="w-full h-[86vh] p-20">
      <div className="w-full flex flex-col  gap-28 items-center p-2">
        <h1 className=" text-4xl font-bold text-gray-700">التصنيفات</h1>
        <div className="w-[70%] grid grid-cols-6 gap-7">
          <div className=" bg-gray-100 col-span-1 h-32 rounded-2xl flex justify-center items-center">
            <Image
              src="/hamburger.png"
              alt="sun"
              className="text-opacity-70"
              width={80}
              height={80}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListCategories;
