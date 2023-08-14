import React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@radix-ui/react-icons";
import classnames from "classnames";

interface SelectProps {
  children: React.ReactNode;
  className?: string;
}

export const Select = React.forwardRef<HTMLDivElement, SelectProps>(
  ({ children, className, ...props }, forwardedRef) => {
    return (
      <SelectPrimitive.Root {...props}>
        <SelectPrimitive.Trigger
          ref={forwardedRef as React.RefObject<HTMLButtonElement>}
          className={classnames("your-default-trigger-class", className)}
        >
          <SelectPrimitive.Value />
          <SelectPrimitive.Icon>
            <ChevronDownIcon />
          </SelectPrimitive.Icon>
        </SelectPrimitive.Trigger>
        <SelectPrimitive.Portal>
          <SelectPrimitive.Content>
            <SelectPrimitive.ScrollUpButton>
              <ChevronUpIcon />
            </SelectPrimitive.ScrollUpButton>
            <SelectPrimitive.Viewport>{children}</SelectPrimitive.Viewport>
            <SelectPrimitive.ScrollDownButton>
              <ChevronDownIcon />
            </SelectPrimitive.ScrollDownButton>
          </SelectPrimitive.Content>
        </SelectPrimitive.Portal>
      </SelectPrimitive.Root>
    );
  }
);

interface SelectItemProps {
  children: React.ReactNode;
  className?: string;
}

export const SelectItem = React.forwardRef<HTMLButtonElement, SelectItemProps>(
  ({ children, className, ...props }, forwardedRef) => {
    return (
      <SelectPrimitive.Item
        value={children as string}
        {...props}
        ref={forwardedRef as React.Ref<HTMLDivElement>}
        className={classnames("your-default-item-class", className)}
      >
        <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
        <SelectPrimitive.ItemIndicator>
          <CheckIcon />
        </SelectPrimitive.ItemIndicator>
      </SelectPrimitive.Item>
    );
  }
);
