"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/Buttons/button";
import { Input } from "@/components/Input/TextField";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/Form/Form";

import styles from "../settings.module.scss";

const NotificationsSettingsSchema = z.object({
  email: z.string().email(),
  phone: z.string().min(10).max(10),
});

type NotificationSettings = z.infer<typeof NotificationsSettingsSchema>;

const defaultValues: Partial<NotificationSettings> = {
  email: "",
  phone: "",
};

export function NotificationsSettingsForm() {
  const form = useForm<z.infer<typeof NotificationsSettingsSchema>>({
    resolver: zodResolver(NotificationsSettingsSchema),
    defaultValues,
    mode: "onChange",
  });

  function onSubmit(values: z.infer<typeof NotificationsSettingsSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={styles.institutionForm}
      >
        <section className={styles.Location}>
          <div className={styles.column}>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="myemail@school.edu" {...field} />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input placeholder="0700 123 456" {...field} />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </section>
        <div className={styles.pageFooter}>
          <Button variant="outline" type="submit">
            Update
          </Button>
        </div>
      </form>
    </Form>
  );
}
