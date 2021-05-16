const Airtable = require("airtable");

const { AIRTABLE_API_KEY } = process.env;
const { AIRTABLE_BASE_ID } = process.env;

const at_base = new Airtable({
  apiKey: AIRTABLE_API_KEY,
}).base(AIRTABLE_BASE_ID);
const at_table_nappies = at_base("Nappy Log");

export default async (req, res) => {
  at_base("Nappy Log").create(
    [
      {
        fields: {
          Name: "Nappy used",
          Count: -1,
          Date: new Date().toISOString(),
          "Nappy Total": ["rechjEiE9p5YIaJFd"],
        },
      },
    ],
    function (err, records) {
      if (err) {
        console.error(err);
        return;
      }
      records.forEach(function (record) {
        console.log(record.getId());
      });
    }
  );
  res.status(200).json({ result: "nappy used" });
};
