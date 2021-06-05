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

  getPreviousEntryId()
    .then(async (id) => {
      const previous = await notion.pages.retrieve({
        page_id: id,
      });
      return previous;
    })
    .then(async (previous) => {
      let { date } = previous.properties.Date;
      date = moment(date.end);

      // time = date.from(currentTime);

      res.status(200).json({ time: date.from(currentTime) });
    });
  /*
  const response = await notion.pages.create({
    parent: {
      database_id: databaseId,
    },
    properties: {
      Name: {
        title: [
          {
            text: {
              content: "Nappy used",
            },
          },
        ],
      },
      Amount: {
        number: Number(quantity),
      },
      Date: {
        date: {
          start: currentTime,
        },
      },
      Type: {
        select: {
          name: type,
        },
      },
    },
  });
*/
};
