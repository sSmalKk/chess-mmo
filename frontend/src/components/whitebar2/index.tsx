import React from "react";
import { CloseSVG } from "../assets/images/close";
import { Button, Img, Input, Text } from "./..";

interface Props {
  className?: string;
  homeTwo?: string;
  home?: string;
  home1?: string;
  home2?: string;
  home3?: string;
  joinInA?: string;
}

export default function HomeRowhomeOne({
  homeTwo = "HOME",
  home = "STORE",
  home1 = "PEDIA",
  home2 = "BE A CREATOR",
  home3 = "DONATION",
  joinInA = "Join in a Univese",
  ...props
}: Props) {
  const [searchBarValue, setSearchBarValue] = React.useState("");

  return (
    <div {...props}>
      <div className="flex flex-row sm:flex-col justify-between w-[56%] md:h-auto p-4 sm:gap-10 bg-white-A700 shadow-xs rounded-[3px]">
        <div className="flex flex-row w-[29%] sm:w-full gap-[68px] my-[5px] md:gap-10 sm:my-0">
          <div className="flex flex-row justify-start items-start w-[30%] gap-0.5">
            <div className="flex flex-col items-center justify-start h-[17px] w-[17px]">
              <Img src="images/img_u_home_alt.svg" alt="home_one" className="h-[17px] w-[17px]" />
            </div>
            <Text size="xs" as="p" className="mt-0.5 !text-black-900_99 tracking-[1.50px] uppercase">
              {homeTwo}
            </Text>
          </div>
          <div className="flex flex-row justify-start items-start w-[32%] gap-0.5">
            <div className="flex flex-col items-center justify-start h-[17px] w-[17px]">
              <Img src="images/img_fi_credit_card.svg" alt="ficreditcard" className="h-[17px] w-[17px]" />
            </div>
            <Text size="xs" as="p" className="mt-0.5 !text-black-900_99 tracking-[1.50px] uppercase">
              {home}
            </Text>
          </div>
        </div>
        <div className="flex flex-row justify-start items-start w-[9%] sm:w-full gap-0.5">
          <div className="flex flex-col items-center justify-start h-[17px] w-[17px] p-0.5">
            <div className="flex flex-col items-center justify-start h-[13px] w-[13px]">
              <div className="flex flex-col items-center justify-start h-[13px] w-[13px] gap-0.5">
                <div className="flex flex-row justify-start w-full gap-0.5">
                  <Img src="images/img_vector.svg" alt="vector_one" className="h-[5px] w-[5px]" />
                  <Img src="images/img_vector.svg" alt="vector_three" className="h-[5px] w-[5px]" />
                </div>
                <div className="flex flex-row justify-start w-full gap-0.5">
                  <Img src="images/img_vector.svg" alt="vector_five" className="h-[5px] w-[5px]" />
                  <Img src="images/img_vector.svg" alt="vector_seven" className="h-[5px] w-[5px]" />
                </div>
              </div>
            </div>
          </div>
          <Text size="xs" as="p" className="mt-0.5 !text-black-900_99 tracking-[1.50px] uppercase">
            {home1}
          </Text>
        </div>
        <div className="flex flex-row w-[41%] sm:w-full gap-[68px] md:gap-10">
          <div className="flex flex-row justify-start items-start w-[41%] gap-px">
            <div className="flex flex-col items-center justify-start h-[17px] w-[17px]">
              <Img src="images/img_fi_compass.svg" alt="be_a_creator" className="h-[17px] w-[17px]" />
            </div>
            <Text size="xs" as="p" className="mt-0.5 !text-black-900_99 tracking-[1.50px] uppercase">
              {home2}
            </Text>
          </div>
          <div className="flex flex-row justify-start items-start w-[32%] gap-0.5">
            <div className="flex flex-col items-center justify-start h-[17px] w-[17px]">
              <Img src="images/img_u_money_bill.svg" alt="umoneybill_one" className="h-[17px] w-[17px]" />
            </div>
            <Text size="xs" as="p" className="mt-0.5 !text-black-900_99 tracking-[1.50px] uppercase">
              {home3}
            </Text>
          </div>
        </div>
      </div>
      <Input
        color="blue_gray_900_19"
        size="sm"
        variant="fill"
        shape="round"
        name="search"
        placeholder="Search"
        value={searchBarValue}
        onChange={(e: string) => setSearchBarValue(e)}
        prefix={<Img src="images/img_search.svg" alt="search" className="cursor-pointer" />}
        suffix={
          searchBarValue?.length > 0 ? (
            <CloseSVG onClick={() => setSearchBarValue("")} height={14} width={14} fillColor="#000000ff" />
          ) : null
        }
        className="w-[28%] gap-[15px] text-black-900_60"
      />
      <Button
        color="green_700"
        size="md"
        shape="round"
        rightIcon={<Img src="images/img_uarrowright.svg" alt="u:arrow-right" />}
        className="gap-2 tracking-[0.50px] font-inter min-w-[160px]"
      >
        {joinInA}
      </Button>
    </div>
  );
}
