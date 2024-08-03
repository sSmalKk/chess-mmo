import React from "react";
import { Text, Button, Img } from "./..";

interface Props {
  className?: string;
  marchcounter?: string;
  mon?: string;
  tue?: string;
  wed?: string;
  thu?: string;
  fri?: string;
  sat?: string;
  sun?: string;
  one?: string;
  oneone?: string;
  onetwo?: string;
  onethree?: string;
  onefour?: string;
  onefive?: string;
  onesix?: string;
  one1?: string;
  oneone1?: string;
  onetwo1?: string;
  onethree1?: string;
  onefour1?: string;
  onefive1?: string;
  onesix1?: string;
  one2?: string;
  fifteen?: string;
  oneone2?: string;
  onetwo2?: string;
  onethree2?: string;
  onefour2?: string;
  onefive2?: string;
  one3?: string;
  oneone3?: string;
  onetwo3?: string;
  onethree3?: string;
  onefour3?: string;
  onefive3?: string;
  onesix2?: string;
  one4?: string;
  oneone4?: string;
  onetwo4?: string;
  onethree4?: string;
  onefour4?: string;
  onefive4?: string;
  onesix3?: string;
}

export default function Register52calender({
  marchcounter = "March 2023",
  mon = "Mon",
  tue = "Tue",
  wed = "Wed",
  thu = "Thu",
  fri = "Fri",
  sat = "Sat",
  sun = "Sun",
  one = "31",
  oneone = "1",
  onetwo = "2",
  onethree = "3",
  onefour = "4",
  onefive = "5",
  onesix = "6",
  one1 = "7",
  oneone1 = "8",
  onetwo1 = "9",
  onethree1 = "10",
  onefour1 = "11",
  onefive1 = "12",
  onesix1 = "13",
  one2 = "14",
  fifteen = "15",
  oneone2 = "16",
  onetwo2 = "17",
  onethree2 = "18",
  onefour2 = "19",
  onefive2 = "20",
  one3 = "21",
  oneone3 = "22",
  onetwo3 = "23",
  onethree3 = "24",
  onefour3 = "25",
  onefive3 = "26",
  onesix2 = "27",
  one4 = "28",
  oneone4 = "29",
  onetwo4 = "30",
  onethree4 = "31",
  onefour4 = "1",
  onefive4 = "2",
  onesix3 = "3",
  ...props
}: Props) {
  return (
    <div {...props}>
      <div className="flex flex-col items-center justify-start w-full md:h-auto gap-[7px] p-4 bg-white-A700 rounded-md">
        <div className="flex flex-row justify-between items-center w-full md:px-5 max-w-[280px]">
          <Img src="images/img_angle_right_b_solid.svg" alt="anglerightbone" className="h-[24px] w-[24px]" />
          <Text as="p" className="!text-gray-900_01 tracking-[0.10px] text-center">
            {marchcounter}
          </Text>
          <Img src="images/img_arrow_right.svg" alt="arrowrightone" className="h-[24px] w-[24px]" />
        </div>
        <div className="flex flex-row justify-center w-full md:px-5 max-w-[280px]">
          <Text size="md" as="p" className="!text-gray-700 tracking-[0.40px] text-center">
            {mon}
          </Text>
          <Text size="md" as="p" className="ml-4 !text-gray-700 tracking-[0.40px] text-center">
            {tue}
          </Text>
          <Text size="md" as="p" className="ml-4 !text-gray-700 tracking-[0.40px] text-center">
            {wed}
          </Text>
          <Text size="md" as="p" className="ml-4 !text-gray-700 tracking-[0.40px] text-center">
            {thu}
          </Text>
          <Text size="md" as="p" className="h-[15px] ml-[22px] sm:ml-5 !text-gray-700 tracking-[0.40px] text-center">
            {fri}
          </Text>
          <Text size="md" as="p" className="ml-[23px] sm:ml-5 !text-gray-700 tracking-[0.40px] text-center">
            {sat}
          </Text>
          <Text size="md" as="p" className="ml-[19px] !text-gray-700 tracking-[0.40px] text-center">
            {sun}
          </Text>
        </div>
        <div className="flex flex-col items-center justify-start w-full pb-[11px] md:px-5 max-w-[280px]">
          <div className="flex flex-col w-full gap-px">
            <div className="flex flex-row justify-center w-full">
              <div className="flex flex-col items-start justify-start h-[40px] w-[40px] p-[11px]">
                <Text as="p" className="!text-gray-500 tracking-[1.25px] uppercase text-center">
                  {one}
                </Text>
              </div>
              <div className="flex flex-col items-start justify-start h-[40px] w-[40px] p-[11px]">
                <Text as="p" className="ml-1 md:ml-0 !text-gray-900 tracking-[1.25px] uppercase text-center">
                  {oneone}
                </Text>
              </div>
              <div className="flex flex-col items-center justify-start h-[40px] w-[40px] p-[11px]">
                <Text as="p" className="!text-gray-900 tracking-[1.25px] uppercase text-center">
                  {onetwo}
                </Text>
              </div>
              <div className="flex flex-col items-center justify-start h-[40px] w-[40px] p-[11px]">
                <Text as="p" className="!text-gray-900 tracking-[1.25px] uppercase text-center">
                  {onethree}
                </Text>
              </div>
              <div className="flex flex-col items-center justify-start h-[40px] w-[40px] p-[11px]">
                <Text as="p" className="!text-gray-900 tracking-[1.25px] uppercase text-center">
                  {onefour}
                </Text>
              </div>
              <div className="flex flex-col items-center justify-start h-[40px] w-[40px] p-[11px]">
                <Text as="p" className="!text-gray-900 tracking-[1.25px] uppercase text-center">
                  {onefive}
                </Text>
              </div>
              <div className="flex flex-col items-center justify-start h-[40px] w-[40px] p-[11px]">
                <Text as="p" className="!text-gray-900 tracking-[1.25px] uppercase text-center">
                  {onesix}
                </Text>
              </div>
            </div>
            <div className="flex flex-row justify-center items-center w-full">
              <div className="flex flex-col items-center justify-start h-[40px] w-[40px] p-[11px]">
                <Text as="p" className="!text-gray-900 tracking-[1.25px] uppercase text-center">
                  {one1}
                </Text>
              </div>
              <div className="flex flex-col items-center justify-start w-[3%] ml-4">
                <Text as="p" className="!text-gray-900 tracking-[1.25px] uppercase text-center">
                  {oneone1}
                </Text>
              </div>
              <div className="flex flex-col items-center justify-start h-[40px] w-[40px] ml-4 p-[11px]">
                <Text as="p" className="!text-gray-900 tracking-[1.25px] uppercase text-center">
                  {onetwo1}
                </Text>
              </div>
              <div className="flex flex-col items-center justify-start h-[40px] w-[40px] p-[11px]">
                <Text as="p" className="h-[17px] !text-gray-900 tracking-[1.25px] uppercase text-center">
                  {onethree1}
                </Text>
              </div>
              <div className="flex flex-col items-start justify-start h-[40px] w-[40px] p-[11px]">
                <Text as="p" className="!text-gray-900 tracking-[1.25px] uppercase text-center">
                  {onefour1}
                </Text>
              </div>
              <div className="flex flex-col items-center justify-start h-[40px] w-[40px] p-[11px]">
                <Text as="p" className="h-[17px] !text-gray-900 tracking-[1.25px] uppercase text-center">
                  {onefive1}
                </Text>
              </div>
              <div className="flex flex-col items-center justify-start h-[40px] w-[40px] p-[11px]">
                <Text as="p" className="h-[17px] !text-gray-900 tracking-[1.25px] uppercase text-center">
                  {onesix1}
                </Text>
              </div>
            </div>
            <div className="flex flex-row justify-center items-center w-[93%] md:w-full mx-auto">
              <div className="flex flex-row justify-center items-center h-[17px] w-[18px]">
                <Text as="p" className="h-[17px] !text-gray-900 tracking-[1.25px] uppercase text-center">
                  {one2}
                </Text>
              </div>
              <Button className="h-[40px] ml-[11px] px-[11px] text-white-A700 tracking-[1.25px] uppercase text-sm font-medium bg-blue-800 min-w-[40px] rounded-[50%]">
                {fifteen}
              </Button>
              <div className="flex flex-row justify-center items-center h-[17px] w-[18px] ml-[11px]">
                <Text as="p" className="h-[17px] !text-gray-900 tracking-[1.25px] uppercase text-center">
                  {oneone2}
                </Text>
              </div>
              <div className="flex flex-row justify-center items-center h-[17px] w-[18px] ml-[22px] sm:ml-5">
                <Text as="p" className="h-[17px] !text-gray-900 tracking-[1.25px] uppercase text-center">
                  {onetwo2}
                </Text>
              </div>
              <div className="flex flex-row justify-center items-center h-[17px] w-[18px] ml-[22px] sm:ml-5">
                <Text as="p" className="h-[17px] !text-gray-900 tracking-[1.25px] uppercase text-center">
                  {onethree2}
                </Text>
              </div>
              <div className="flex flex-row justify-center items-center h-[17px] w-[18px] ml-[22px] sm:ml-5">
                <Text as="p" className="h-[17px] !text-gray-900 tracking-[1.25px] uppercase text-center">
                  {onefour2}
                </Text>
              </div>
              <div className="flex flex-row justify-center items-center h-[17px] w-[18px] ml-[22px] sm:ml-5">
                <Text as="p" className="h-[17px] !text-gray-900 tracking-[1.25px] uppercase text-center">
                  {onefive2}
                </Text>
              </div>
            </div>
          </div>
          <div className="flex flex-col w-full gap-[11px]">
            <div className="flex flex-row justify-center w-full">
              <div className="flex flex-col items-start justify-start h-[40px] w-[40px] p-[11px]">
                <Text as="p" className="!text-gray-900 tracking-[1.25px] uppercase text-center">
                  {one3}
                </Text>
              </div>
              <div className="flex flex-col items-center justify-start h-[40px] w-[40px] p-[11px]">
                <Text as="p" className="h-[17px] !text-gray-900 tracking-[1.25px] uppercase text-center">
                  {oneone3}
                </Text>
              </div>
              <div className="flex flex-col items-center justify-start h-[40px] w-[40px] p-[11px]">
                <Text as="p" className="h-[17px] !text-gray-900 tracking-[1.25px] uppercase text-center">
                  {onetwo3}
                </Text>
              </div>
              <div className="flex flex-col items-center justify-start h-[40px] w-[40px] p-[11px]">
                <Text as="p" className="h-[17px] !text-gray-900 tracking-[1.25px] uppercase text-center">
                  {onethree3}
                </Text>
              </div>
              <div className="flex flex-col items-center justify-start h-[40px] w-[40px] p-[11px]">
                <Text as="p" className="h-[17px] !text-gray-900 tracking-[1.25px] uppercase text-center">
                  {onefour3}
                </Text>
              </div>
              <div className="flex flex-col items-center justify-start h-[40px] w-[40px] p-[11px]">
                <Text as="p" className="h-[17px] !text-gray-900 tracking-[1.25px] uppercase text-center">
                  {onefive3}
                </Text>
              </div>
              <div className="flex flex-col items-center justify-start h-[40px] w-[40px] p-[11px]">
                <Text as="p" className="h-[17px] !text-gray-900 tracking-[1.25px] uppercase text-center">
                  {onesix2}
                </Text>
              </div>
            </div>
            <div className="flex flex-row justify-center w-[91%] md:w-full ml-[11px] mr-4">
              <div className="flex flex-row justify-center items-center h-[17px] w-[18px]">
                <Text as="p" className="h-[17px] !text-gray-900 tracking-[1.25px] uppercase text-center">
                  {one4}
                </Text>
              </div>
              <div className="flex flex-row justify-center items-center h-[17px] w-[18px] ml-[22px] sm:ml-5">
                <Text as="p" className="h-[17px] !text-gray-900 tracking-[1.25px] uppercase text-center">
                  {oneone4}
                </Text>
              </div>
              <div className="flex flex-row justify-center items-center h-[17px] w-[18px] ml-[22px] sm:ml-5">
                <Text as="p" className="h-[17px] !text-gray-900 tracking-[1.25px] uppercase text-center">
                  {onetwo4}
                </Text>
              </div>
              <div className="flex flex-col items-center justify-start w-[6%] ml-[22px] sm:ml-5">
                <Text as="p" className="!text-gray-900 tracking-[1.25px] uppercase text-center">
                  {onethree4}
                </Text>
              </div>
              <div className="flex flex-col items-center justify-start w-[3%] ml-[29px] sm:ml-5">
                <Text as="p" className="!text-gray-500 tracking-[1.25px] uppercase text-center">
                  {onefour4}
                </Text>
              </div>
              <div className="flex flex-col items-center justify-start w-[4%] ml-[33px] sm:ml-5">
                <Text as="p" className="!text-gray-500 tracking-[1.25px] uppercase text-center">
                  {onefive4}
                </Text>
              </div>
              <div className="flex flex-col items-center justify-start w-[4%] ml-8 sm:ml-5">
                <Text as="p" className="!text-gray-500 tracking-[1.25px] uppercase text-center">
                  {onesix3}
                </Text>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
