const moment = require("moment-timezone");
const { Client } = require("@notionhq/client");

// Initializing a client
const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

export default async (req, res) => {
  const databaseId = process.env.NOTION_DB_MEDICINE_ID;

  const { amount } = req.query;

  const currentTime = moment().tz("Europe/London").format();

  // Options - add medication 
  
  // add new medication 
    const response = await notion.pages.create({
      parent: {
        database_id: databaseId,
      },
      properties: {
        Name: {
          title: [
            {
              text: {
                content: "Ezekiel had medicin",
              },
            },
          ],
        },
        Date: {
          date: {
            start: currentTime,
          },
        },
        Amount: {
            rich_text: {
                plain_text: amount,
          },
        }
      },
    });

  res.status(200);
};
