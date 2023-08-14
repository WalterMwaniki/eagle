"use client";

import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import classNames from "classnames";
import { cva, VariantProps } from "class-variance-authority";

import styles from "./label.module.scss";

const labelVariants = cva(styles.root, {
  variants: {
    size: {
      sm: styles.label_sm,
      md: styles.label_md,
      lg: styles.label_lg,
    },
  },
  defaultVariants: {
    size: "md",
  },
});

interface LabelProps
  extends React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>,
    VariantProps<typeof labelVariants> {}

const Label: React.FC<LabelProps> = ({ className, size, ...props }) => (
  <LabelPrimitive.Root
    className={labelVariants({ size, className })}
    {...props}
  />
);

/*
const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
>(({ className, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={labelVariants({ size, className })}
    {...props}
  />
));
*/
Label.displayName = LabelPrimitive.Root.displayName;

export { Label };
