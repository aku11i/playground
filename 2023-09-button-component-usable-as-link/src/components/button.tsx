import clsx from "clsx";
import { ComponentWithAs } from "../types/component";
import { forwardRef } from "../libs/forward-ref";

export type ButtonProps = {
  variant?: ButtonVariant;
};

const baseStyle = clsx`inline-block rounded-md p-4`;
const styles = {
  primary: clsx`bg-gray-900 text-white hover:bg-gray-800 active:bg-gray-700`,
  secondary: clsx(
    "bg-white hover:bg-gray-100 active:bg-gray-200 text-gray-900",
    "outline outline-1 outline-gray-900"
  ),
};

export type ButtonVariant = keyof typeof styles;

export const Button: ComponentWithAs<"button", ButtonProps> = forwardRef(
  (
    { as: Component = "button", variant = "primary", className, ...props },
    ref
  ) => {
    return (
      <Component
        ref={ref}
        {...props}
        className={clsx(baseStyle, styles[variant], className)}
      />
    );
  }
);
