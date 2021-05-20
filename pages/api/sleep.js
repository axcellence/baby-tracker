const { Client } = require("@notionhq/client");

// Initializing a client
const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

export default async (req, res) => {
  const databaseId = process.env.NOTION_DB_SLEEP_ID;

  const { sleep } = req.query;

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
          start: new Date().toISOString(),
        },
      },
    },
  });

  res.status(200);
};
