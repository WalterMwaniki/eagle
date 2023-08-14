import { Divider } from "@/components/Divider/Divider";
import styles from "./PageTitle.module.scss";
import classNames from "classnames";

export interface pageTitleProps {
  className?: string;
  heading: string;
  description: string;
  level: "h1" | "h2" | "h3";
}

export const PageTitle = ({
  className,
  heading,
  description,
  level,
}: pageTitleProps) => {
  return (
    <div className={classNames(styles.root, className)}>
      <div>
        <p
          className={classNames(
            level === "h1" && "headline-large",
            level === "h2" && "headline-medium",
            level === "h3" && "headline-small"
          )}
        >
          {heading}
        </p>
        <p
          className={classNames(
            level === "h1" && "body-large",
            level === "h2" && "body-medium",
            level === "h3" && "body-small"
          )}
        >
          {description}
        </p>
      </div>
      <Divider />
    </div>
  );
};
