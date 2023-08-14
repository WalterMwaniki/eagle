"use client";

import styles from "./Test.module.scss";

import { Button, IconButton } from "@/components/Button/Button";
import { Calendar } from "@/components/Calendar/Calendar";
import { TextField } from "@/components/Input/TextField";
import { format } from "date-fns";
import { useState } from "react";
import jsonData from "../data/data.json";
import { DatePicker } from "@/components/Input/DatePicker";

export function Test() {
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);
  return (
    <div className={styles.root}>
      <section>
        <h1>Inputs</h1>
        {/* <fieldset>
          <Input
            type="text"
            placeholder="Enter your first name"
            label="First Name"
          />
          <Input
            type="text"
            placeholder="Enter your last name"
            label="Last Name"
          />
        </fieldset> */}
        <fieldset>
          <TextField type="text" required label="First Name" icon="person" />
          <TextField
            type="text"
            label="Last Name"
            supportingText="last name is your handle"
          />
        </fieldset>
        <fieldset>
          <TextField type="text" variant="filled" label="First Name" />
          <TextField
            type="text"
            variant="filled"
            label="Last Name"
            icon="person"
            supportingText="last name is your handle"
          />
        </fieldset>
        <fieldset>
          <TextField
            required
            type="email"
            variant="outlined"
            label="Email"
            icon="email"
            iconPosition="right"
          />
          <TextField required type="email" variant="filled" label="Email" />
        </fieldset>
      </section>
      <section>
        <h1>Calendar</h1>
        <DatePicker />
        {/* <Calendar
          selectedDay={selectedDay}
          setSelectedDay={setSelectedDay}
          submitFunc={() =>
            console.log(selectedDay && format(selectedDay, "MMM-dd-yyyy"))
          }
        /> */}
      </section>
      <section>
        <h1>Buttons</h1>
        <Button variant="primary">Join Us</Button>
        <Button variant="secondary" icon="download">
          Download
        </Button>
        <Button variant="outlined" icon="send">
          Send Message
        </Button>
        <Button variant="elevated" icon="add">
          Add Friends
        </Button>
        <Button variant="ghost" text="Delete all" />
        <IconButton variant="primary" icon="settings" />
        <IconButton variant="secondary" icon="download" />
        <Button
          variant="outlined"
          onClick={() => console.log(jsonData.educationSystems)}
        >
          Json Data
        </Button>
      </section>
    </div>
  );
}
