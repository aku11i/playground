import React from "react";

export type MasonryProps = {
  children: React.ReactNode[];
  columnCount: number;
  gap?: number;
  columnGap?: number;
  rowGap?: number;
};

export const Masonry: React.FunctionComponent<MasonryProps> = ({
  children,
  columnCount,
  gap = 8,
  columnGap = gap,
  rowGap = gap,
}) => {
  return (
    <div style={{ columnCount, columnGap }}>
      {children.map((child, i) => (
        <>
          <div
            key={i}
            style={{
              display: "inline-block",
              marginBottom: rowGap,
              width: "100%",
            }}
          >
            {child}
          </div>

          {/*
           * Hack: Elements may be aligned vertically when the number of elements is
           *       equal to or less than the number of columns.
           * Set an empty div between each element to make the elements line up horizontally.
           */}
          <div style={{ width: 0, height: 0 }} aria-hidden="true" />
        </>
      ))}
    </div>
  );
};
