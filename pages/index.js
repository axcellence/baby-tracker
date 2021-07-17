import { useState, useEffect } from "react";
import useSWR from "swr";
const moment = require("moment-timezone");

import Layout from "../components/Layout";
import Box from "../components/Box";

const dev = process.env.NODE_ENV !== "production";
const server = dev
  ? "http://localhost:3000"
  : "https://babytracking.netlify.app";

const currentTime = moment().tz("Europe/London").format();

const Home = ({ data }) => {
  console.log(data);
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     console.log("This will run after 1 second!");
  //   }, 1000);
  //   setLoading(false);
  //   return () => clearTimeout(timer);
  // }, []);

  return (
    <Layout>
      <main>
        <header className="border-b-2 border-gray-400 pb-4 mb-8">
          <h1 className="text-2xl md:text-3xl font-bold tracking-wider uppercase text-gray-700 text-center">
            baby updates
          </h1>
        </header>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.map((item) => {
            return <Box key={item.id} {...item} />;
          })}
        </div>

        {/* {loading && <h1>Loading...</h1>} */}
      </main>
    </Layout>
  );
};

export const getStaticProps = async () => {
  const res = await fetch(`${server}/api/latest`);
  const data = await res.json();

  return {
    props: {
      data,
    },
    revalidate: 1,
  };
};

export default Home;
