import React from 'react';

export const metadata = {
  title: 'About',
};

function Layout({ children }) {
  return (
    <main className="flex flex-col  max-w-full">
      <div className="w-full">{children}</div>
    </main>
  );
}

export default Layout;
