import { Text } from "@vkontakte/vkui";

const months = [
  "января",
  "февраля",
  "марта",
  "апреля",
  "мая",
  "июня",
  "июля",
  "августа",
  "сентября",
  "октября",
  "ноября",
  "декабря",
];

const formatTime = (date: Date) => {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  return `${hours}:${minutes < 10 ? `0${minutes}` : minutes}`;
};

const isToday = (date: Date) => {
  const today = new Date();
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
};

const isYesterday = (date: Date) => {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return (
    date.getDate() === yesterday.getDate() &&
    date.getMonth() === yesterday.getMonth() &&
    date.getFullYear() === yesterday.getFullYear()
  );
};

export const CustomDate = (props: { date: Date, mode: "compact"|"default" }) => {
  const newDate = new Date(props.date);
  const day = newDate.getDate();
  const month = newDate.getMonth();
  const year = newDate.getFullYear();

  switch (props.mode) {
    case "compact":
      return <span>
        {day}.{month < 9 ? `0${month + 1}` : month + 1}.{year} в {formatTime(newDate)}
      </span>;

    default:
      if (isToday(newDate)) {
        return <span>сегодня в {formatTime(newDate)}</span>;
      } else if (isYesterday(newDate)) {
        return <span>вчера в {formatTime(newDate)}</span>;
      } else {
        return <span>{day} {months[month]} в {formatTime(newDate)}</span>;
      }
  }
};
