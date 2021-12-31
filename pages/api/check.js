const moment = require("moment-timezone");
const { Client } = require("@notionhq/client");

// Initializing a client
const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

export default async (req, res) => {
  const feedId = process.env.NOTION_DB_FEED_ID;
  const sleepId = process.env.NOTION_DB_SLEEP_ID;
  const medicineId = process.env.NOTION_DB_MEDICINE_ID;

  const { type } = req.query;

  const currentTime = moment().tz("Europe/London").format();

  // Check type

  const databaseId =
    type === "feed"
      ? feedId
      : type === "sleep"
      ? sleepId
      : type === "medicine"
      ? medicineId
      : false;

  let getPreviousEntryId = async () => {
    const db = await notion.databases.query({
      database_id: databaseId,
    });
    return db.results[0].id;
  };

  let time;

  const getLabel = (ended, state = null) => {
    if (type === "feed") {
      if (!ended) {
        return "started feeding";
      }
      if (ended) {
        return "fed";
      }
      return "";
    }

    if (type === "sleep") {
      if (state === "Asleep" && !ended) {
        return "started sleeping";
      }
      if (state === "Awake" && !ended) {
        return "woke up";
      }
      return "";
    }

    if (type === "medicine") {
      return "medicated";
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
      let state = previous.properties?.State?.select.name;

      const ended = date.end ? true : false;
      date = ended ? moment(date.end) : moment(date.start);

      const label = getLabel(ended, state);

      res.status(200).json({
        label: `Ezekiel ${label}`,
        timeAgo: date.from(currentTime),
      });
    });
};
