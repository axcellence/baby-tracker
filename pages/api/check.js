const moment = require("moment-timezone");
const { Client } = require("@notionhq/client");

// Initializing a client
const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

export default async (req, res) => {
  const feedId = process.env.NOTION_DB_FEED_ID;
  const sleepId = process.env.NOTION_DB_SLEEP_ID;

  const { type } = req.query;

  const currentTime = moment().tz("Europe/London").format();

  // Check type

  const databaseId =
    type === "feed" ? feedId : type === "sleep" ? sleepId : false;

  let getPreviousEntryId = async () => {
    const db = await notion.databases.query({
      database_id: databaseId,
    });
    return db.results[0].id;
  };

  let time;

  const getLabel = (ended) => {
    if (type === "feed" && ended) {
      return "fed";
    } else if (type === "sleep" && ended) {
      return "slept";
    } else if (type === "feed" && !ended) {
      return "feeding";
    } else if (type === "sleep" && !ended) {
      return "sleeping";
    } else {
      return "";
    }
  };

  getPreviousEntryId()
    .then(async (id) => {
      const previous = await notion.pages.retrieve({
        page_id: id,
      });
      return previous;
    })
    .then(async (previous) => {
      let { date } = previous.properties.Date;

      const ended = date.end ? true : false;
      date = ended ? moment(date.end) : moment(date.start);

      const label = getLabel(ended);

      res
        .status(200)
        .json({ label: `Ezekiel ${label}`, timeAgo: date.from(currentTime) });
    });
};
