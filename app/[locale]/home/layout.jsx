'use client';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import HomeSide from '@/components/HomeSide';
import { useLocale } from 'next-intl';
import React, { useState } from 'react';

const Layout = ({ children }) => {
  const [showSidebar, setShowSidebar] = useState(true);
  const locale = useLocale();

  return (
    <main className="flex flex-col pr-4 sm:p-2 max-w-full">
      <Header showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
      <div className="flex w-full sm:relative">
        {showSidebar && (
          <div className="w-[30%] h-full  bg-white sm:absolute sm:right-0 sm:w-full sm:z-40  border-l-gray-300">
            <HomeSide />
          </div>
        )}
        <div className={` w-[70%] ${showSidebar ? 'sm:hidden ' : 'w-full'}`}>
          {children}
        </div>
      </div>
      <div
        className={`fixed bottom-0 -z-10   ${
          locale == 'ar' ? 'left-0' : 'right-0'
        } `}
      >
        <Footer />
      </div>
    </main>
  );
};

export default Layout;
