import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Game from "components/Game";
import { Helmet } from "react-helmet";
import { Button, Input } from "../../components";
import Modal from "react-modal";

type UniverseData = {
  name: string;
  createdAt: string;
  age: number;
  startTime: string;
  hasTime: boolean;
  expansionRate: number;
  layers: number;
  seed: string;
};

const SandboxAdmin: React.FC = () => {
  const [userData, setUserData] = useState<any>(null);
  const [currentMenu, setCurrentMenu] = useState<string>("main");
  const [universes, setUniverses] = useState<UniverseData[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newUniverseData, setNewUniverseData] = useState<UniverseData>({
    name: "",
    createdAt: "",
    age: 1000,
    startTime: "",
    hasTime: false,
    expansionRate: 1,
    layers: 1,
    seed: "",
  });
  const [interfaceOpen, setInterfaceOpen] = useState<boolean>(true);

  const apiUrl = process.env.REACT_APP_API_URL || "";
  const token = localStorage.getItem("token") || process.env.JWT || "";
  const navigate = useNavigate();
  const startTimeRef = useRef<Date | null>(null);
  const sessionStartRef = useRef<string | null>(null);

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

    const intervalId = setInterval(() => {
      const currentTime = new Date();
      if (startTimeRef.current) {
        const timeElapsed = (currentTime.getTime() - startTimeRef.current.getTime()) / 1000;
        setNewUniverseData((prevData) => ({
          ...prevData,
          age: prevData.age + Math.round(timeElapsed),
          layers: Math.round((prevData.age / prevData.expansionRate) * 1),
        }));
      } else if (newUniverseData.hasTime) {
        startTimeRef.current = currentTime;
        sessionStartRef.current = currentTime.toLocaleTimeString();
        setNewUniverseData((prevData) => ({
          ...prevData,
          startTime: sessionStartRef.current,
        }));
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [token, navigate, newUniverseData.hasTime, newUniverseData.expansionRate]);

  const handleNewUniverseChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target) return; // Guard clause
    const { name, value, type, checked } = event.target;
    setNewUniverseData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleCreateUniverse = () => {
    const currentDate = new Date();
    const createdAt = currentDate.toISOString();

    const updatedUniverseData = { ...newUniverseData, createdAt };
    setUniverses([...universes, updatedUniverseData]);
    setIsModalOpen(false);
  };

  const renderMenuContent = () => {
    switch (currentMenu) {
      case "mine-universe":
        return (
          <div style={{zIndex:99}} className="flex bg-white justify-center items-center fixed inset-0">
            <div className="w-2/3 bg-white text-gray-900 p-4 rounded-lg shadow-lg">
              {universes.map((universe, index) => (
                <div key={index} className="world-card border p-2 mb-2">
                  <h2>{universe.name}</h2>
                  <p>Created At: {universe.createdAt}</p>
                  <p>Age: {universe.age}</p>
                  <p>Layers: {universe.layers}</p>
                </div>
              ))}
              <div className="w-full bg-gray-200 p-4 rounded-lg">
                <h2 className="text-xl font-bold mb-4">Create Universe</h2>
                <form className="space-y-4">
                  <div>
                    <label className="block mb-2">
                      Name:
                      <Input
                        type="text"
                        name="name"
                        value={newUniverseData.name}
                        onChange={handleNewUniverseChange}
                        className="input-field"
                      />
                    </label>
                  </div>
                  <div>
                    <label className="block mb-2">
                      Age:
                      <Input
                        type="number"
                        name="age"
                        value={newUniverseData.age}
                        onChange={handleNewUniverseChange}
                        min="0"
                        className="input-field"
                      />
                    </label>
                  </div>
                  <div>
                    <label className="flex items-center mb-2">
                      <Input
                        type="checkbox"
                        name="hasTime"
                        checked={newUniverseData.hasTime}
                        onChange={handleNewUniverseChange}
                        className="mr-2"
                      />
                      <span>Has Time</span>
                    </label>
                  </div>
                  <div>
                    <label className="block mb-2">
                      Expansion Rate:
                      <Input
                        type="number"
                        name="expansionRate"
                        value={newUniverseData.expansionRate}
                        onChange={handleNewUniverseChange}
                        min="0"
                        className="input-field"
                      />
                    </label>
                  </div>
                  <div>
                    <label className="block mb-2">
                      Seed:
                      <Input
                        type="text"
                        name="seed"
                        value={newUniverseData.seed}
                        onChange={handleNewUniverseChange}
                        className="input-field"
                      />
                    </label>
                  </div>
                  <div className="flex justify-between">
                    <Button type="button" onClick={handleCreateUniverse} className="button-primary">
                      Create
                    </Button>
                    <Button type="button" onClick={() => setIsModalOpen(false)} className="button-secondary">
                      Cancel
                    </Button>
                    <Button type="button" onClick={() => setCurrentMenu("main")} className="button-secondary">
                      Back
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        );
      case "enter-universe":
      case "settings":
      case "items":
        return (
          <div style={{zIndex:99}} className="flex bg-white justify-center items-center fixed inset-0">
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
          <div style={{zIndex:99}} className="flex bg-white justify-center items-center fixed inset-0">
            <div className="w-2/3 bg-white text-gray-900 p-4 rounded-lg shadow-lg">
              <h1>Main Menu</h1>
              <Button onClick={() => setCurrentMenu("mine-universe")} className="button-primary mt-4">
                Mine Universe
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
      {renderMenuContent()}
      <Game
        setInterfaceOpen={setInterfaceOpen}
        interfaceOpen={interfaceOpen}
        textures={["../assets/textures/dirt.jpg", "./assets/textures/grass.jpg"]}
        chunks={[
          {
            position: [1, 0, 0],
            cubesArray: [
              [0, 0, 0, 0, { position: [1, 0, 0], cubesArray: [[0, 0, 0, 0, 0]] }],
              [1, 0, 0, 1, 0],
            ],
          },
        ]}
        renderDistance={10}
        canPlayerFly={true}
        isMouseLocked={renderMenuContent}
      />
    </>
  );
};

export default SandboxAdmin;
