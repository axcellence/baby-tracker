const moment = require("moment-timezone");

const currentTime = moment().tz("Europe/London").format();

const Box = (props) => {
  const { name, type, start_date, end_date, duration } = props;
  const kind = type.toLowerCase();
  const emjoi =
    kind === "wet"
      ? "💧"
      : kind === "poopy"
      ? "💩"
      : kind === "mixed"
      ? "💩💧"
      : kind === "asleep"
      ? "😴"
      : kind === "awake"
      ? "👶🏼"
      : kind === "left boob"
      ? "🤱🏻"
      : kind === "right boob"
      ? "🤱🏻"
      : kind === "bottle"
      ? "🍼"
      : false;

  const ended = end_date ? true : false;
  const time = ended ? moment(end_date) : moment(start_date);

  return (
    <div className=" bg-white shadow-lg rounded-lg p-6 flex flex-col gap-2 text-lg font-semibold">
      {emjoi && <div>{emjoi}</div>}
      {name && (
        <h3 className="mt-2 text-xl text-gray-600 font-semibold">{name}</h3>
      )}
      {time && kind !== ("asleep" || "awake") && (
        <div className="text-lg text-gray-500">{time.from(currentTime)}</div>
      )}
      {duration && (
        <div className="mt-auto text-sm text-gray-400">
          <span className="mr-2">⏱</span> {duration}
        </div>
      )}
    </div>
  );
};

export default Box;
