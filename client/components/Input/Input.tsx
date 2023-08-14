import React from "react";
import styles from "./Input.module.scss";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  label?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, type, ...props }, ref) => {
    return <input className={styles.input} type={type} ref={ref} {...props} />;
  }
);
Input.displayName = "Input";
