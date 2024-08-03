import React from "react";

const sizes = {
  xs: "text-[8px] font-hairline leading-[10px]",
  lg: "text-sm font-medium leading-[17px]",
  s: "text-[10px] font-normal leading-3",
  "2xl": "text-xl font-medium leading-6",
  "3xl": "text-[39px] font-normal leading-[46px]",
  "4xl": "text-5xl font-medium leading-[59px]",
  xl: "text-base font-normal leading-[19px]",
  md: "text-xs font-normal leading-[15px]",
};

export type TextProps = Partial<{
  className: string;
  as: any;
  size: keyof typeof sizes;
}> &
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>;

const Text: React.FC<React.PropsWithChildren<TextProps>> = ({
  children,
  className = "",
  as,
  size = "lg",
  ...restProps
}) => {
  const Component = as || "p";

  return (
    <Component className={`text-white-A700 font-roboto ${className} ${sizes[size]}`} {...restProps}>
      {children}
    </Component>
  );
};

export { Text };
