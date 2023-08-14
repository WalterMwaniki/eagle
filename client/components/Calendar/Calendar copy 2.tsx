"use client";

import styles from "./Calendar.module.scss";

import { format, startOfMonth } from "date-fns";
import { CaptionProps, DayPicker, useNavigation } from "react-day-picker";
// import { Select, SelectItem } from "@/components/Select/Select";
import { IconButton } from "../Button/Button";
import { Icon } from "../Icon/Icon";
import * as Select from "@radix-ui/react-select";
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@radix-ui/react-icons";
import classnames from "classnames";
import React, { useState } from "react";
import { de } from "date-fns/locale";
import { get } from "http";

type CalendarProps = React.ComponentProps<typeof DayPicker>;

export const Calendar = ({ className }: CalendarProps) => {
  return (
    <DayPicker
      className={styles.dayPicker}
      classNames={{
        months: styles.months,
        month: styles.month,
        caption: styles.caption,
        caption_label: styles.caption_label,
        nav: styles.nav,
        nav_button: styles.nav_button,
        nav_button_previous: styles.nav_button_prev,
        table: styles.table,
        head_row: styles.head_row,
        head_cell: styles.head_cell,
        row: styles.row,
        cell: styles.cell,
        day: styles.day,
        day_selected: styles.day_selected,
        day_today: styles.day_today,
        day_outside: styles.day_outside,
        day_disabled: styles.day_disabled,
        day_range_middle: styles.day_range_middle,
        day_hidden: styles.day_hidden,
      }}
      components={{
        Caption: CalendarCaption,
      }}
    />
  );
};

function getFirstDatesOfYear(year: number): Date[] {
  const months: Date[] = [];

  for (let month = 0; month < 12; month++) {
    const firstDateOfMonth = startOfMonth(new Date(year, month, 1));
    months.push(firstDateOfMonth);
  }

  return months;
}

const CalendarCaption = (props: CaptionProps) => {
  const { nextMonth, previousMonth, goToMonth, goToDate } = useNavigation();

  const Months = getFirstDatesOfYear(props.displayMonth.getFullYear());

  return (
    <div className={styles.caption}>
      <IconButton
        glyph="chevronLeft"
        disabled={!previousMonth}
        onClick={() => previousMonth && goToMonth(previousMonth)}
      />

      <Select.Root
        onValueChange={(value) => {
          if (value !== undefined) {
            goToMonth(new Date(value));
          }
        }}
      >
        <Select.Trigger aria-label="months">
          <Select.Value
            placeholder={format(
              Months.findIndex(
                (month) => month.getMonth() === props.displayMonth.getMonth()
              ),
              "MMM"
            )}
          />
          <Select.Icon>
            <ChevronDownIcon />
          </Select.Icon>
        </Select.Trigger>
        <Select.Portal>
          <Select.Content>
            <Select.Viewport>
              {Months.map((month, index) => (
                <SelectItem
                  key={month.getDate().toString()}
                  value={month.getDate().toString()}
                >
                  {format(month, "MMM")}
                </SelectItem>
              ))}
            </Select.Viewport>
          </Select.Content>
        </Select.Portal>
      </Select.Root>

      <IconButton
        glyph="chevronRight"
        disabled={!nextMonth}
        onClick={() => nextMonth && goToMonth(nextMonth)}
      />
      <h2>{format(props.displayMonth, "MMM yyy")}</h2>
      <select
        title="Month"
        onChange={(event) => goToMonth(Months[Number(event.target.value)])}
        value={Months.findIndex(
          (month) => month.getMonth() === props.displayMonth.getMonth()
        )}
      >
        {Months.map((month, index) => (
          <option key={month.getDate()} value={index}>
            {format(month, "MMM")}
          </option>
        ))}
      </select>
    </div>
  );
};

const SelectItem = React.forwardRef<
  React.ElementRef<typeof Select.Item>,
  React.ComponentPropsWithoutRef<typeof Select.Item>
>(({ className, children, ...props }, ref) => (
  <Select.Item ref={ref} className={styles.selectItem} {...props}>
    <Select.ItemText>{children}</Select.ItemText>
    <span>
      <Select.ItemIndicator>
        <CheckIcon className={styles.SelectIcon} />
      </Select.ItemIndicator>
    </span>
  </Select.Item>
));
SelectItem.displayName = Select.Item.displayName;
