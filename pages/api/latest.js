import { duration } from "moment-timezone";

const moment = require("moment-timezone");
const { Client } = require("@notionhq/client");

// Initializing a client
const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

const latestEvents = async (req, res) => {
  const events = [];
  try {
    let latestEntries = [
      await notion.databases.query({
        database_id: process.env.NOTION_DB_FEED_ID,
      }),
      await notion.databases.query({
        database_id: process.env.NOTION_DB_SLEEP_ID,
      }),
      await notion.databases.query({
        database_id: process.env.NOTION_DB_NAPPY_ID,
      }),
    ];

    let currentPages = await Promise.all(latestEntries);

    currentPages.forEach((item) => {
      const page = item.results[0];

      events.push({
        id: page.id,
        name: page.properties.Name.title[0].plain_text,
        start_date: page.properties.Date.date.start,
        end_date: page.properties.Date.date.end,
        type:
          page.properties?.Type?.select.name ||
          page.properties?.State?.select.name,
        duration: page.properties?.Duration?.formula.string,
      });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }

  res.status(200).json(events);
};

export default latestEvents;
