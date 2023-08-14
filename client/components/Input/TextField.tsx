import classNames from "classnames";
import { Icon, Glyph } from "../Icon/Icon";
import styles from "./Input.module.scss";
import React from "react";
import { motion } from "framer-motion";
import { IconButton } from "../Button/Button";

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

interface TextFieldProps extends InputProps {
  type?: "text" | "password" | "email" | "number";
  variant?: "filled" | "outlined";
  icon?: Glyph;
  iconPosition?: "left" | "right";
  trailingAction?: React.ReactNode;
  supportingText?: string;
}

export const TextField = React.forwardRef<HTMLInputElement, TextFieldProps>(
  (
    {
      className,
      type,
      label,
      icon,
      iconPosition = "left",
      supportingText,
      variant = "outlined",
      trailingAction,
      ...props
    },
    ref
  ) => {
    return (
      <div className={classNames(styles.root, className)}>
        {variant === "outlined" ? (
          <fieldset className={styles.outlined}>
            <legend className={styles.label}>{label}</legend>
            <div
              className={classNames(
                styles.inputContainer,
                iconPosition === "right" && styles.iconRight
              )}
            >
              {icon && (
                <Icon className={styles.icon} glyph={icon} size="small" />
              )}
              <input
                className={styles.input}
                type={type}
                placeholder={label}
                ref={ref}
                {...props}
              />
            </div>
            {trailingAction && trailingAction}
          </fieldset>
        ) : (
          <fieldset className={styles.filled}>
            <div
              className={classNames(
                styles.fieldsetContainer,
                iconPosition === "right" && styles.iconRight
              )}
            >
              {icon && (
                <Icon className={styles.icon} glyph={icon} size="small" />
              )}
              <div className={styles.inputAndLabel}>
                <label className={styles.label}>{label}</label>
                <input
                  className={styles.input}
                  type={type}
                  placeholder={label}
                  ref={ref}
                  {...props}
                />
              </div>
            </div>
          </fieldset>
        )}

        <p className={styles.supportingText}>{supportingText}</p>
      </div>
    );
  }
);
