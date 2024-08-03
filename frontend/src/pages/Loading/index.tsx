import React from "react";
import { Helmet } from "react-helmet";
import { Text, Img } from "../../components";

export default function LoadingPage() {
  return (
    <>
      <Helmet>
        <title>Role Player</title>
        <meta name="description" content="Web site created using create-react-app" />
      </Helmet>
      <div className="flex flex-row justify-center w-full bg-white-A700">
        <div className="flex flex-row justify-center w-full">
          <div className="h-[684px] w-full md:h-auto bg-white-A700 relative">
            <Img
              src="images/img_unsplash_vxhpxyqocfq_684x1320.png"
              alt="unsplashone_one"
              className="justify-center h-[684px] w-full left-0 bottom-0 right-0 top-0 m-auto object-cover absolute rounded-[10px]"
            />
            <div className="flex flex-row justify-center w-full h-full md:h-auto left-0 bottom-0 right-0 top-0 p-[7px] m-auto bg-gradient absolute rounded-[10px]">
              <div className="flex flex-row justify-start w-[54%] mt-[629px] ml-2">
                <div className="flex flex-col items-center justify-start w-full">
                  <div className="flex flex-row justify-between items-center w-full md:px-5 max-w-[666px]">
                    <Text className="tracking-[0.15px] text-xl font-medium">Heading</Text>
                    <div className="flex w-[44px] h-[8px] md:h-auto" />
                  </div>
                  <Text className="!text-white-A700_99 tracking-[0.40px] text-xs font-normal opacity-0.7">
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                    industry&#39;s standard.
                  </Text>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
