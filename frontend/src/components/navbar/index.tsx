import React from "react";
import { Button } from "..";

interface Props {
  className?: string;
  landingPage?: string;
  aboutThe?: string;
  helpUs?: string;
}

export default function Home141tabbar({
  landingPage = "landing page",
  aboutThe = "about the project",
  helpUs = "help us",
  ...props
}: Props) {
  return (
    <div {...props}>
      <Button
        color="deep_purple_900"
        size="lg"
        variant="outline"
        shape="square"
        className="tracking-[0.50px] font-inter min-w-[135px]"
      >
        {landingPage}
      </Button>
      <Button color="blue_gray_900_19" size="lg" shape="round" className="tracking-[0.50px] font-inter min-w-[171px]">
        {aboutThe}
      </Button>
      <Button color="blue_gray_900_19" size="lg" shape="round" className="tracking-[0.50px] font-inter min-w-[90px]">
        {helpUs}
      </Button>
    </div>
  );
}
