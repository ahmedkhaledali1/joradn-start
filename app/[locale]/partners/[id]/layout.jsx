import Footer from '@/components/Footer';
import Header from '@/components/Header';
import React from 'react';

export async function generateMetadata({ params, searchParams }, parent) {
  // read route params
  const id = params.id;
  // console.log(id);
  // fetch data
  const product = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/partner/${id}`
  ).then((res) => res.json());
  // console.log(product);
  // optionally access and extend (rather than replace) parent metadata

  return {
    title: product.data.name,
    openGraph: {
      images: [
        `https://dash.jordanstartshere.com/${product?.data?.landscape_images[0]?.image}`,
      ],
    },
  };
}

function Layout({ children, searchParams }) {
  console.log(searchParams);
  return (
    <main className="flex flex-col relative  w-full">
      <Header dynamic />
      <div className="w-full">{children}</div>
      <div className="fixed top-96 -z-10 left-0">
        <Footer />
      </div>
    </main>
  );
}

export default Layout;
