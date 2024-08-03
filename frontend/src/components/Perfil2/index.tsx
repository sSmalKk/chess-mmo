import React from "react";
import { Text, Img } from "./..";

interface Props {
  className?: string;
  duration?: string;
  heading?: string;
  loremipsum?: string;
  g?: string;
  caption?: string;
}

export default function HomeListtile({
  duration,
  heading = "heading",
  loremipsum = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do ",
  g,
  caption = "Caption",
  ...props
}: Props) {
  return (
    <div {...props}>
      {!!duration ? (
        <Text size="xs" as="p" className="tracking-[1.50px] uppercase">
          {duration}
        </Text>
      ) : null}
      <div className="flex flex-row justify-between w-full mx-auto md:px-5 max-w-[378px]">
        <div className="flex flex-row justify-start items-start w-[80%] gap-3.5">
          <Img
            src="images/img_10_rectangle.png"
            alt="image"
            className="w-[40px] md:h-auto object-cover rounded-[14px]"
          />
          <div className="flex flex-col items-start justify-start w-[82%] pt-[3px] gap-px">
            <Text size="xl" as="p" className="tracking-[0.15px]">
              {heading}
            </Text>
            <Text as="p" className="!text-gray-300 tracking-[0.25px] !font-normal !leading-5">
              {loremipsum}
            </Text>
          </div>
        </div>
        <div className="flex flex-col items-end justify-start pt-0.5 gap-[31px]">
          {!!g ? (
            <Text size="md" as="p" className="!text-gray-300 tracking-[0.40px] text-right">
              {g}
            </Text>
          ) : null}
          <Text size="md" as="p" className="!text-gray-300 tracking-[0.40px] text-right">
            {caption}
          </Text>
        </div>
      </div>
    </div>
  );
}
