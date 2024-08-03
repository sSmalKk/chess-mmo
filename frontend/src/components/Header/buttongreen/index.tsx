import React from "react";

const shapes = {
    square: "rounded-[0px]",
    circle: "rounded-[50%]",
    round: "rounded-[3px]",
  } as const;
  const variants = {
    outline: {
      deep_purple_900: "border-deep_purple-900 border-b border-solid text-deep_purple-900",
    },
    fill: {
      green_700: "bg-green-700 text-white-A700",
      blue_gray_900_19: "bg-blue_gray-900_19 text-white-A700",
      white_A700: "bg-white-A700",
    },
  } as const;
  const sizes = {
    xl: "h-[101px] px-[33px] text-xs",
    md: "h-[36px] px-[35px] text-xs",
    lg: "h-[38px] px-4 text-base",
    sm: "h-[36px] px-2.5",
    xs: "h-[24px] px-1",
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
  const Buttongreen: React.FC<React.PropsWithChildren<ButtonProps>> = ({
    children,
    className = "",
    leftIcon,
    rightIcon,
    shape = "",
    variant = "fill",
    size = "xs",
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
  
  export { Buttongreen };
  