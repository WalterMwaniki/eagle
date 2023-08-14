"use client";
import React, { useEffect, useState } from "react";

import styles from "./theme.module.scss";
import { useTheme } from "next-themes";
import { IconButton } from "@/components/Button/Button";
import {
  argbFromHex,
  themeFromSourceColor,
  applyTheme,
} from "@material/material-color-utilities";

interface ThemeToggleProps extends React.HTMLAttributes<HTMLElement> {
  className?: string;
}

export const ThemeToggle = ({ className, ...props }: ThemeToggleProps) => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className={styles.root}>
      <IconButton
        variant="ghost"
        icon={theme === "dark" ? "moon" : "sun"}
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      />
    </div>
  );
};

interface ThemePickerProps extends React.HTMLAttributes<HTMLElement> {
  theme: string | undefined;
  className?: string;
}
export const ThemePicker = ({
  className,
  theme,
  ...props
}: ThemePickerProps) => {
  /* Function to build a theme from a source color and apply it to the document */
  const themeBuilder = (color: string, dark: boolean) => {
    const mytheme = themeFromSourceColor(argbFromHex(color));
    const tones = [4, 6, 12, 16, 17, 22, 24, 87, 92, 94, 96, 98];
    if (typeof window !== "undefined") {
      applyTheme(mytheme, {
        target: document.documentElement,
        dark: dark,
        paletteTones: tones,
      });
    }
  };
  /* Function to update the theme */
  const updateTheme = (e: any) => {
    localStorage.setItem("primaryColor", e.target.value);
    setColor(e.target.value);
  };

  const [mounted, setMounted] = useState(false);
  const [color, setColor] = useState("");

  const defaultColor = "#006494";
  let primaryColor: string;

  useEffect(() => {
    const localColor = localStorage.getItem("primaryColor");
    if (localColor) {
      primaryColor = localColor;
    } else {
      localStorage.setItem("primaryColor", defaultColor);
      primaryColor = defaultColor;
    }
    setColor(primaryColor);
  }, []);

  useEffect(() => setMounted(true), []);

  if (!mounted) return <></>;

  if (theme === "light") {
    themeBuilder(color, false);
  } else if (theme === "dark") {
    themeBuilder(color, true);
  }
  return (
    <>
      <input
        className={styles.colorPicker}
        title="color-picker"
        placeholder="Pick a color"
        type="color"
        value={color}
        onChange={(e) => updateTheme(e)}
      />
      <label htmlFor="color-picker">{theme}</label>
    </>
  );
};
