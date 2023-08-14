import React from "react";
import styles from "./Divider.module.scss";
import classNames from "classnames";

interface DividerProps extends React.HTMLAttributes<HTMLElement> {
  className?: string;
}

export const Divider = ({ className, ...props }: DividerProps) => {
  return <div className={classNames(styles.root, className)}></div>;
};
