import clsx from "clsx";
import { ComponentWithAs } from "../types/component";
import { forwardRef } from "../libs/forward-ref";

const styles = {
  body: clsx`text-gray-900 text-base`,
  link: clsx(
    "text-gray-900 hover:text-gray-600",
    "underline underline-offset-2"
  ),
};

export type TextVariant = keyof typeof styles;

export type TextProps = {
  variant?: TextVariant;
};

export const Text: ComponentWithAs<"p", TextProps> = forwardRef(
  ({ as: Component = "p", variant = "body", className, ...props }, ref) => {
    return (
      <Component
        ref={ref}
        {...props}
        className={clsx(styles[variant], className)}
      />
    );
  }
);
