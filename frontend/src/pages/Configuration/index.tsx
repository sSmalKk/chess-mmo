import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { CloseSVG } from "../../components/assets/images/close";
import { Text, Button, Img, Input, Heading } from "../../components";

const menuItems = {
  Home: ["homeicon_oneHome", "homeicon_oneHome2"],
  Friends: ["addfriends_oneFriends", "addfriends_oneFriends2"],
  Universe: ["homeicon_oneUniverse", "homeicon_oneUniverse2"],
  Sandbox: ["udropbox_oneSandbox", "udropbox_oneSandbox2"],
};

const playerConfigInputs = [
  { label: "Input 1", placeholder: "Placeholder 1" },
  { label: "Input 2", placeholder: "Placeholder 2" },
  { label: "Input 3", placeholder: "Placeholder 3" },
];

export default function Configuration() {
  const [searchBarValue34, setSearchBarValue34] = useState("");
  const [activeMenu, setActiveMenu] = useState("Home");

  return (
    <>
      <Helmet>
        <title>Role Player</title>
        <meta name="description" content="Web site created using create-react-app" />
      </Helmet>
      <div className="flex flex-row md:flex-row h-screen">
        {/* Sidebar */}
        <div className="w-full md:w-[23%] bg-white-A700 flex flex-col items-center justify-start p-5">
          <Heading size="xs" as="h1" className="text-black-900_dd font-montserrat">
            Mira Franci
          </Heading>
          <Text size="md" as="p" className="text-black-900_99 font-montserrat">
            mirafranci@mail.com
          </Text>
          <div className="flex flex-col mt-5">
            {Object.keys(menuItems).map((menu) => (
              <Button
                key={menu}
                leftIcon={<Img src={`images/img_${menu.toLowerCase()}_icon.svg`} alt={`${menu.toLowerCase()}icon_one`} />}
                className={`text-black-900_${activeMenu === menu ? "dd" : "60"} font-montserrat text-base font-bold min-w-full mb-2`}
                onClick={() => setActiveMenu(menu)}
              >
                {menu}
              </Button>
            ))}
            <Button
              leftIcon={<Img src="images/img_vector_black_900_1.svg" alt="vector_one" />}
              className={`text-black-900_${activeMenu === "Player Configuration" ? "dd" : "60"} font-montserrat text-base font-bold w-full mb-2`}
              onClick={() => setActiveMenu("Player Configuration")}
            >
              Player Configuration
            </Button>
          </div>
          <Button
            size="6xl"
            shape="square"
            className="w-full px-5 text-white-A700 font-montserrat font-bold bg-colors2 shadow-lg mt-auto"
          >
            Log Out
          </Button>
        </div>
        {/* Content */}
        <div className="w-full md:w-[77%] bg-black-900_99 p-5 overflow-y-auto">
          <Input
            size="md"
            name="search"
            placeholder="Search"
            value={searchBarValue34}
            onChange={(e) => setSearchBarValue34(e.target.value)}
            prefix={<Img src="images/img_search.svg" alt="search" className="cursor-pointer" />}
            suffix={
              searchBarValue34?.length > 0 ? (
                <CloseSVG onClick={() => setSearchBarValue34("")} height={14} width={14} fillColor="#000000ff" />
              ) : null
            }
            className="w-full text-white-A700 tracking-[0.50px] font-inter bg-white-A700 mt-5"
          />
          <div className="grid grid-cols-3 gap-5 mt-5">
            {activeMenu === "Player Configuration"
              ? playerConfigInputs.map((input, index) => (
                  <div key={index} className="flex flex-col items-start justify-start w-full pb-2.5 gap-2.5">
                    <Text as="p" className="text-white-A700 tracking-[0.10px]">{input.label}</Text>
                    <Input
                      size="md"
                      name={input.label}
                      placeholder={input.placeholder}
                      className="w-full text-white-A700 tracking-[0.50px] font-inter bg-white-A700"
                    />
                  </div>
                ))
              : menuItems[activeMenu].map((item, index) => (
                  <div key={index} className="flex flex-col items-center justify-start">
                    <div className="flex flex-col items-center justify-start w-full pb-2.5 gap-2.5 bg-blue_gray-900_19 rounded-[10px]">
                      <div className="flex flex-row justify-end w-full p-2.5 bg-gray-200 rounded-tl-[10px] rounded-tr-[10px]">
                        <Button shape="circle" className="w-[24px] mb-14">
                          <Img src="images/img_heart_outline.svg" />
                        </Button>
                      </div>
                      <div className="flex flex-col items-start justify-start w-[89%] md:w-full pt-[3px] gap-5">
                        <Text as="p" className="text-black-900_dd tracking-[0.10px]">
                          {item}
                        </Text>
                      </div>
                    </div>
                  </div>
                ))}
          </div>
        </div>
      </div>
    </>
  );
}
