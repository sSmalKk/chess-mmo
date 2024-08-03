  import { Button } from "components";
  import Inventory from "components/Inventory";
  import SlotItem from "components/Itemholder";
  import Perfil from "components/Perfil";
  import Chat from "components/chat";
  import Dropdown from "components/dropdown";
  import Hand from "components/hand";
  import React, { useEffect, useState } from "react";
  import { Helmet } from "react-helmet";
  const token = localStorage.getItem('token');

  export default function Inventario() {
    const [inputValue, setInputValue] = useState("");
    const [userData, setUserData] = useState(null);

    useEffect(() => {
      fetchUserData();
    }, []);
  
    const fetchUserData = async () => {
      try {
        const response = await fetch("http://localhost:5000/admin/user/me", {
          method: "GET",
          headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`,
            'Credentials': 'include'
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
  
    const handleInputChange = (event) => {
      setInputValue(event.target.value);
    };
    const currentTime = new Date(); // Obtém a hora atual

    const createMessage = async () => {
      const requestBody = {
        message: inputValue,
        sender: "Optional",
        recipient: "Fantastic",
        createdAt: currentTime // Adiciona a hora atual ao requestBody

      };

      try {
        const response = await fetch("http://localhost:5000/admin/chat_message/create", {
          method: "POST",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
            'Credentials': 'include'
          },
          body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
          throw new Error("Failed to create message");
        }

        console.log("Message created successfully");
      } catch (error) {
        console.error("Error creating message:", error);
      }
    };

    const [hoveredSender, setHoveredSender] = useState(null);

    const handleHoveredSenderChange = (sender) => {
      setHoveredSender(sender);
    };

    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const [isInventoryOpen, setIsInventoryOpen] = useState(false);

    const toggleInventory = () => {
      setIsInventoryOpen(!isInventoryOpen);
    };

    const setChat = () => {};
    const handleClick = (location) => {
      console.log("Item clicado na localização:", location);
    };
    useEffect(() => {
      const updateStatus = async () => {
        try {
          const response = await fetch("http://localhost:5000/admin/user/partial-update/{id}", {
            method: "POST",
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
              'Credentials': 'include'
            },
            body: JSON.stringify({
              "status": "online"
            })
          });
    
          if (!response.ok) {
            throw new Error("Failed to create message");
          }
    
          console.log("Status Update");
        } catch (error) {
          console.error("Error updating status:", error);
        }
      };
  
      // Call the function to update status
      updateStatus();
    }, []);     return (
      <>
      <Helmet>
        <title>Role Player</title>
        <meta
          name="description"
          content="Web site created using create-react-app"
        />
      </Helmet>
      <div className="flex flex-row justify-center w-full bg-white-A700" onMouseMove={handleMouseMove}>
        <div className="flex-col items-start justify-start w-full h-full block">
          <div style={{ justifyContent: "space-between" }} className="flex w-full justify-space-between">
            {userData ? (
              <Perfil
                  heading={`Username: ${userData.username}`}
                  Status={` ${userData.status}`}
                  text={`Username: ${userData.username}`}
                  className="top-right-0" life={userData.life}              />
            ) : (
              <p>Loading user data...</p>
            )}
             {hoveredSender ? (
              <Perfil
                  heading="heading"
                  Status="Online"
                  text={`Username: ${hoveredSender}`}
                  className="top-left-0" life={0}              />
              

            ) : (
              <div/>
            )}
          </div>

          

            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50"></div>
            {isInventoryOpen && (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
    
          <Inventory
                

                  bottomleft={[{
                    name: "mochila",
                    value: 30,
                    x: 12,
                    y: 12,
                    img: "/images/assets/textures/block/purple_wool.png",
                    innerimg: "#ffff55",
                    storage: [{
                      name: "mochila",
                      value: 30,
                      x: 1,
                      y: 2,
                      img: "/images/assets/textures/block/purple_wool.png"
                    }] // Você pode adicionar itens aqui para preencher o armazenamento
                  }]}

                  bottommid={[{
                    name: "mochila",
                    value: 30,
                    x: 12,
                    y: 12,
                    img: "/images/assets/textures/block/purple_wool.png",
                    innerimg: "#ffff55",
                    storage: [{
                      name: "mochila",
                      value: 30,
                      x: 1,
                      y: 2,
                      img: "/images/assets/textures/block/purple_wool.png"
                    }] // Você pode adicionar itens aqui para preencher o armazenamento
                  }]}

                  bottomright={[{
                    name: "mochila",
                    value: 30,
                    x: 12,
                    y: 12,
                    img: "/images/assets/textures/block/purple_wool.png",
                    innerimg: "#ffff55",
                    storage: [{
                      name: "mochila",
                      value: 30,
                      x: 1,
                      y: 2,
                      img: "/images/assets/textures/block/purple_wool.png"
                    }] // Você pode adicionar itens aqui para preencher o armazenamento
                  }]}


                  topmid={[{
                    name: "mochila",
                    value: 30,
                    x: 12,
                    y: 12,
                    img: "/images/assets/textures/block/purple_wool.png",
                    innerimg: "#ffff55",
                    storage: [{
                      name: "mochila",
                      value: 30,
                      x: 1,
                      y: 2,
                      img: "/images/assets/textures/block/purple_wool.png"
                    }] // Você pode adicionar itens aqui para preencher o armazenamento
                  }]} topleft={[{
                    name: "mochila",
                    value: 30,
                    x: 12,
                    y: 12,
                    img: "/images/assets/textures/block/purple_wool.png",
                    innerimg: "#ffff55",
                    storage: [{
                      name: "mochila",
                      value: 30,
                      x: 1,
                      y: 2,
                      img: "/images/assets/textures/block/purple_wool.png"
                    }] // Você pode adicionar itens aqui para preencher o armazenamento
                  }]} topright={[{
                    name: "mochila",
                    value: 30,
                    x: 12,
                    y: 12,
                    img: "/images/assets/textures/block/purple_wool.png",
                    innerimg: "#ffff55",
                    storage: [{
                      name: "mochila",
                      value: 30,
                      x: 1,
                      y: 2,
                      img: "/images/assets/textures/block/purple_wool.png"
                    }] // Você pode adicionar itens aqui para preencher o armazenamento
                  }]}/></div>

                  


              
            )}
          <div className="  flex-row justify-between items-end w-full mt-[180px] overflow-auto">
              <div style={{zIndex:99}} className="flex flex-row justify-between w-[21%] left-0 bottom-0 fixed">
              <SlotItem
                  id={''}
                  color={''}
                  title={''}
                  text={'LeftHand   '}
                  number={0}
                  img={'/images/default_image.svg'}
                  imgHolder={'empty'}
                  imageSize={64}
                  holderSize={96}
                  config={{
                    data: [],
                    textPosition: 'bottom',
                    showNumber: true,
                    showId: true,
                    showHolder: true,
                    border: true,
                    borderColor: '#ffff55',
                    hoverEffect: 'none'
                  }} onClick={function (locationData: Location): void {
                    throw new Error("Function not implemented.");
                  } }/>
  <SlotItem
                  id={''}
                  color={''}
                  title={''}
                  text={'RihtHand'}
                  number={0}
                  img={'/images/default_image.svg'}
                  imgHolder={'empty'}
                  imageSize={64}
                  holderSize={96}
                  config={{
                    data: [],
                    textPosition: 'bottom',
                    showNumber: true,
                    showId: true,
                    showHolder: true,
                    border: true,
                    borderColor: '#ffff55',
                    hoverEffect: 'none'
                  }} onClick={function (locationData: Location): void {
                    throw new Error("Function not implemented.");
                  } }/>
                <div style={{ width: "100%" }} onClick={toggleInventory}>
                <SlotItem
                    id={''}
                    color={''}
                    title={''}
                    text={'inventory'}
                    number={0}
                    img={'/images/default_image.svg'}
                    imgHolder={'empty'}
                    imageSize={64}
                    holderSize={96}
                    config={{
                      data: [],
                      textPosition: 'bottom',
                      showNumber: true,
                      showId: true,
                      showHolder: true,
                      border: true,
                      borderColor: '#ffff55',
                      hoverEffect: 'none'
                    }} onClick={function (locationData: Location): void {
                      throw new Error("Function not implemented.");
                    } }/>
                </div>
              </div>
              <Hand
                id={''}
                color={'#ff4455'}
                title={"text"}
                text={"text"}
                number={0}
                img={'/images/default_image.svg'}
                imgHolder={''}
                imageSize={64}
                holderSize={64}
                config={{
                  data: [],
                  textPosition: 'bottom',
                  showNumber: false,
                  showId: false,
                  showHolder: false,
                  border: false,
                  borderColor: '',
                  hoverEffect: ''
                }}
                onClick={handleClick} setShowItem={false} 
                xmouse={mousePosition.x} ymouse={mousePosition.y}
  />
  
              <div className="flex flex-row justify-center items-end w-[36%] bottom-0 right-0 fixed">
                <Dropdown onSelect={setChat} />
                <div className="flex flex-col items-center justify-start w-[85%] gap-9">

                <Chat
                    onHoveredSenderChange={handleHoveredSenderChange} groupId={"65ea1974f88b40e708201eef"} />


                  <div className="flex flex-row justify-center w-full">
                    <div className="flex flex-row justify-center w-[82%]">
                    <input  
                        type="text"
                        name="input_one"
                        placeholder="Input text"
                        value={inputValue}
                        onChange={handleInputChange}
                        className="w-full font-bold"/>
                    </div>

                    <Button  onClick={createMessage}>Create Message</Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          </div>
      </>
    );
  }