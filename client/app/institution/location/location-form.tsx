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

import styles from "../institution.module.scss";

const LocationSchema = z.object({
  institutionName: z.string().min(2).max(50),
  IUC: z.string().min(4).max(10),
  email: z.string().email(),
  phone: z.string().min(10).max(10),
  registrationDate: z.date(),
  tscCode: z.string(),
  knecCode: z.string(),
  kraPin: z.string(),
});

type LocationValues = z.infer<typeof LocationSchema>;

const defaultValues: Partial<LocationValues> = {
  institutionName: "",
  IUC: "",
  email: "",
  phone: "",
  registrationDate: new Date(),
  tscCode: "",
  knecCode: "",
  kraPin: "",
};

export function LocationForm() {
  const form = useForm<z.infer<typeof LocationSchema>>({
    resolver: zodResolver(LocationSchema),
    defaultValues,
    mode: "onChange",
  });

  function onSubmit(values: z.infer<typeof LocationSchema>) {
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
              name="institutionName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Institution Name</FormLabel>
                  <FormControl>
                    <Input placeholder="My Institution" {...field} />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />
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
          <div className={styles.column}>
            <FormField
              control={form.control}
              name="IUC"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>IUC</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tscCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>TSC Code</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="knecCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>KNEC Code</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="kraPin"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>KRA Pin</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </section>
        <div className={styles.pageFooter}>
          {/* <Button variant="danger" type="submit">
            Ignore
          </Button> */}
          <Button variant="outline" size="medium" type="submit">
            Update
          </Button>
        </div>
      </form>
    </Form>
  );
}
