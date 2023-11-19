export async function generateMetadata({ params, searchParams }, parent) {
  // read route params
  const id = params.id;
  //   console.log(id);
  // fetch data
  const product = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/blog/${id}`
  ).then((res) => res.json());
  //   console.log(product);
  // optionally access and extend (rather than replace) parent metadata

  return {
    title: product.data.title,
    openGraph: {
      images: [`https://dash.jordanstartshere.com/${product.data.image}`],
    },
  };
}

function Layout({ children }) {
  return (
    <main className="flex flex-col relative min-h-screen  max-w-full">
      {children}
    </main>
  );
}

export default Layout;
