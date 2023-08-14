"use client";

import styles from "./Calendar.module.scss";

import * as Dropdown from "@radix-ui/react-dropdown-menu";
import {
  addMonths,
  addYears,
  eachMonthOfInterval,
  eachYearOfInterval,
  endOfYear,
  format,
  isSameMonth,
  set,
  startOfMonth,
  startOfYear,
  subMonths,
  subYears,
} from "date-fns";
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { IconButton } from "../Button/Button";
import { Icon } from "../Icon/Icon";

interface CalendarHeaderProps extends React.ComponentProps<"header"> {
  month: Date;
  setMonth: React.Dispatch<React.SetStateAction<Date>>;
  setDirection: React.Dispatch<React.SetStateAction<1 | -1>>;
}

export const CalendarHeader = ({
  month,
  setMonth,
  setDirection,
}: CalendarHeaderProps) => {
  function nextMonth() {
    let next = addMonths(month, 1);
    setMonth(startOfMonth(next));
    setDirection(1);
  }

  function previousMonth() {
    let previous = subMonths(month, 1);
    setMonth(startOfMonth(previous));
    setDirection(-1);
  }

  function nextYear() {
    let next = addMonths(month, 12);
    setMonth(startOfMonth(next));
    setDirection(1);
  }

  function previousYear() {
    let previous = subMonths(month, 12);
    setMonth(startOfMonth(previous));
    setDirection(-1);
  }

  return (
    <header className={styles.header}>
      <div className={styles.monthPicker}>
        <IconButton icon="chevronLeft" onClick={previousMonth} />
        <MonthPicker
          selectedMonth={month}
          setMonth={setMonth}
          setDirection={setDirection}
          key="monthPicker"
        />
        <IconButton icon="chevronRight" onClick={nextMonth} />
      </div>
      <div className={styles.yearPicker}>
        <IconButton icon="chevronLeft" onClick={previousYear} />
        <YearPicker
          selectedMonth={month}
          setMonth={setMonth}
          setDirection={setDirection}
          key="yearPicker"
        />
        <IconButton icon="chevronRight" onClick={nextYear} />
      </div>
    </header>
  );
};

interface DropdownPickerProps extends React.ComponentProps<"div"> {
  selectedMonth: Date;
  setMonth: React.Dispatch<React.SetStateAction<Date>>;
  setDirection: React.Dispatch<React.SetStateAction<1 | -1>>;
  formating: string;
  months: Date[];
  alignment: "start" | "end";
}
const DropdownPicker = ({
  selectedMonth,
  setMonth,
  setDirection,
  formating,
  months,
  alignment,
}: DropdownPickerProps) => {
  const [open, setOpen] = useState(false);
  const [selectedRef, setSelectedRef] = useState<HTMLElement | null>(null);
  useEffect(() => {
    let timeoutId: NodeJS.Timeout | null = null;

    if (selectedRef) {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      timeoutId = setTimeout(() => {
        selectedRef.scrollIntoView({ behavior: "instant", block: "start" });
      }, 100);
    }
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [selectedRef]);
  const handleSelect = (month: Date) => () => {
    setMonth(month);
    setDirection(month > selectedMonth ? 1 : -1);
    setOpen(false);
  };

  return (
    <Dropdown.Root open={open} onOpenChange={setOpen}>
      <Dropdown.Trigger className={styles.DropdownTrigger}>
        <p>{format(selectedMonth, formating)}</p>
        <Icon glyph="chevronDown" size="small" />
      </Dropdown.Trigger>
      <AnimatePresence>
        {open && (
          <Dropdown.Portal forceMount>
            <Dropdown.Content
              sideOffset={10}
              alignOffset={-48}
              align={alignment}
              avoidCollisions={false}
              className={styles.DropdownContent}
              asChild
            >
              <motion.div
                key={months.length}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "285px" }}
                exit={{ opacity: 0, height: 0 }}
              >
                {months.map((month) => (
                  <Dropdown.Item
                    onSelect={handleSelect(month)}
                    className={styles.DropdownItem}
                    ref={
                      isSameMonth(month, selectedMonth) ? setSelectedRef : null
                    }
                  >
                    <div className={styles.DropdownIndicator}>
                      {isSameMonth(month, selectedMonth) && (
                        <Icon glyph="check" size="small" />
                      )}
                    </div>
                    <p>{format(month, formating)}</p>
                  </Dropdown.Item>
                ))}
              </motion.div>
            </Dropdown.Content>
          </Dropdown.Portal>
        )}
      </AnimatePresence>
    </Dropdown.Root>
  );
};

interface MonthPickerProps extends React.ComponentProps<"div"> {
  selectedMonth: Date;
  setMonth: React.Dispatch<React.SetStateAction<Date>>;
  setDirection: React.Dispatch<React.SetStateAction<1 | -1>>;
}

const MonthPicker = ({
  selectedMonth,
  setMonth,
  setDirection,
}: MonthPickerProps) => {
  let months = eachMonthOfInterval({
    start: startOfYear(selectedMonth),
    end: endOfYear(selectedMonth),
  });

  return (
    <DropdownPicker
      selectedMonth={selectedMonth}
      setMonth={setMonth}
      setDirection={setDirection}
      formating="MMM"
      months={months}
      alignment="start"
    />
  );
};

interface YearPickerProps extends React.ComponentProps<"div"> {
  selectedMonth: Date;
  setMonth: React.Dispatch<React.SetStateAction<Date>>;
  setDirection: React.Dispatch<React.SetStateAction<1 | -1>>;
}

const YearPicker = ({
  selectedMonth,
  setMonth,
  setDirection,
}: YearPickerProps) => {
  let years = eachYearOfInterval({
    start: subYears(selectedMonth, 100),
    end: addYears(selectedMonth, 100),
  });

  years.forEach((year) => {
    year.setMonth(selectedMonth.getMonth());
  });

  return (
    <DropdownPicker
      selectedMonth={selectedMonth}
      setMonth={setMonth}
      setDirection={setDirection}
      formating="yyyy"
      months={years}
      alignment="end"
    />
  );
};
