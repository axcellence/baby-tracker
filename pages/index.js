import { useState, useEffect } from "react";
import useSWR from "swr";
const moment = require("moment-timezone");

import Layout from "../components/Layout";
import Box from "../components/Box";
import { feedDbId, sleepDbId, nappyDbId, getDatabase } from "../lib/notion";

const dev = process.env.NODE_ENV !== "production";
const server = dev
  ? "http://localhost:3000"
  : "https://babytracking.netlify.app";

const currentTime = moment().tz("Europe/London").format();

const Home = ({ data }) => {
  return (
    <Layout>
      <main className="my-8">
        <h1 className="text-2xl md:text-4xl font-semibold tracking-wider uppercase text-gray-600 text-center mb-8">
          <span className="inline-block border-b-2 border-gray-300 pb-4">
            baby updates
          </span>
        </h1>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.map((item) => {
            return <Box key={item.id} {...item} />;
          })}
        </div>
      </main>
    </Layout>
  );
};

export const getStaticProps = async () => {
  const feed = await getDatabase(feedDbId);
  const sleep = await getDatabase(sleepDbId);
  const nappy = await getDatabase(nappyDbId);
  const data = [feed, sleep, nappy];

  return {
    props: {
      data,
    },
    revalidate: 1,
  };
};

export default Home;
