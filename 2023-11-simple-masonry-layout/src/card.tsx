import React, { PropsWithChildren } from "react";

export type CardProps = PropsWithChildren<{
  height: "short" | "middle" | "tall";
}>;

export const Card: React.FunctionComponent<CardProps> = ({
  children,
  height: _height,
}) => {
  const height = {
    short: 100,
    middle: 200,
    tall: 300,
  }[_height];

  const backgroundColor = {
    short: "lightblue",
    middle: "lightgreen",
    tall: "lightpink",
  }[_height];

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: 24,
        fontWeight: "bold",

        borderRadius: 8,
        borderWidth: 1,
        borderColor: "slategray",

        height,
        backgroundColor,
      }}
    >
      {children}
    </div>
  );
};
