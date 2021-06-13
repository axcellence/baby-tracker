import { useState } from "react";
import useSWR from "swr";
const moment = require("moment-timezone");
import styled from "styled-components";

const server = `http://localhost:3000`;

const currentTime = moment().tz("Europe/London").format();

const Home = () => {
  const [loading, setLoading] = useState(true);

  const fetcher = async (url) => {
    const res = await fetch(url);
    const data = res.json();
    console.log(data);
    setLoading(false);
    return data;
  };

  const { data, error } = useSWR(`${server}/api/latest`, fetcher, {
    refreshInterval: 120 * 1000,
  });

  const label = data.properties.Name.title[0].plain_text;
  let { date } = data.properties.Date;
  const ended = date.end ? true : false;
  const time = ended ? moment(date.end) : moment(date.start);

  const Box = styled.div`
    text-align: center;
    color: rgb(55, 65, 81);
  `;

  const Label = styled.div`
    font-size: 2rem;
    font-weight: 600;
  `;

  const Time = styled.time`
    display: block;
    margin-top: 0.5em;
    font-size: 1.5rem;
    opacity: 0.5;
  `;

  return (
    <main>
      {!loading && data && (
        <Box>
          <Label>{label} </Label> <Time>{time.from(currentTime)}</Time>
        </Box>
      )}
      {loading && <h1>Loading...</h1>}
    </main>
  );
};

export default Home;
