import React from "react";
import { Text, Button, Img } from "./..";

interface Props {
  className?: string;
}

export default function Footer({ ...props }: Props) {
  return (
    <footer {...props}>
      <div className="flex flex-row md:flex-col justify-center items-center w-full pl-20 pr-14 gap-9 md:gap-5 md:px-5 bg-black-900_dd">
        <div className="flex flex-row justify-start w-[32%] md:w-full gap-3">
          <Button size="3xl" shape="round" className="w-[36px]">
            <Img src="images/img_u_linkedin_alt.svg" />
          </Button>
          <Button size="3xl" shape="round" className="w-[36px]">
            <Img src="images/img_u_facebook.svg" />
          </Button>
          <Button size="3xl" shape="round" className="w-[36px]">
            <Img src="images/img_u_instagram.svg" />
          </Button>
          <Button size="3xl" shape="round" className="w-[36px]">
            <Img src="images/img_u_twitter_alt.svg" />
          </Button>
          <Button size="3xl" shape="round" className="w-[36px]">
            <Img src="images/img_u_twitter_alt.svg" />
          </Button>
          <Button size="3xl" shape="round" className="w-[36px]">
            <Img src="images/img_u_twitter_alt.svg" />
          </Button>
          <Button size="3xl" shape="round" className="w-[36px]">
            <Img src="images/img_u_twitter_alt.svg" />
          </Button>
          <Button size="3xl" shape="round" className="w-[36px]">
            <Img src="images/img_u_twitter_alt.svg" />
          </Button>
        </div>
        <div className="flex flex-col items-center justify-start w-[64%] md:w-full gap-2.5">
          <div className="flex flex-row md:flex-col justify-center w-full md:gap-5">
            <div className="flex flex-col items-center justify-start w-[91%] md:w-full gap-7 border-white-A700 border border-solid">
              <div className="flex flex-col items-start justify-start w-[47%] md:w-full gap-[5px]">
                <Text size="md" as="p" className="tracking-[0.50px] !font-inter">
                  ContactForm
                </Text>
                <div className="flex flex-col items-center justify-start w-full pt-2 gap-2">
                  <div className="flex flex-row justify-start w-full">
                    <Text size="md" as="p" className="mt-px ml-[3px] tracking-[0.50px] !font-inter">
                      example@example.com
                    </Text>
                  </div>
                  <div className="h-px w-full bg-white-A700" />
                </div>
              </div>
              <div className="flex flex-row justify-center w-[47%] md:w-full">
                <div className="flex flex-col items-center justify-start w-full pt-2 gap-2">
                  <div className="flex flex-row justify-start w-full">
                    <Text size="md" as="p" className="mt-px ml-[3px] tracking-[0.50px] !font-inter">
                      Mensage
                    </Text>
                  </div>
                  <div className="h-px w-full bg-white-A700" />
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center w-[10%] md:h-auto p-4 border-white-A700 border border-solid bg-blue_gray-900_19 rounded-[3px]">
              <Text size="md" as="p" className="mt-9 mb-[37px] tracking-[0.50px] !font-inter">
                Button
              </Text>
            </div>
          </div>
          <Text size="md" as="p" className="tracking-[0.50px] !font-inter !leading-4">
          ©2024 Todos os direitos reservados.
          </Text>
        </div>
      </div>
    </footer>
  );
}
