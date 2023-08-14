"use client";

import React from "react";
import styles from "./Header.module.scss";
import { ThemeToggle } from "../Theme/Theme";
import { usePathname } from "next/navigation";

interface HeaderProps extends React.HTMLAttributes<HTMLElement> {
  className?: string;
  title: string;
}

export const Header = ({ title, className, ...props }: HeaderProps) => {
  const pathname = usePathname().slice(1);
  return (
    <header className={styles.header}>
      <span className={styles.title}>{title}</span>
      <ThemeToggle />
    </header>
  );
};
