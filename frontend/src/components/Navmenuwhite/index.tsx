import React from "react";
import { CloseSVG } from "../assets/images/close"
import { Button, Img, Input } from "./..";

interface Props {
  className?: string;
}

export default function Navmenuwhite({ ...props }: Props) {
  const [searchBarValue, setSearchBarValue] = React.useState("");

  return (
    <div {...props}>
      <div className="flex flex-row sm:flex-col justify-between w-[56%] md:h-auto p-4 sm:gap-10 bg-white-A700 shadow-xs rounded-[3px]">
        <Button className="h-[17px] gap-0.5 text-black-900_99 tracking-[1.50px] uppercase text-[10px] font-medium min-w-[52px]">
          HOME
        </Button>
        <Button className="h-[17px] gap-0.5 text-black-900_99 tracking-[1.50px] uppercase text-[10px] font-medium min-w-[56px]">
          STORE
        </Button>
        <Button className="h-[17px] gap-px text-black-900_99 tracking-[1.50px] uppercase text-[10px] font-medium min-w-[103px]">
          PEDIA
        </Button>
        <Button className="h-[17px] gap-px text-black-900_99 tracking-[1.50px] uppercase text-[10px] font-medium min-w-[103px]">
          PERFIL
        </Button>
        <Button className="h-[17px] gap-0.5 text-black-900_99 tracking-[1.50px] uppercase text-[10px] font-medium min-w-[80px]">
          BE A CREATOR
        </Button>
      </div>
      <Input
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
        className="w-[28%] h-[44px] pl-5 pr-[35px] gap-[15px] text-black-900_60 tracking-[0.50px] font-inter text-xs bg-blue_gray-900_19 rounded-[3px]"
      />
      <Button
        rightIcon={<Img src="images/img_uarrowright.svg" alt="u:arrow-right" />}
        className="h-[36px] gap-2 px-4 text-white-A700 tracking-[0.50px] font-inter text-xs bg-green-700 min-w-[160px] rounded-[3px]"
      >
        START SANDBOX
      </Button>
    </div>
  );
}
