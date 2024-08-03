import React from "react";
import { Text, Img } from "..";
import Lifebar from "components/Lifebar";

interface Props {
  className?: string;
  heading?: string;
  text?: React.ReactNode | string;
  Status?: string;
  life:number;
}

export default function Perfil({
  heading = "Name",
  text = (
    <>
      lorem
      <br />
      epsum{" "}
    </>

  ),
  Status = "Online",

  ...props
}: Props) {
  return (
    <div {...props}>
         <div className="flex flex-row justify-center w-full md:px-5 max-w-[390px]">
          <div className="flex flex-row justify-between items-center w-full">
            <div className="flex flex-col items-start justify-start w-[28%] gap-px">
              <div className="flex flex-row justify-start w-full">
                <div className="flex flex-col items-start justify-start w-[80%] gap-px py-[3px]">
                  <Text size="xl" as="p" className="tracking-[0.15px]">
                  {heading}
                  </Text>
                  <Text as="p" className="mb-[13px] !text-gray-300 tracking-[0.25px] !font-normal !leading-5">
                    <>
                      Lorem ipsum
                      <br />
                      dolor sit{" "}
                    </>
                  </Text>
                </div>
              </div>
              <Text as="p" className="tracking-[0.10px] !font-robotoflex">
              {text}
              </Text>
            </div>
            <div className="h-[102px] w-[31%] relative">
              <Img
                src="images/img_10_rectangle.png"
                alt="image"
                className="justify-center h-[102px] w-full sm:w-full left-0 bottom-0 right-0 top-0 m-auto object-cover absolute rounded-[14px]"
              />
              <div className="flex flex-col items-end justify-start w-[37%] h-max gap-[66px] right-0 bottom-0 top-0 m-auto absolute">
                <div className="flex flex-row justify-end w-full">
                  <Text size="md" as="p" className="!text-gray-300 tracking-[0.40px] text-right">
                  {Status}                  </Text>
                </div>
                <Text size="md" as="p" className="!text-black-900_99 tracking-[0.50px] !font-robotoflex !font-medium">
                <Lifebar percentage={0} />
                </Text>
              </div>
            </div>
          </div>
        </div>
        <div className="h-[4px] w-full bg-indigo-A700_19 relative rounded-sm">
          <div style={{ width: "43%" }} className="h-full bg-blue-A700 absolute rounded-sm" />
        </div>
     </div>
  );
}
