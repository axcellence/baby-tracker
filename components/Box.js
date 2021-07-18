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
    <div className=" bg-white shadow-lg rounded-lg p-6 flex flex-col gap-2 text-lg font-semibold">
      {emjoi && <div>{emjoi}</div>}
      {name && (
        <h3 className="mt-2 text-xl text-gray-600 font-semibold">{name}</h3>
      )}
      {time && (
        <div className="text-lg text-gray-500">{time.from(currentTime)}</div>
      )}
    </div>
  );
};

export default Box;
