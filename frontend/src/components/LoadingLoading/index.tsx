import React from "react";
import { Text, Img } from "./..";

interface Props {
  className?: string;
  heading?: string;
  description?: string;
}

export default function LoadingLoading({
  heading = "Heading",
  description = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&#39;s standard.",
  ...props
}: Props) {
  return (
    <div {...props}>
      <Img
        src="images/img_unsplash_vxhpxyqocfq_684x1320.png"
        alt="unsplash_one"
        className="justify-center h-[684px] w-full left-0 bottom-0 right-0 top-0 m-auto object-cover absolute rounded-[10px]"
      />
      <div className="flex flex-row justify-center w-full h-full md:h-auto left-0 bottom-0 right-0 top-0 p-[7px] m-auto bg-gradient absolute rounded-[10px]">
        <div className="flex flex-row justify-start w-[54%] mt-[629px] ml-2">
          <div className="flex flex-col items-center justify-start w-full">
            <div className="flex flex-row justify-between items-center w-full md:px-5 max-w-[666px]">
              <Text size="2xl" as="p" className="tracking-[0.15px]">
                {heading}
              </Text>
              <div className="flex w-[44px] h-[8px] md:h-auto" />
            </div>
            <Text size="md" as="p" className="!text-white-A700_99 tracking-[0.40px] opacity-0.7">
              {description}
            </Text>
          </div>
        </div>
      </div>
    </div>
  );
}
