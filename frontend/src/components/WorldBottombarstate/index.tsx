import React from "react";
import { Text, Img } from "./..";

interface Props {
  className?: string;
  lefthandone?: string;
}

export default function WorldBottombarstate({ lefthandone = "left hand", ...props }: Props) {
  return (
    <div {...props}>
      <div className="flex flex-col items-center justify-start h-[32px] w-[32px] p-[7px] bg-blue_gray-900_19 rounded-[50%]">
        <Img src="images/img_119_instance.svg" alt="imagetwo_one" className="h-[17px] w-[17px]" />
      </div>
      <Text size="s" as="p" className="mt-[9px] tracking-[1.50px] uppercase !font-medium">
        {lefthandone}
      </Text>
    </div>
  );
}
