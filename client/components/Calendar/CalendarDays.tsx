import {
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isSameDay,
  isSameMonth,
  isToday,
  startOfMonth,
  startOfWeek,
} from "date-fns";
import styles from "./Calendar.module.scss";
import { motion } from "framer-motion";
import classNames from "classnames";

interface CalendarDaysProps extends React.ComponentProps<"div"> {
  month: Date;
  direction: 1 | -1;
  selectedDay: Date | null;
  setSelectedDay: React.Dispatch<React.SetStateAction<Date | null>>;
}

export const CalendarDays = ({
  month,
  direction,
  selectedDay,
  setSelectedDay,
}: CalendarDaysProps) => {
  let days = eachDayOfInterval({
    start: startOfWeek(startOfMonth(month)),
    end: endOfWeek(endOfMonth(month)),
  });
  return (
    <div className={styles.selectDay}>
      <div className={styles.animateDaysFader} />
      <motion.div exit={{ visibility: "hidden" }} className={styles.weekDays}>
        <p>S</p>
        <p>M</p>
        <p>T</p>
        <p>W</p>
        <p>T</p>
        <p>F</p>
        <p>S</p>
      </motion.div>
      <motion.div
        variants={variants}
        custom={direction}
        className={styles.days}
      >
        {days.map((day) => (
          <CalendarDay
            key={format(day, "yyyy-MM-dd")}
            setSelectedDay={setSelectedDay}
            className={classNames(
              isToday(day) && styles.today,
              selectedDay && isSameDay(day, selectedDay) && styles.selected,
              !isSameMonth(day, month) && styles.differentMonth
            )}
            day={day}
          />
        ))}
      </motion.div>
    </div>
  );
};

interface CalendarDayProps extends React.ComponentProps<"button"> {
  day: Date;
  className?: string;
  setSelectedDay: React.Dispatch<React.SetStateAction<Date | null>>;
}

const CalendarDay = ({ day, className, setSelectedDay }: CalendarDayProps) => {
  return (
    <button
      onClick={() => setSelectedDay(day)}
      className={classNames(styles.day, className)}
    >
      {format(day, "d")}
    </button>
  );
};

let variants = {
  enter: (direction: 1 | -1) => {
    return { x: `${100 * direction}%` };
  },
  middle: { x: "0%" },
  exit: (direction: 1 | -1) => {
    return { x: `${-100 * direction}%` };
  },
};
