import classNames from "classnames";
import styles from "./Badge.module.scss";

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  text?: string;
  size: "small" | "medium" | "large";
  variant?: "attention" | "error" | "success" | "warning" | "info" | "ghost";
}

export const Badge = ({
  text,
  size,
  variant = "attention",
  className,
  ...props
}: BadgeProps) => {
  return (
    <div
      className={classNames(
        styles.root,
        { [styles[size]]: size },
        { [styles[variant]]: variant },
        className
      )}
    >
      <div>{text}</div>
    </div>
  );
};
