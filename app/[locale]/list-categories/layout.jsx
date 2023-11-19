'use client';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { useLocale } from 'next-intl';
import React, { useState } from 'react';

function Layout({ children }) {
  const [showSidebar, setShowSidebar] = useState(false);
  const locale = useLocale();
  return (
    <main className="flex flex-col pr-12 max-w-full">
      <Header showSidebar={false} setShowSidebar={setShowSidebar} />

      <div className="w-full">{children}</div>
      <div
        className={`fixed bottom-0 -z-10   ${
          locale == 'ar' ? 'left-0' : 'right-0'
        } `}
      >
        <Footer />
      </div>
    </main>
  );
}

export default Layout;
