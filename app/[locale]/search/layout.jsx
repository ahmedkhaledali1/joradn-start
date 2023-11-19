import React from 'react';

function Layout({ children }) {
  return (
    <main className="flex flex-col relative   max-w-full">{children}</main>
  );
}

export default Layout;
