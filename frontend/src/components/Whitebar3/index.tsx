import React from "react";
import { SelectBox, Img, Text } from "./..";

const dropDownOptions = [
  { label: "Option1", value: "option1" },
  { label: "Option2", value: "option2" },
  { label: "Option3", value: "option3" },
];
interface Props {
  className?: string;
  home?: string;
  home1?: string;
  home2?: string;
  home3?: string;
  home4?: string;
}

export default function HomeRowmensagesOne({
  home = "MENSAGES",
  home1 = "NOTIFICATION",
  home2 = "SET YOUR UNIVERSE",
  home3 = "CREATE AN ITEM",
  home4 = "help the project",
  ...props
}: Props) {
  return (
    <div {...props}>
      <div className="flex flex-row md:flex-col w-[87%] md:w-full md:h-auto gap-[104px] p-4 md:gap-10 shadow-xs rounded-[3px]">
        <div className="flex flex-row justify-start items-start w-[9%] md:w-full gap-0.5 my-[5px]">
          <div className="flex flex-col items-center justify-start h-[17px] w-[17px]">
            <Img src="images/img_u_chat_bubble_user.svg" alt="mensages_one" className="h-[17px] w-[17px]" />
          </div>
          <Text size="xs" as="p" className="mt-0.5 tracking-[1.50px] uppercase">
            {home}
          </Text>
        </div>
        <div className="flex flex-row justify-start items-start w-[11%] md:w-full gap-px my-[5px]">
          <div className="flex flex-col items-center justify-start h-[17px] w-[17px]">
            <Img src="images/img_u_exclamation_circle.svg" alt="uexclamation" className="h-[17px] w-[17px]" />
          </div>
          <Text size="xs" as="p" className="mt-0.5 tracking-[1.50px] uppercase">
            {home1}
          </Text>
        </div>
        <div className="flex flex-row justify-start items-start w-[14%] md:w-full gap-0.5 my-[5px]">
          <div className="flex flex-col items-center justify-start h-[17px] w-[17px]">
            <Img src="images/img_u_notes.svg" alt="unotes_one" className="h-[17px] w-[17px]" />
          </div>
          <Text size="xs" as="p" className="mt-0.5 tracking-[1.50px] uppercase">
            {home2}
          </Text>
        </div>
        <div className="flex flex-row justify-start items-start w-[12%] md:w-full gap-0.5 my-[5px]">
          <div className="flex flex-col items-center justify-start h-[17px] w-[17px]">
            <Img src="images/img_u_create_dashboard.svg" alt="ucreate_one" className="h-[17px] w-[17px]" />
          </div>
          <Text size="xs" as="p" className="mt-0.5 tracking-[1.50px] uppercase">
            {home3}
          </Text>
        </div>
        <div className="flex flex-row justify-start items-start w-[14%] md:w-full gap-0.5 my-[5px]">
          <div className="flex flex-col items-center justify-start h-[17px] w-[17px]">
            <Img src="images/img_u_money_bill_white_a700.svg" alt="umoneybill_one" className="h-[17px] w-[17px]" />
          </div>
          <Text size="xs" as="p" className="mt-0.5 tracking-[1.50px] uppercase">
            {home4}
          </Text>
        </div>
      </div>
      <SelectBox
        shape="round"
        indicator={<Img src="images/img_uarrowright.svg" alt="u:arrow-right" />}
        name="button"
        placeholder="my linkedin"
        options={dropDownOptions}
        className="w-[11%] gap-px tracking-[0.50px] font-inter"
      />
    </div>
  );
}
