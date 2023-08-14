"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/Button/Button";
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

import styles from "./institution.module.scss";

const RegistrationDetailsSchema = z.object({
  institutionName: z.string().min(2).max(50),
  IUC: z.string().min(4).max(10),
  email: z.string().email(),
  phone: z.string().min(10).max(10),
  registrationDate: z.date(),
  tscCode: z.string(),
  knecCode: z.string(),
  kraPin: z.string(),
});

type RegistrationDetailsValues = z.infer<typeof RegistrationDetailsSchema>;

const defaultValues: Partial<RegistrationDetailsValues> = {
  institutionName: "",
  IUC: "",
  email: "",
  phone: "",
  registrationDate: new Date(),
  tscCode: "",
  knecCode: "",
  kraPin: "",
};

export function RegistrationDetailsForm() {
  const form = useForm<z.infer<typeof RegistrationDetailsSchema>>({
    resolver: zodResolver(RegistrationDetailsSchema),
    defaultValues,
    mode: "onChange",
  });

  function onSubmit(values: z.infer<typeof RegistrationDetailsSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={styles.institutionForm}
      >
        <section>
          <fieldset>
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
          </fieldset>
          <fieldset>
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
          </fieldset>
          <fieldset>
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
          </fieldset>
          <fieldset>
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
          </fieldset>
        </section>
        <Button type="submit">Update</Button>
      </form>
    </Form>
  );
}
