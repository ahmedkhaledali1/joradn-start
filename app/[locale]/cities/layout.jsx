import Footer from '@/components/Footer';
import Header from '@/components/Header';
import React from 'react';

export const metadata = {
  title: 'Cities',
};
function Layout({ children }) {
  return (
    <main className="flex flex-col pr-12 max-w-full">
      <Header />

      <div className="w-full">{children}</div>
      <div className="fixed bottom-0 -z-10 left-0">
        <Footer />
      </div>
    </main>
  );
}

export default Layout;
