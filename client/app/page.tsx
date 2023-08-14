"use client";

import Link from "next/link";

import styles from "./app.module.scss";
import { Test } from "./test";
import { PageTitle } from "@/components/PageTitle/PageTitle";

export default function Home() {
  return (
    <div className={styles.main}>
      <PageTitle heading="Home" description="Welcome to NEMIS" level="h1" />
      <Test />
    </div>
  );
}
