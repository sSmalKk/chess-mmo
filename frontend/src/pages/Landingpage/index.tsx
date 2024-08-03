import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Slider, Card } from "../../components";
import Informativo from "../../components/Informativo"; // Adjusted path for Informativo component
import Footer from "../../components/Footer"; // Adjusted path for Footer component
import Header from "../../components/Header"; // Adjusted path for Header component

const LandingpagePage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [sliderData, setSliderData] = useState([]);
  const [gridData, setGridData] = useState([]);
  const [sidebarData, setSidebarData] = useState({ title: "Loading", text: "Loading" });
  const [userData, setUserData] = useState(null);
  const token = localStorage.getItem('token') || process.env.JWT;
  const apiUrl = process.env.REACT_APP_API_URL;
  const [devMode, setDevMode] = useState(false); // Estado para controlar o modo de desenvolvimento

  useEffect(() => {
    if (!token) {
      console.error('Token não configurado');
      return;
    }

    const fetchData = async () => {
      try {
        const sliderResponse = await fetch("URL_PARA_SLIDER");
        if (!sliderResponse.ok) {
          throw new Error("Failed to fetch slider data");
        }
        const sliderData = await sliderResponse.json();
        setSliderData(sliderData);

        const gridResponse = await fetch("URL_PARA_GRID");
        if (!gridResponse.ok) {
          throw new Error("Failed to fetch grid data");
        }
        const gridData = await gridResponse.json();
        setGridData(gridData);

        const sidebarResponse = await fetch("URL_PARA_SIDEBAR");
        if (!sidebarResponse.ok) {
          throw new Error("Failed to fetch sidebar data");
        }
        const sidebarData = await sidebarResponse.json();
        setSidebarData(sidebarData);

        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching landing page data:", error);
      }
    };

    fetchData();
  }, [token]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`${apiUrl}/admin/user/me`, {
          headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`,
          }
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }

        const data = await response.json();
        setUserData(data.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [token, apiUrl]);

  // If userData is not loaded, render null or an error message
  if (!userData) {
    return null; // or render an error message
  }

  return (
    <>
      <Helmet>
        <title>Role Player</title>
        <meta name="description" content="Web site created using create-react-app" />
      </Helmet>
      
      <div className="flex flex-col items-center justify-start w-full h-full bg-white-A700">
        <div className="flex flex-row md:flex-col justify-between items-start w-full p-5 md:gap-10 bg-indigo-A100_01">
          <div className="flex flex-col items-center justify-start w-[53%] md:w-full ml-20 pb-5 gap-5 my-5 md:ml-5 md:my-0">
            <div className="flex flex-row justify-center w-full">
              {isLoading ? (
                <div style={{ height: 482 }} className="animate-pulse bg-gray-300 flex flex-row justify-center w-full w-full md:h-auto sm:w-full object-cover "></div>
              ) : (
                <Slider
                  items={sliderData.map((item, index) => (
                    <img
                      key={index}
                      className="w-full md:h-auto sm:w-full object-cover"
                      src={item.url}
                      alt={item.alt}
                    />
                  ))}
                  centerMode={true}
                  magnifiedIndex={1}
                  activeSlideCSS="meu-classe-css-ativa"
                />
              )}
            </div>
            <div className="justify-center w-[88%] mt-[20.14px] mb-[19.86px] gap-[50px] grid-cols-3 sm:grid-cols-1 grid">
              {isLoading ? (
                Array.from({ length: 9 }, (_, index) => (
                  <div key={index} className="flex flex-col items-center justify-start w-full">
                    <div className="animate-pulse flex flex-col items-center justify-start w-full pb-2.5 gap-2.5 bg-blue_gray-900_19 rounded-[10px]">
                      <div className="animate-pulse flex flex-row justify-end w-full pb-2.5 px-2.5 rounded-tl-[10px] rounded-tr-[10px] bg-gray-200">
                        <div className="animate-pulse flex flex-row justify-end w-[17%] mb-14">
                          {/* Adjust placeholder content as needed */}
                        </div>
                      </div>
                      <div className="animate-pulse flex flex-col items-start justify-start w-full pt-[3px] gap-[5px] md:px-5 max-w-[143px]">
                        {/* Adjust placeholder content as needed */}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                gridData.map((item, index) => (
                  <Card
                    key={index}
                    imageoneOne={item.url}
                    title={item.title}
                    loremipsum={item.description}
                  />  
                ))
              )}
            </div>
          </div>
          <div className="flex flex-col w-[30%] md:w-full mt-5 mb-[699px] ml-[109px] mr-20 gap-10 md:mx-5 md:my-0">
            {isLoading ? (
              <div className="animate-pulse flex flex-col items-center justify-start w-full mt-10 gap-[9px] bg-black-900_99 rounded-[5px]">
                <div className="animate-pulse flex flex-row justify-center w-full pt-0.5">
                  <div className="animate-pulse flex flex-col items-start justify-start w-full">
                    <div className="animate-pulse h-[56px] w-full bg-black-900_dd" />
                  </div>
                </div>
                <div className="animate-pulse tracking-[0.20px] !font-urbanist !font-normal !leading-[19px]">
                  {/* Adjust placeholder content as needed */}
                </div>
              </div>
            ) : (
              <Informativo title={sidebarData.title} text={sidebarData.text} />
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default LandingpagePage;
