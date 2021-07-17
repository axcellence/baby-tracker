const moment = require("moment-timezone");

const currentTime = moment().tz("Europe/London").format();

const Box = (props) => {
  const { name, type, start_date, end_date } = props;

  const emjoi =
    type === "wet"
      ? "💧"
      : type === "poopy"
      ? "💩"
      : type === "mixed"
      ? "💩💧"
      : type === "Asleep"
      ? "😴"
      : type === "Awake"
      ? "👶🏼"
      : type === "left boob"
      ? "🤱🏻"
      : type === "right boob"
      ? "🤱🏻"
      : type === "bottle"
      ? "🍼"
      : false;

  const ended = end_date ? true : false;
  const time = ended ? moment(end_date) : moment(start_date);

  console.log(time.from(currentTime));

  return (
    <div className="border-2 border-gray-600 rounded-lg py-4 px-6 text-gray-600 flex gap-4 text-lg font-semibold">
      {emjoi && <div>{emjoi}</div>}
      {name && <div>{name}</div>}
      {time && <div>{time.from(currentTime)}</div>}
    </div>
  );
};

export default Box;
