import React from 'react';

export const metadata = {
  title: 'My Favourites',
};

function Layout({ children }) {
  return <main className="flex flex-col relative  max-w-full">{children}</main>;
}

export default Layout;
