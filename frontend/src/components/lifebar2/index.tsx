import React from "react";
import { Text } from "./..";

interface Props {
  className?: string;
  titlehere?: string;
  thirtyeight?: string;
}

export default function HomeColumntitlehere({ titlehere = "Title here", thirtyeight = "38%", ...props }: Props) {
  return (
    <div {...props}>
      <div className="flex flex-row justify-between items-center w-full">
        <Text as="p" className="tracking-[0.10px] !font-robotoflex">
          {titlehere}
        </Text>
        <Text size="md" as="p" className="!text-black-900_99 tracking-[0.50px] !font-robotoflex !font-medium">
          {thirtyeight}
        </Text>
      </div>
      <div className="h-[4px] w-full bg-indigo-A700_19 relative rounded-sm">
        <div style={{ width: "43%" }} className="h-full bg-blue-A700 absolute rounded-sm" />
      </div>
    </div>
  );
}
