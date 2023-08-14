import classNames from "classnames";
import styles from "./logo.module.scss";
import { Icon } from "@/components/Icon/Icon";

interface LogoProps extends React.HTMLAttributes<HTMLElement> {
  className?: string;
}
export default function Logo({ className, ...props }: LogoProps) {
  return (
    <div className={classNames(styles.root, className)}>
      {/* <img src="/nemis1.svg" alt="NEMIS Logo" /> */}
      <Icon glyph="logo" size="large" />
      <h1>Nemis</h1>
    </div>
  );
}
