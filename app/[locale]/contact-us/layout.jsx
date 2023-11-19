import Header from '@/components/Header';
import React from 'react';

export const metadata = {
  title: 'Contact us',
};

function Layout({ children }) {
  return (
    <main className="flex flex-col relative min-h-screen  max-w-full">
      <Header />
      {children}
    </main>
  );
}

export default Layout;
