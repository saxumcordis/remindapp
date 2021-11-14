import React, { SVGProps } from "react";

type PriorityProps = Omit<SVGProps<SVGSVGElement>, "viewBox"> & {
  priority?: string;
};

export const Priority: React.FC<PriorityProps> = (props) => (
  <svg viewBox="0 0 382.982 382.982" {...props}>
    <path d="M191.491 118.328L257.336 87.897 191.49 0 125.645 87.896z" />
    <path d="M322.867 185.372L270.236 115.116 191.491 151.509 112.745 115.116 60.115 185.372 191.491 251.631z" />
    <path d="M336.252 213.24L191.491 286.249 46.73 213.24 1.491 273.629 191.49 382.982 381.491 273.629z" />
  </svg>
);
