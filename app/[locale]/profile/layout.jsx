import Footer from '@/components/Footer';
import Header from '@/components/Header';
import React from 'react';

export const metadata = {
  title: 'My Profile',
};

function Layout({ children }) {
  return (
    <main className="flex flex-col pr-0 max-w-full">
      <Header profile={true} />

      <div className="w-full">{children}</div>
      <div className={`fixed bottom-0 -z-10 right-0`}>
        <Footer />
      </div>
    </main>
  );
}

export default Layout;
