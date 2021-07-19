import { Client } from "@notionhq/client";

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

export const feedDbId = process.env.NOTION_DB_FEED_ID;
export const sleepDbId = process.env.NOTION_DB_SLEEP_ID;
export const nappyDbId = process.env.NOTION_DB_NAPPY_ID;

export const getDatabase = async (databaseId, params) => {
  const response = await notion.databases.query({
    database_id: databaseId,
    ...params,
  });

  return formatPage(response.results[0]);
};

export const getPage = async (pageId) => {
  const response = await notion.pages.retrieve({ page_id: pageId });
  return response;
};

export const getBlocks = async (blockId) => {
  const response = await notion.blocks.children.list({
    block_id: blockId,
    page_size: 50,
  });
  return response.results;
};

const getLastBlockId = async ({ blockId }) => {
  const response = await notion.blocks.children.list({
    block_id: blockId,
    page_size: 50,
  });
  return response.results[0].id;
};

const formatPage = (page) => {
  return {
    id: page.id,
    name: page.properties.Name.title[0].plain_text,
    start_date: page.properties.Date.date.start,
    end_date: page.properties.Date.date.end,
    type:
      page.properties?.Type?.select.name ||
      page.properties?.State?.select.name ||
      false,
    duration: page.properties?.Duration?.formula.string || false,
  };
};
