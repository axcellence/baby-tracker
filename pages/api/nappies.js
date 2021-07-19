const moment = require("moment-timezone");
const { Client } = require("@notionhq/client");

// Initializing a client
const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

export default async (req, res) => {
  const databaseId = process.env.NOTION_DB_NAPPY_ID;

  const { quantity, type } = req.query;

  const currentTime = moment().tz("Europe/London").format();

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

  res.status(200);
};
