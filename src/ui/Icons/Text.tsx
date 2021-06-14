import React, { SVGProps } from "react";

type TextProps = Omit<SVGProps<SVGSVGElement>, "viewBox">;

export const Text: React.FC<TextProps> = (props) => (
  <svg viewBox="0 0 512.18 512.18" {...props}>
    <path d="M448.18 80h-320c-17.673 0-32 14.327-32 32s14.327 32 32 32h320c17.673 0 32-14.327 32-32s-14.327-32-32-32zM480.18 224h-352c-17.673 0-32 14.327-32 32s14.327 32 32 32h352c17.673 0 32-14.327 32-32s-14.327-32-32-32zM336.18 368h-208c-17.673 0-32 14.327-32 32 0 17.673 14.327 32 32 32h208c17.673 0 32-14.327 32-32 0-17.673-14.327-32-32-32z" />
  </svg>
);
