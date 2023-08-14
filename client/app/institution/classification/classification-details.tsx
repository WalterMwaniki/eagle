"use client";

import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/Buttons/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/Select/Select";
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

import institutionData from "../../../data/data.json";

const ClassificaitonDetailsSchema = z.object({
  educationSystem: z.string(),
  educationLevels: z.array(z.object({ value: z.string() })),
  institutionCluster: z.string(),
  institutionGenderType: z.string(),
  institutionAccomodationType: z.string(),
});

type ClassificaitonDetailsValues = z.infer<typeof ClassificaitonDetailsSchema>;

const defaultValues: Partial<ClassificaitonDetailsValues> = {
  educationSystem: "",
  educationLevels: [],
  institutionCluster: "",
  institutionGenderType: "",
  institutionAccomodationType: "",
};

export function ClassificaitonDetailsForm() {
  const form = useForm<z.infer<typeof ClassificaitonDetailsSchema>>({
    resolver: zodResolver(ClassificaitonDetailsSchema),
    defaultValues,
    mode: "onChange",
  });

  function onSubmit(values: z.infer<typeof ClassificaitonDetailsSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        // className={styles.institutionForm}
      >
        <section>
          <div className={styles.column}>
            <FormField
              control={form.control}
              name="educationSystem"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Education System</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          className={styles.selectValue}
                          placeholder="Select the education system offered"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {institutionData.educationSystems.map(
                        (educationSystem) => (
                          <SelectItem
                            value={educationSystem.name}
                            key={educationSystem.abbreviation}
                          >
                            {educationSystem.name}
                          </SelectItem>
                        )
                      )}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="institutionGenderType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gender</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select the institution gender type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {institutionData.institutionGenderTypes.map(
                        (genderType) => (
                          <SelectItem value={genderType} key={genderType}>
                            {genderType}
                          </SelectItem>
                        )
                      )}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className={styles.column}>
            <FormField
              control={form.control}
              name="institutionAccomodationType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Accomodation</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select the institution accomodation type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {institutionData.institutionAccomodationTypes.map(
                        (accomodation) => (
                          <SelectItem value={accomodation} key={accomodation}>
                            {accomodation}
                          </SelectItem>
                        )
                      )}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </section>

        <Button type="submit">Save</Button>
      </form>
    </Form>
  );
}
