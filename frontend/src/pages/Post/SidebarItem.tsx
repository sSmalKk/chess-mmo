import React from 'react';
import { Text } from '../../components';

const SidebarItem = ({ item }) => {
  return (
    <div className="flex flex-col items-start justify-start w-full gap-[9px] bg-black-900_60 rounded-[5px]">
      <div className="flex flex-row justify-start w-full pt-0.5">
        <div className="flex flex-col items-start justify-start w-full">
          <div className="h-[56px] w-full bg-black-900_dd" />
          <Text as="h3" className="mt-[-56px] ml-5 md:ml-0">
            {item.title}
          </Text>
        </div>
      </div>
      <div className="flex flex-row justify-start md:w-full">
        <Text as="p" className="tracking-[0.20px] !font-urbanist !font-normal !leading-[19px]">
          {item.content}
        </Text>
      </div>
    </div>
  );
};

export default SidebarItem;
