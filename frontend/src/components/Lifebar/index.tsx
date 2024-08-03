import React, { useEffect, useState } from "react";
import { Text } from "..";

interface Props {
  className?: string;
  titlehere?: string;
  percentage: number; // Updated to receive percentage from parent component
}

export default function Lifebar({ titlehere = "Lifebar", percentage, ...props }: Props) {
  const [currentPercentage, setCurrentPercentage] = useState(0);

  useEffect(() => {
    setCurrentPercentage(percentage);
  }, [percentage]);

  return (
    <div {...props}>
      <div className="flex flex-row justify-between items-center w-full">
        <Text size="md" as="p" className="!text-black-900_dd_09 tracking-[0.10px]">
          {titlehere}
        </Text>
        <Text as="p" className="!text-black-900_99_09 tracking-[0.50px]">
          {currentPercentage}%
        </Text>
      </div>
      <div className="h-[4px] w-full bg-indigo-A700_19_09 relative rounded-sm">
        <div
          style={{ width: `${Math.abs(currentPercentage)}%`, backgroundColor: currentPercentage >= 0 ? "#2196F3" : "#FF5252" }}
          className={`h-full absolute rounded-sm ${currentPercentage >= 0 ? "bg-blue-A700_09" : "bg-red-A700_09"}`}
        />
      </div>
    </div>
  );
}
