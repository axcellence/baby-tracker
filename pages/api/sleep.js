// import moment from "moment";
const moment = require("moment-timezone");
const { Client } = require("@notionhq/client");

// Initializing a client
const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

export default async (req, res) => {
  const databaseId = process.env.NOTION_DB_SLEEP_ID;

  const { sleep } = req.query;

  const currentTime = moment().tz("Europe/London").format();

  // Get previous entry
  let getPreviousEntryId = async (req, res) => {
    const db = await notion.databases.query({
      database_id: databaseId,
    });
    return db.results[0].id;
  };

  getPreviousEntryId()
    .then(async (id) => {
      // Get previous entry
      const previous = await notion.pages.retrieve({
        page_id: id,
      });
      return previous;
    })
    .then(async (previous) => {
      // Update previous entry
      const previousState = previous.properties.State.select.name;
      const previousDate = previous.properties.Date;

      const updatePrevious = await notion.pages.update({
        page_id: previous.id,
        properties: {
          Date: {
            date: {
              id: previousDate.date.id,
              name: previousDate.date.name,
              start: previousDate.date.start,
              end: currentTime,
            },
          },
        },
      });
    })
    .then(async () => {
      // Set new entry
      const response = await notion.pages.create({
        parent: {
          database_id: databaseId,
        },
        properties: {
          Name: {
            title: [
              {
                text: {
                  content: `Ezekiel is ${Number(sleep) ? "Asleep" : "Awake"}`,
                },
              },
            ],
          },
          State: {
            select: {
              name: `${Number(sleep) ? "Asleep" : "Awake"}`,
            },
          },
          Date: {
            date: {
              start: currentTime,
            },
          },
        },
      });
    });

  res.status(200);
};
