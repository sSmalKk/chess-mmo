import React from 'react';
import { Heading, Text } from '../../components';

const InfoComponent = ({ title, content }) => {
  return (
    <div className="flex flex-col items-center justify-start w-full gap-[9px] bg-black-900_60 rounded-[5px]">
      <div className="flex flex-row justify-center w-full pt-0.5">
        <div className="flex flex-col items-start justify-start w-full">
          <div className="h-[56px] w-full bg-black-900_dd" />
          <Heading as="h4" className="mt-[-56px] ml-5 md:ml-0">
            {title}
          </Heading>
        </div>
      </div>
      <div className="flex flex-row justify-center w-[98%] md:w-full">
        <Text as="p" className="tracking-[0.20px] !font-urbanist !font-normal !leading-[19px]">
          {content}
        </Text>
      </div>
    </div>
  );
};

export default InfoComponent;
