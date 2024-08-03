import React from "react";

const shapes = {
  round: "rounded-[3px]",
  square: "rounded-[0px]",
} as const;
const variants = {
  underline: {
    blue_gray_900_19: "text-white-A700 border-b border-blue_gray-900_19 border-solid",
    blue_gray_900_19_11: "border-b border-blue_gray-900_19 border-solid",
    white_A700: "text-white-A700 border-b border-white-A700 border-solid",
  },
  fill: {
    blue_gray_900_19: "bg-blue_gray-900_19",
  },
} as const;
const sizes = {
  md: "h-[44px] pl-5 pr-[35px] text-xs",
  xs: "h-[36px] px-[13px] text-xs",
  sm: "h-[40px] text-sm",
} as const;

type InputProps = Omit<
  React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
  "size" | "prefix" | "type" | "onChange"
> &
  Partial<{
    className: string;
    name: string;
    placeholder: string;
    type: string;
    label: string;
    prefix: React.ReactNode;
    suffix: React.ReactNode;
    onChange: Function;
    shape: keyof typeof shapes;
    variant: keyof typeof variants;
    size: keyof typeof sizes;
    color: string;
  }>;
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className = "",
      name = "",  
      placeholder = "",
      type = "text",
      children,
      label = "",
      prefix,
      suffix,
      onChange,
      shape = "",
      variant = "fill",
      size = "sm",
      color = "blue_gray_900_19",
      ...restProps
    },
    ref,
  ) => {
    const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
      if (onChange) onChange(e?.target?.value);
    };

    return (
      <>
        <div
          className={`${className} flex items-center justify-center ${shapes[shape] || ""} ${variants[variant]?.[color as keyof (typeof variants)[typeof variant]] || variants[variant] || ""} ${sizes[size] || ""}`}
        >
          {!!label && label}
          {!!prefix && prefix}
          <input ref={ref} type={type} name={name} onChange={handleChange} placeholder={placeholder} {...restProps} />
          {!!suffix && suffix}
        </div>
      </>
    );
  },
);

export { Input };
