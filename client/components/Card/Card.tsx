import classNames from "classnames";
import styles from "./card.module.scss";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  // Title?: typeof CardTitle;
  // Subtitle?: typeof CardSubtitle;
  // Content?: typeof CardContent;
  children?: React.ReactNode;
}

const Card = ({ className, children }: CardProps) => {
  return <div className={classNames(styles.root, className)}>{children}</div>;
};

export default Card;
