import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Game from "components/Game";
import { Helmet } from "react-helmet";
import { Button, Input } from "../../components";
import Modal from "react-modal";
import "tailwindcss/tailwind.css"; // Ensure Tailwind CSS is imported

type UniverseSettings = {
  tickUpdate: boolean;
  tick: number;
  data: string;
  tickRate: number;
  resolution: number;
  xres: number;
  yres: number;
  zres: number;
  _id: boolean;
};

type UniverseData = {
  name: string;
  description: string;
  settings: UniverseSettings[];
  universeData: { teste: string };
  pattern: string;
  code: string;
  innerDim: string;
  God: string;
  sizeMax: string;
  size: number;
};

const initialUniverseData: UniverseData = {
  name: "",
  description: "",
  settings: [
    {
      tickUpdate: false,
      tick: 0,
      data: "",
      tickRate: 0,
      resolution: 0,
      xres: 0,
      yres: 0,
      zres: 0,
      _id: false,
    },
  ],
  universeData: { teste: "" },
  pattern: "",
  code: "",
  innerDim: "",
  God: "",
  sizeMax: "",
  size: 0,
};

const SandboxMenu: React.FC = () => {
  const [userData, setUserData] = useState<any>(null);
  const [currentMenu, setCurrentMenu] = useState<string>("main");
  const [universes, setUniverses] = useState<UniverseData[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newUniverseData, setNewUniverseData] = useState<UniverseData>(initialUniverseData);
  const [interfaceOpen, setInterfaceOpen] = useState<boolean>(true);

  const apiUrl = process.env.REACT_APP_API_URL || "";
  const token = localStorage.getItem("token") || process.env.JWT || "";
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      console.error("Token not configured");
      navigate("/");
      return;
    }

    const fetchUserData = async () => {
      try {
        const response = await fetch(`${apiUrl}/admin/user/me`, {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }

        const data = await response.json();
        setUserData(data.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
        navigate("/");
      }
    };

    fetchUserData();
  }, [token, navigate, apiUrl]);

  useEffect(() => {
    const fetchRecentUniverses = async () => {
      try {
        const response = await fetch(`${apiUrl}/admin/universe/list`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            query: {
              userId: userData?.id,
            },
            options: {
              sort: { createdAt: -1 },
              limit: 10,
            },
          }),
        });
        if (!response.ok) {
          throw new Error("Failed to fetch recent universes");
        }

        const data = await response.json();
        setUniverses(data.data.data);
      } catch (error) {
        console.error("Error fetching recent universes:", error);
      }
    };

    if (userData) {
      fetchRecentUniverses();
    }
  }, [userData, apiUrl, token]);

  const handleCreateUniverse = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const updatedUniverseData = {
      ...newUniverseData,
      settings: [
        {
          ...newUniverseData.settings[0],
          data: new Date().toISOString(),
        },
      ],
    };

    try {
      const response = await fetch(`${apiUrl}/admin/universe/create`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedUniverseData),
      });

      if (response.ok) {
        const data = await response.json();
        setNewUniverseData(initialUniverseData);
        setIsModalOpen(false);
      } else {
        const errorMessage = await response.text();
        console.error("Error creating universe:", errorMessage);
      }
    } catch (error) {
      console.error("Error creating universe:", error);
    }
  };

  const renderMenuContent = () => {
    switch (currentMenu) {
      case "mine-universe":
        return (
          <div className="flex bg-white justify-center items-center fixed inset-0">
            <div className="w-2/3 bg-white text-gray-900 p-4 rounded-lg shadow-lg relative">
              <div className="overflow-y-auto max-h-96 overflow-x-hidden">
                {universes.map((universe, index) => (
                  <div key={index} className="world-card border p-2 pr-4 mb-2 flex justify-content-between">
                    <div>
                      <h2>{universe.name}</h2>
                      <p>Description: {universe.description}</p>
                      <pre>{JSON.stringify(universe.settings, null, 2)}</pre>
                    </div>
                    <div>
                      <Button
                        style={{ background: "blue", color: "#fff" }}
                        onClick={() => setIsModalOpen(true)}
                        className="button-primary ml-4"
                      >
                        Load
                      </Button>
                      <Button
                        style={{ background: "gray", color: "#fff" }}
                        onClick={() => setIsModalOpen(true)}
                        className="button-primary ml-4"
                      >
                        Edit
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              <Button onClick={() => setIsModalOpen(true)} className="button-primary mt-4">
                Create New World
              </Button>
              <Button onClick={() => setCurrentMenu("main")} className="button-secondary mt-4">
                Back
              </Button>
            </div>
          </div>
        );
      case "enter-universe":
      case "settings":
      case "items":
        return (
          <div className="flex bg-white justify-center items-center fixed inset-0">
            <div className="w-2/3 bg-white text-gray-900 p-4 rounded-lg shadow-lg">
              <h1>{currentMenu === "enter-universe" ? "Enter Universe" : currentMenu === "settings" ? "Settings" : "Items"}</h1>
              <Button onClick={() => setCurrentMenu("main")} className="button-secondary mt-4">
                Back
              </Button>
            </div>
          </div>
        );
      case "main":
      default:
        return (
          <div className="flex w-1/3 bg-white justify-center items-center fixed inset-0">
            <div className="w-2/3 bg-white text-gray-900 justify-center items-center p-4 rounded-lg shadow-lg">
              <h1>Welcome {userData && userData.username ? userData.username : "User"}</h1>
              <Button onClick={() => setCurrentMenu("mine-universe")} className="button-primary mt-4">
                My Universes
              </Button>
              <Button onClick={() => setCurrentMenu("enter-universe")} className="button-primary mt-4">
                Enter Universe
              </Button>
              <Button onClick={() => setCurrentMenu("settings")} className="button-primary mt-4">
                Settings
              </Button>
              <Button onClick={() => setCurrentMenu("items")} className="button-primary mt-4">
                Items
              </Button>
            </div>
          </div>
        );
    }
  };

  return (
    <>
      <Helmet>
        <title>Sandbox Menu</title>
      </Helmet>
      <div className={`flex bg-white justify-center items-center fixed inset-0 interface ${interfaceOpen ? "open" : "closed"}`}>
        {renderMenuContent()}
      </div>
      <Modal style={{ zIndex: 100 }} isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)} className="Modal" overlayClassName="Overlay">

        <div className="flex justify-center items-center fixed inset-0">
          <div className="flex flex-row bg-gray-200 p-4 rounded-lg">
            <form onSubmit={handleCreateUniverse} className="space-y-4">
              <div>
                <label className="block mb-2">
                  Name:
                  <Input
                    type="text"
                    name="name"
                    required
                    className="w-full"
                  />
                </label>
              </div>
              <div>
                <label className="block mb-2">
                  Description:
                  <Input
                    type="text"
                    name="description"
                    className="w-full"
                  />
                </label>
              </div>
              <div>
                <label className="block mb-2">
                  Data:
                  <Input
                    type="text"
                    name="data"
                    className="w-full"
                  />
                </label>
              </div>
              <div>
                <label className="block mb-2">
                  Code:
                  <Input
                    type="text"
                    name="code"
                    className="w-full"
                  />
                </label>
              </div>
              <div className="flex justify-between mt-4">
                <Button type="submit" className="button-primary">
                  Save
                </Button>
                <Button onClick={() => setIsModalOpen(false)} className="button-secondary">
                  Close
                </Button>
              </div>
            </form>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default SandboxMenu;
