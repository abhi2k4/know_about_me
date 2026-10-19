import { useEffect, useState } from "react";

const format = (date: Date, seconds: boolean) =>
  date.toLocaleTimeString("en-GB", {
    timeZone: "Asia/Kolkata",
    hour: "2-digit",
    minute: "2-digit",
    ...(seconds ? { second: "2-digit" } : {}),
  });

/** Live Mumbai clock. Isolated so the tick only re-renders this node. */
const LocalTime = ({ seconds = true, className }: { seconds?: boolean; className?: string }) => {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <time className={`tabular-nums ${className ?? ""}`} dateTime={now.toISOString()}>
      {format(now, seconds)}
    </time>
  );
};

export default LocalTime;
