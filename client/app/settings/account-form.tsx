"use client";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import validator from "validator";
import * as z from "zod";

import { Icon, Glyph } from "@/components/Icon/Icon";
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

import styles from "./settings.module.scss";

const AccountSchema = z.object({
  firstName: z.string().min(2).max(50),
  lastName: z.string().min(2).max(50),
  id: z.string().min(8).max(8).refine(validator.isNumeric),
  email: z.string().email(),
  phone: z.string().min(10).max(10),
});

type AccountValues = z.infer<typeof AccountSchema>;

const defaultValues: Partial<AccountValues> = {
  firstName: "Rahab",
  lastName: "Njeri",
  id: "12776413",
  email: "rahabnjeri35@gmail.com",
  phone: "0724908473",
};

export function AccountForm() {
  const form = useForm<z.infer<typeof AccountSchema>>({
    resolver: zodResolver(AccountSchema),
    defaultValues,
    mode: "onChange",
  });

  function onSubmit(values: z.infer<typeof AccountSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <section>
          <fieldset>
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John" {...field} />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Doe" {...field} />
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
                    <Controller
                      name="phone"
                      control={form.control}
                      render={({ field }) => (
                        <Input placeholder="0724908473" {...field} />
                      )}
                    />
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
              name="id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Id No.</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="00000000" {...field} />
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
