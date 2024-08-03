import React from "react";
import { Text } from "./..";

interface Props {
  className?: string;
  group4076?: string;
  stepcounter?: string;
}

export default function RegisterStepper({ group4076 = "1", stepcounter = "Step 1", ...props }: Props) {
  return (
    <div {...props}>
      <div className="flex flex-row justify-end items-center w-[89%] md:w-full ml-[9px] md:ml-0">
        <div className="flex flex-col items-center justify-start h-[24px] w-[24px]">
          <Text
            as="p"
            className="flex justify-center items-center h-[24px] w-[24px] tracking-[1.25px] uppercase bg-indigo-A700 text-center rounded-[50%]"
          >
            {group4076}
          </Text>
        </div>
        <div className="h-[2px] w-[66%] bg-blue_gray-100" />
      </div>
      <Text as="p" className="tracking-[0.25px] text-center !font-normal">
        {stepcounter}
      </Text>
    </div>
  );
}
