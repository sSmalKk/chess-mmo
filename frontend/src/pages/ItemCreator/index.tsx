import React from "react";
import { Helmet } from "react-helmet";
import { Text, Button, Img } from "../../components";

export default function ItemCreatorPage() {
  return (
    <>
      <Helmet>
        <title>Role Player</title>
        <meta name="description" content="Web site created using create-react-app" />
      </Helmet>
      <div className="flex flex-row justify-center w-full bg-white-A700">
        <div className="flex flex-row md:flex-col justify-between items-center w-full md:gap-10">
          <div className="flex flex-col items-start justify-start w-[30%] md:w-full">
            <div className="flex flex-row justify-start w-full sm:w-full bg-black-900_99">
              <div className="flex flex-col items-center justify-start w-full gap-2.5">
                <div className="flex flex-row justify-center w-full">
                  <div className="flex flex-row sm:flex-col justify-center items-start w-full sm:gap-5">
                    <div className="flex flex-row justify-center w-[98%] sm:w-full">
                      <div className="flex flex-row justify-between items-center w-full">
                        <div className="flex flex-row justify-start items-start w-[37%] gap-3.5">
                          <Img
                            src="images/img_10_rectangle.png"
                            alt="image_one"
                            className="w-[40px] md:h-auto object-cover rounded-[14px]"
                          />
                          <div className="flex flex-col items-start justify-start w-[62%] pt-[3px] gap-px">
                            <Text size="xl" as="p" className="tracking-[0.15px]">
                              heading
                            </Text>
                            <Text as="p" className="!text-gray-300 tracking-[0.25px] !font-normal !leading-5">
                              <>
                                Lorem ipsum
                                <br />
                                dolor sit{" "}
                              </>
                            </Text>
                          </div>
                        </div>
                        <div className="flex flex-row justify-center">
                          <Text size="md" as="p" className="!text-gray-300 tracking-[0.40px] text-right">
                            Caption
                          </Text>
                        </div>
                      </div>
                    </div>
                    <Img
                      src="images/img_u_bars.svg"
                      alt="ubarsone_one"
                      className="h-[24px] w-[24px] ml-[-13px] sm:ml-0"
                    />
                  </div>
                </div>
                <div className="flex flex-col items-center justify-start w-full gap-2">
                  <div className="flex flex-row justify-between items-center w-full">
                    <Text as="p" className="tracking-[0.10px] !font-robotoflex">
                      Title here
                    </Text>
                    <Text
                      size="md"
                      as="p"
                      className="!text-black-900_99 tracking-[0.50px] !font-robotoflex !font-medium"
                    >
                      38%
                    </Text>
                  </div>
                  <div className="h-[4px] w-full bg-indigo-A700_19 relative rounded-sm">
                    <div style={{ width: "43%" }} className="h-full bg-blue-A700 absolute rounded-sm" />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center justify-start mt-2.5 ml-[3px] pb-0.5 gap-[3px] md:ml-0">
              <Button color="blue_gray_900_19" size="xl" shape="circle" className="w-[32px]">
                <Img src="images/img_110_instance.svg" />
              </Button>
              <Text size="s" as="p" className="!text-black-900_60 tracking-[1.50px] uppercase !font-medium">
                iTEM
              </Text>
            </div>
            <div className="flex flex-col items-center justify-start mt-[31px] ml-[3px] pb-0.5 gap-[3px] md:ml-0">
              <Button color="blue_gray_900_19" size="xl" shape="circle" className="w-[32px]">
                <Img src="images/img_110_instance.svg" />
              </Button>
              <Text size="s" as="p" className="!text-black-900_60 tracking-[1.50px] uppercase !font-medium">
                iTEM
              </Text>
            </div>
            <div className="flex flex-col items-center justify-start mt-[31px] ml-[3px] pb-0.5 gap-[3px] md:ml-0">
              <Button color="blue_gray_900_19" size="xl" shape="circle" className="w-[32px]">
                <Img src="images/img_110_instance.svg" />
              </Button>
              <Text size="s" as="p" className="!text-black-900_60 tracking-[1.50px] uppercase !font-medium">
                iTEM
              </Text>
            </div>
            <div className="flex flex-col items-center justify-start mt-[31px] ml-[3px] pb-0.5 gap-[3px] md:ml-0">
              <Button color="blue_gray_900_19" size="xl" shape="circle" className="w-[32px]">
                <Img src="images/img_110_instance.svg" />
              </Button>
              <Text size="s" as="p" className="!text-black-900_60 tracking-[1.50px] uppercase !font-medium">
                iTEM
              </Text>
            </div>
            <div className="flex flex-col items-center justify-start mt-[31px] ml-[3px] pb-0.5 gap-[3px] md:ml-0">
              <Button color="blue_gray_900_19" size="xl" shape="circle" className="w-[32px]">
                <Img src="images/img_110_instance.svg" />
              </Button>
              <Text size="s" as="p" className="!text-black-900_60 tracking-[1.50px] uppercase !font-medium">
                iTEM
              </Text>
            </div>
            <div className="flex flex-col items-center justify-start mt-[31px] ml-[3px] pb-0.5 gap-[3px] md:ml-0">
              <Button color="blue_gray_900_19" size="xl" shape="circle" className="w-[32px]">
                <Img src="images/img_110_instance.svg" />
              </Button>
              <Text size="s" as="p" className="!text-black-900_60 tracking-[1.50px] uppercase !font-medium">
                iTEM
              </Text>
            </div>
            <div className="flex flex-col items-center justify-start mt-[31px] ml-[3px] pb-0.5 gap-[3px] md:ml-0">
              <Button color="blue_gray_900_19" size="xl" shape="circle" className="w-[32px]">
                <Img src="images/img_110_instance.svg" />
              </Button>
              <Text size="s" as="p" className="!text-black-900_60 tracking-[1.50px] uppercase !font-medium">
                iTEM
              </Text>
            </div>
            <div className="flex flex-col items-center justify-start mt-[31px] ml-[3px] pb-0.5 gap-[3px] md:ml-0">
              <Button color="blue_gray_900_19" size="xl" shape="circle" className="w-[32px]">
                <Img src="images/img_110_instance.svg" />
              </Button>
              <Text size="s" as="p" className="!text-black-900_60 tracking-[1.50px] uppercase !font-medium">
                iTEM
              </Text>
            </div>
          </div>
          <div className="flex flex-col items-center justify-start w-[20%] md:h-auto bg-black-900_99">
            <div className="flex flex-col items-start justify-start w-[83%] md:w-full">
              <div className="flex flex-row justify-start items-start w-full gap-3">
                <div className="flex flex-col items-center justify-start w-[79%] pt-[17px]">
                  <div className="flex flex-col items-center justify-start w-full pb-2.5 gap-2.5 bg-blue_gray-900_19 rounded-[10px]">
                    <div className="flex flex-row justify-end w-full pb-2.5 px-2.5 rounded-tl-[10px] rounded-tr-[10px] bg-gray-200">
                      <div className="flex flex-row justify-end w-[17%] mb-14">
                        <div className="flex flex-col items-center justify-start w-full">
                          <Img
                            src="images/img_heart_outline_black_900.png"
                            alt="heartoutline"
                            className="w-[67%] md:h-auto sm:w-full z-[1] object-cover"
                          />
                          <Img
                            src="images/img_ellipse_1.png"
                            alt="imageone_one"
                            className="w-full md:h-auto sm:w-full mt-[-13px] opacity-0.5 object-cover"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-start justify-start w-[89%] md:w-full pt-[3px] gap-[5px]">
                      <Text as="p" className="!text-black-900_dd tracking-[0.10px]">
                        Subtitle 2
                      </Text>
                      <Text size="md" as="p" className="!text-black-900_99 tracking-[0.40px] !leading-4">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do{" "}
                      </Text>
                    </div>
                  </div>
                </div>
                <Button
                  color="black_900_60"
                  size="2xl"
                  shape="square"
                  className="mt-[17px] top-0 right-0 tracking-[0.50px] font-roboto font-bold min-w-[32px] normal-case no-underline fixed"
                >
                  X
                </Button>
              </div>
              <div className="flex flex-col w-[79%] gap-px">
                <div className="flex flex-col items-center justify-start w-full">
                  <div className="flex flex-col items-center justify-start w-full pb-2.5 gap-2.5 bg-blue_gray-900_19 rounded-[10px]">
                    <div className="flex flex-row justify-end w-full p-2.5 rounded-tl-[10px] rounded-tr-[10px] bg-gray-200">
                      <Button shape="circle" className="w-[24px] mb-14">
                        <Img src="images/img_heart_outline.svg" />
                      </Button>
                    </div>
                    <div className="flex flex-col items-start justify-start w-[89%] md:w-full pt-[3px] gap-[5px]">
                      <Text as="p" className="!text-black-900_dd tracking-[0.10px]">
                        Subtitle 2
                      </Text>
                      <Text size="md" as="p" className="!text-black-900_99 tracking-[0.40px] !leading-4">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do{" "}
                      </Text>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-center justify-start w-full">
                  <div className="flex flex-col items-center justify-start w-full pb-2.5 gap-2.5 bg-blue_gray-900_19 rounded-[10px]">
                    <div className="flex flex-row justify-end w-full p-2.5 rounded-tl-[10px] rounded-tr-[10px] bg-gray-200">
                      <Button shape="circle" className="w-[24px] mb-14">
                        <Img src="images/img_heart_outline.svg" />
                      </Button>
                    </div>
                    <div className="flex flex-col items-start justify-start w-[89%] md:w-full pt-[3px] gap-[5px]">
                      <Text as="p" className="!text-black-900_dd tracking-[0.10px]">
                        Subtitle 2
                      </Text>
                      <Text size="md" as="p" className="!text-black-900_99 tracking-[0.40px] !leading-4">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do{" "}
                      </Text>
                    </div>
                  </div>
                </div>
                <div className="h-[194px] w-full relative">
                  <div className="justify-center h-[194px] w-full left-0 bottom-0 right-0 top-0 m-auto bg-blue_gray-900_19 absolute rounded-[10px]" />
                  <div className="flex flex-col items-center justify-start w-full gap-[13px] top-0 right-0 left-0 m-auto absolute">
                    <div className="flex flex-row justify-end w-full p-2.5 rounded-tl-[10px] rounded-tr-[10px] bg-gray-200">
                      <Button shape="circle" className="w-[24px] mb-14">
                        <Img src="images/img_heart_outline.svg" />
                      </Button>
                    </div>
                    <div className="flex flex-col items-start justify-start w-[89%] md:w-full gap-[5px]">
                      <Text as="p" className="!text-black-900_dd tracking-[0.10px]">
                        Subtitle 2
                      </Text>
                      <Text size="md" as="p" className="!text-black-900_99 tracking-[0.40px] !leading-4">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do{" "}
                      </Text>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
