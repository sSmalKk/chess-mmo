import React from "react";

const shapes = {
  square: "rounded-[0px]",
  round: "rounded-[3px]",
  circle: "rounded-[50%]",
} as const;
const variants = {
  outline: {
    deep_purple_900: "border-deep_purple-900 border-b border-solid text-deep_purple-900",
  },
  fill: {
    white_A700: "bg-white-A700",
    blue_800: "bg-blue-800",
    blue_gray_900_19: "bg-blue_gray-900_19 text-white-A700",
    black_900_60: "bg-black-900_60 text-white-A700",
    blue_A700: "bg-blue-A700 text-white-A700",
    green_700: "bg-green-700 text-white-A700",
  },
} as const;
const sizes = {
//  xs: "h-[32px] px-[15px] text-xs",
 // sm: "h-[64px] w-[64px] px-2.5",
  "6xl": "h-[104px] px-[35px] text-base",
  "2xl": "h-[32px] pl-[7px] pr-px text-[10px]",
  "5xl": "h-[38px] px-4 text-base",
  sm: "h-[20px] text-base",
  xl: "h-[32px] px-[7px]",
  xs: "h-[17px] text-[10px]",
  "4xl": "h-[36px] px-[35px] text-xs",
  lg: "h-[24px] text-base",
  "3xl": "h-[36px] px-2.5",
  md: "h-[24px] px-1",
} as const;

type ButtonProps = Omit<
  React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>,
  "onClick"
> &
  Partial<{
    className: string;
    leftIcon: React.ReactNode;
    rightIcon: React.ReactNode;
    onClick: () => void;
    shape: keyof typeof shapes;
    variant: keyof typeof variants;
    size: keyof typeof sizes;
    color: string;
  }>;
const Button: React.FC<React.PropsWithChildren<ButtonProps>> = ({
  children,
  className = "",
  leftIcon,
  rightIcon,
  shape = "",
  variant = "fill",
  size = "md",
  color = "white_A700",
  ...restProps
}) => {
  return (
    <button
      className={`${className} flex items-center justify-center text-center cursor-pointer ${(shape && shapes[shape]) || ""} ${(size && sizes[size]) || ""} ${(variant && variants[variant]?.[color as keyof (typeof variants)[typeof variant]]) || ""}`}
      {...restProps}
    >
      {!!leftIcon && leftIcon}
      {children}
      {!!rightIcon && rightIcon}
    </button>
  );
};

export { Button };
