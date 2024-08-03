import React from 'react';
import { Img, Text, Button } from '../../components';

const PostComponent = ({ post }) => {
  return (
    <div className="flex flex-col items-center justify-start w-[26%] md:w-full">
      <div className="flex flex-col items-center justify-start w-full pb-2.5 gap-2.5 bg-blue_gray-900_19 rounded-[10px]">
        <div className="flex flex-row justify-end w-full p-2.5 rounded-tl-[10px] rounded-tr-[10px] bg-gray-200">
          <Button shape="circle" className="w-[24px] mb-14">
            <Img src={post.image} />
          </Button>
        </div>
        <div className="flex flex-col items-start justify-start w-[89%] md:w-full pt-[3px] gap-[5px]">
          <Text as="p" className="!text-black-900_dd tracking-[0.10px]">
            {post.title}
          </Text>
          <Text size="md" as="p" className="!text-black-900_99 tracking-[0.40px] !leading-4">
            {post.description}
          </Text>
        </div>
      </div>
    </div>
  );
};

export default PostComponent;
