import React from 'react';
import bgauth from '@/public/bgauth.png';
import Image from 'next/image';
function Layout({ children }) {
  return (
    <>
      <div className="-z-10 fixed w-full h-screen  bg-black">
        <Image src={bgauth} alt="cover" fill className=" opacity-50" />
      </div>
      {children}
    </>
  );
}

export default Layout;
