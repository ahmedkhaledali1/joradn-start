import Footer from '@/components/Footer';
import Header from '@/components/Header';
import React from 'react';

export const metadata = {
  title: 'blogs',
};

const Layout = ({ children }) => {
  return (
    <main className="flex flex-col relative  max-w-full">
      <Header dynamic />
      <div className="flex w-full">
        <div className="flex-grow">{children}</div>
      </div>
      <div className={`fixed bottom-0 -z-10  right-0`}>
        <Footer />
      </div>
    </main>
  );
};

export default Layout;
