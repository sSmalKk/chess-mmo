import React from "react";
import { Button } from "./..";

interface Props {
  className?: string;
  landingPage?: string;
  aboutThe?: string;
  helpUs?: string;
}

export default function Landingpage141tabbar({
  landingPage = "landing page",
  aboutThe = "about the project",
  helpUs = "help us",
  ...props
}: Props) {
  return (
    <div {...props}>
      <Button className="h-[38px] px-[15px] text-deep_purple-900 tracking-[0.50px] font-inter text-base border-deep_purple-900 border-b border-solid min-w-[135px]">
        {landingPage}
      </Button>
      <Button className="h-[38px] px-4 text-white-A700 tracking-[0.50px] font-inter text-base bg-blue_gray-900_19 min-w-[171px] rounded-[3px]">
        {aboutThe}
      </Button>
      <Button className="h-[38px] px-4 text-white-A700 tracking-[0.50px] font-inter text-base bg-blue_gray-900_19 min-w-[90px] rounded-[3px]">
        {helpUs}
      </Button>
    </div>
  );
}
