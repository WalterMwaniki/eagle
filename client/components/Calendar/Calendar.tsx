"use client";

import styles from "./Calendar.module.scss";

import { format, set } from "date-fns";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import React, { use, useEffect, useState } from "react";
import useMeasure from "react-use-measure";
import { CalendarDays } from "./CalendarDays";
import { CalendarHeader } from "./CalendarHeader";
interface CalendarProps extends React.ComponentProps<"div"> {
  className?: string;
  selectedDay: Date | null;
  setSelectedDay: React.Dispatch<React.SetStateAction<Date | null>>;
  submitFunc: () => void;
}

export const Calendar = ({
  className,
  selectedDay,
  setSelectedDay,
  submitFunc,
}: CalendarProps) => {
  const [month, setMonth] = useState(new Date());
  const [direction, setDirection] = useState<1 | -1>(1);

  useEffect(() => {
    if (selectedDay) {
      setMonth(selectedDay);
      setDirection(month > selectedDay ? -1 : 1);
    }
  }, [selectedDay]);

  function reset() {
    setDirection((direction * -1) as 1 | -1);
    setMonth(new Date());
    setSelectedDay(null);
  }
  return (
    <MotionConfig transition={{ duration: 0.5 }}>
      <div className={styles.container}>
        <ResizablePanel>
          <AnimatePresence mode="popLayout" initial={false} custom={direction}>
            <motion.div
              key={format(month, "yyyy-MM")}
              initial="enter"
              animate="middle"
              exit="exit"
            >
              <motion.div exit={{ visibility: "hidden" }}>
                <CalendarHeader
                  month={month}
                  setMonth={setMonth}
                  setDirection={setDirection}
                />
              </motion.div>
              <CalendarDays
                month={month}
                direction={direction}
                selectedDay={selectedDay}
                setSelectedDay={setSelectedDay}
              />
            </motion.div>
          </AnimatePresence>
        </ResizablePanel>
        <div className={styles.submit}>
          <button onClick={reset}>Cancel</button>
          <button onClick={submitFunc}>OK</button>
        </div>
      </div>
    </MotionConfig>
  );
};

function ResizablePanel(props: React.ComponentProps<"div">) {
  let [ref, bounds] = useMeasure();

  return (
    <motion.div animate={{ height: bounds.height > 0 ? bounds.height : 0 }}>
      <div ref={ref}>{props.children}</div>
    </motion.div>
  );
}
