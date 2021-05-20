const { Client } = require("@notionhq/client");

// Initializing a client
const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

export default async (req, res) => {
  const databaseId = process.env.NOTION_DB_ID;

  const { quantity } = req.query;

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
          start: new Date().toISOString(),
        },
      },
    },
  });

  res.status(200);
};