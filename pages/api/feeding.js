const moment = require("moment-timezone");
const { Client } = require("@notionhq/client");

// Initializing a client
const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

export default async (req, res) => {
  const databaseId = process.env.NOTION_DB_FEED_ID;

  const { type, feed, amount } = req.query;

  const currentTime = moment().tz("Europe/London").format();

  // Options - check feed, start feed (r, l, bf, bb), stop feed

  if (Number(feed)) {
    // start new feed
    const response = await notion.pages.create({
      parent: {
        database_id: databaseId,
      },
      properties: {
        Name: {
          title: [
            {
              text: {
                content: "Ezekiel is feeding",
              },
            },
          ],
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
        Active: {
          checkbox: true,
        },
      },
    });
  } else {
    // stop feed
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
        const previousState = previous.properties.Active.checkbox;
        const previousDate = previous.properties.Date;

        if (previousState) {
          const updatePrevious = await notion.pages.update({
            page_id: previous.id,
            properties: {
              Name: {
                title: [
                  {
                    text: {
                      content: `Ezekiel has fed`,
                    },
                  },
                ],
              },
              Date: {
                date: {
                  id: previousDate.date.id,
                  name: previousDate.date.name,
                  start: previousDate.date.start,
                  end: currentTime,
                },
              },
              Amount: {
                number: Number(amount) ? Number(amount) : 0,
              },
              Active: {
                checkbox: false,
              },
            },
          });
        }
      });
  }

  res.status(200);
};
