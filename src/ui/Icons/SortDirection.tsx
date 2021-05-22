import React, { SVGProps } from "react";

type SortDirectionProps = Omit<SVGProps<SVGSVGElement>, "viewBox">;

export const SortDirection: React.FC<SortDirectionProps> = (props) => (
  <svg viewBox="0 0 386.257 386.257" {...props}>
    <path d="M0 96.879L193.129 289.379 386.257 96.879z" />
  </svg>
);
