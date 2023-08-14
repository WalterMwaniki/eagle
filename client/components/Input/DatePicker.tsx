"use client";

import styles from "../Calendar/Calendar.module.scss";

import { TextField } from "./TextField";
import { Calendar } from "../Calendar/Calendar";
import * as Popover from "@radix-ui/react-popover";
import { IconButton } from "../Button/Button";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { format, isValid, parse } from "date-fns";
import { Icon } from "../Icon/Icon";

export const DatePicker = () => {
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);
  const [inputDate, setInputDate] = useState<string>("");

  useEffect(() => {
    if (selectedDay) {
      setInputDate(format(selectedDay, "MM/dd/yyyy"));
    } else {
      setInputDate("");
    }
  }, [selectedDay]);

  function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    const inputDateStr = e.target.value;
    setInputDate(inputDateStr);

    const validDateFormatRegex =
      /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/\d{4}$/;

    if (validDateFormatRegex.test(inputDateStr)) {
      const parsedDate = parse(inputDateStr, "MM/dd/yyyy", new Date(), {
        useAdditionalWeekYearTokens: true,
        useAdditionalDayOfYearTokens: true,
      });

      if (isValid(parsedDate)) {
        setSelectedDay(parsedDate);
      }
    }
  }

  return (
    <div>
      <TextField
        onChange={handleOnChange}
        value={inputDate}
        className={styles.datePickerInput}
        label="Date"
        placeholder="Select a date"
        trailingAction={
          <CalendarPopover
            selectedDay={selectedDay}
            setSelectedDay={setSelectedDay}
          />
        }
      />
    </div>
  );
};

interface CalendarPopoverProps {
  selectedDay: Date | null;
  setSelectedDay: React.Dispatch<React.SetStateAction<Date | null>>;
}
const CalendarPopover = ({
  selectedDay,
  setSelectedDay,
}: CalendarPopoverProps) => {
  const [open, setOpen] = useState(false);
  const submitDate = () => {
    setOpen(false);
  };
  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger>
        <Icon glyph="calendar" size="medium" />
      </Popover.Trigger>
      <AnimatePresence>
        {open && (
          <Popover.Portal forceMount>
            <Popover.Content
              align="end"
              alignOffset={-10}
              sideOffset={20}
              avoidCollisions={false}
              asChild
            >
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "285px" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ height: { type: "spring", duration: 2 } }}
              >
                <Calendar
                  selectedDay={selectedDay}
                  setSelectedDay={setSelectedDay}
                  submitFunc={submitDate}
                />
              </motion.div>
            </Popover.Content>
          </Popover.Portal>
        )}
      </AnimatePresence>
    </Popover.Root>
  );
};
