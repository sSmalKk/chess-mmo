import React from "react";
import { SelectBox, Img, Button } from "./..";

const dropDownOptions = [
  { label: "Option1", value: "option1" },
  { label: "Option2", value: "option2" },
  { label: "Option3", value: "option3" },
];
interface Props {
  className?: string;
}

export default function Navmenublue({ ...props }: Props) {
  return (
    <div {...props}>
      <div className="flex flex-row md:flex-col w-[87%] md:w-full md:h-auto gap-[104px] p-4 md:gap-10 shadow-xs rounded-[3px]">
        <Button className="h-[17px] gap-0.5 my-[5px]  tracking-[1.50px] uppercase text-[10px] font-medium min-w-[83px]">
        CREATE
        </Button>
        <Button className="h-[17px] gap-px my-[5px]  tracking-[1.50px] uppercase text-[10px] font-medium min-w-[102px]">
        COMUNITY OBJECTS
        </Button>
        <Button className="h-[17px] gap-0.5 my-[5px]  tracking-[1.50px] uppercase text-[10px] font-medium min-w-[138px]">
          SET YOUR UNIVERSE
        </Button>
        <Button className="h-[17px] gap-0.5 my-[5px]  tracking-[1.50px] uppercase text-[10px] font-medium min-w-[117px]">
          CREATE A MATERIAL
        </Button>
        <Button className="h-[17px] gap-0.5 my-[5px]  tracking-[1.50px] uppercase text-[10px] font-medium min-w-[133px]">
          CREATE A RULE
        </Button>
      </div>
      <SelectBox
        indicator={<Img src="images/img_uarrowright.svg" alt="u:arrow-right" />}
        name="button"
        placeholder="select server"
        options={dropDownOptions}
        className="h-[36px] gap-2 px-4 text-white-A700 tracking-[0.50px] font-inter text-xs bg-blue-700 min-w-[160px] rounded-[3px]"/>
    
    </div>
  );
}
