import React from "react";
import { Text, Img } from "..";

interface Props {
  className?: string;
  heartoutline?: string;
  imageoneOne?: string;
  title?: string;
  loremipsum?: string;
}

export default function Card({
  heartoutline,
  imageoneOne,
  title = "Subtitle 2",
  loremipsum = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do ",
  ...props
}: Props) {
  return (
    <div {...props}>
      <div className="flex flex-col items-center justify-start w-full pb-2.5 gap-2.5 bg-blue_gray-900_19 rounded-[10px]">
        <div className="flex flex-row justify-end w-full pb-2.5 px-2.5 rounded-tl-[10px] rounded-tr-[10px] bg-gray-200">
          <div className="flex flex-row justify-end w-[17%] mb-14">
            <div className="flex flex-col items-center justify-start w-full">
              {!!heartoutline ? (
                <Img
                  src={heartoutline}
                  alt="heartoutline"
                  className="w-full md:h-auto sm:w-full z-[1] object-cover max-w-[16px]"
                />
              ) : null}
              {!!imageoneOne ? (
                <Img
                  src={imageoneOne}
                  alt="imageone_one"
                  className="w-full md:h-auto sm:w-full mt-[-13px] opacity-0.5 object-cover"
                />
              ) : null}
            </div>
          </div>
        </div>
        <div className="flex flex-col items-start justify-start w-full pt-[3px] gap-[5px] md:px-5 max-w-[143px]">
          <Text as="p" className="!text-black-900_dd tracking-[0.10px]">
            {title}
          </Text>
          <Text size="md" as="p" className="!text-black-900_99 tracking-[0.40px] !leading-4">
            {loremipsum}
          </Text>
        </div>
      </div>
    </div>
  );
}
