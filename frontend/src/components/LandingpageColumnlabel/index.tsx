import React from "react";
import { Img, Text } from "./..";

interface Props {
  className?: string;
  label?: string;
  uenvelopealt?: string;
  inputtext?: string;
  fiinfoone?: string;
  lineoneone?: string;
}

export default function LandingpageColumnlabel({
  label = "Label",
  uenvelopealt,
  inputtext,
  fiinfoone,
  lineoneone,
  ...props
}: Props) {
  return (
    <div {...props}>
      <Text size="md" as="p" className="tracking-[0.50px] !font-inter">
        {label}
      </Text>
      <div className="flex flex-col items-center justify-start w-full pt-2 gap-2">
        <div className="flex flex-row justify-between w-full px-[5px]">
          <div className="flex flex-row justify-start items-center w-[29%] gap-[5px]">
            <div className="flex flex-col items-center justify-start h-[20px] w-[20px]">
              <div className="flex flex-col items-center justify-start h-[20px] w-[20px] p-[3px] bg-blue_gray-900_19 rounded-[50%]">
                {!!uenvelopealt ? <Img src={uenvelopealt} alt="uenvelopealt" className="h-[14px] w-[14px]" /> : null}
              </div>
            </div>
            {!!inputtext ? (
              <Text size="md" as="p" className="tracking-[0.50px] !font-inter">
                {inputtext}
              </Text>
            ) : null}
          </div>
          <div className="flex flex-col items-center justify-start h-[20px] w-[20px]">
            <div className="flex flex-col items-center justify-start h-[20px] w-[20px] p-[3px] bg-blue_gray-900_19 rounded-[50%]">
              {!!fiinfoone ? <Img src={fiinfoone} alt="fiinfo_one" className="h-[14px] w-[14px]" /> : null}
            </div>
          </div>
        </div>
        {!!lineoneone ? <div className="h-px w-full bg-white-A700" /> : null}
      </div>
    </div>
  );
}
