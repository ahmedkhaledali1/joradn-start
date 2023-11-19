import React from 'react';

export const metadata = {
  title: 'Maps',
};

function Layout({ children }) {
  return (
    <main className="flex flex-col relative min-h-screen  max-w-full">
      {children}
    </main>
  );
}

export default Layout;
