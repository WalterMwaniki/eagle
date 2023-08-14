import React from "react";
import styles from "./Button.module.scss";
import { Icon, Glyph } from "../Icon/Icon";
import classNames from "classnames";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  icon?: Glyph;
  text?: string;
  variant?: "primary" | "secondary" | "outlined" | "elevated" | "ghost";
}

interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    ButtonProps {
  icon: Glyph;
  size?: "small" | "medium";
  toggle?: boolean;
  selected?: boolean;
}

export const Button = ({
  className,
  icon,
  text,
  variant = "primary",
  onClick,
  ...props
}: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={classNames(
        styles.button,
        { [styles[variant]]: variant },
        className
      )}
      {...props}
    >
      {icon && <Icon size="small" glyph={icon} />}
      <span>{text ? text : props.children}</span>
    </button>
  );
};

export const IconButton = ({
  className,
  icon,
  size = "small",
  toggle = false,
  variant = "ghost",
  onClick,
  ...props
}: IconButtonProps) => {
  return (
    <button
      onClick={onClick}
      title={icon}
      className={classNames(
        styles.iconButton,
        { [styles[variant]]: variant },
        className
      )}
      {...props}
    >
      <Icon size={size} glyph={icon} />
    </button>
  );
};

export const FAButton = () => {
  return <div>FA Button</div>;
};
