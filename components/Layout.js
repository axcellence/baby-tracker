import Head from "next/head";

const Layout = ({ children }) => {
  return (
    <>
      <Head>
        <title>Baby updates</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap"
          rel="stylesheet"
        />
      </Head>
      <div className="min-h-screen grid place-items-center bg-red-50 text-white">
        {children}
      </div>
    </>
  );
};

export default Layout;
