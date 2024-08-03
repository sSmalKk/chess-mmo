  import React, { useState, useEffect } from "react";
  import "./Chat.css";
  const token = localStorage.getItem('token');

  function Chat({ groupId, onHoveredSenderChange }) {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
      fetchMessages();
    }, [groupId]); 

    const fetchMessages = async () => {
      try {
        setLoading(true);

        const requestBody = {
          "query": {
            "groupId": groupId
          },
          "options": {
            "select": [
              "message",
              "sender",
              "createdAt"
            ],
            "sort": "-createdAt", 
            "limit": 10,           
            "pagination": false    
          },
          "isCountOnly": false
        }
        
        const response = await fetch("http://localhost:5000/admin/chat_message/list", {
          method: "POST", 
          headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ZWExOGVkNTc5YTQ1OTA4NjA2YWU0YiIsInVzZXJuYW1lIjoiYWRtIiwiaWF0IjoxNzA5ODQwNjIyLCJleHAiOjE3MTA0NDA2MjJ9.SnwHfHQpV0dT3WRgWckhtGrrlILcPA30NaJcEJAPWGM`,
            'Credentials': 'include',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
          throw new Error("Failed to fetch messages");
        }

        const data = await response.json();
        
        console.log("data:");
        console.log(data);

  if (Array.isArray(data.data.data)) {
    setMessages(data.data.data); // Acessando corretamente as mensagens
  } else {
    setMessages([]); // Defina as mensagens como um array vazio se data.data.data não for um array
  }
            } catch (error) {
        console.error("Error fetching messages:", error);
      } finally {
        setLoading(false);
      }
    };

    const handleMouseEnter = (senderId) => {
      onHoveredSenderChange(senderId);
    };

    const handleMouseLeave = () => {
      onHoveredSenderChange(null);
    };
    const handleClick = (location) => {
      console.log("mensagens:", [messages]);
    };
    return (
      <div onClick={handleClick} className="flex flex-col items-start justify-start w-full h-full overflow-t  -auto">
      te
        {messages.map((message, index) => (
          <div
            key={index}
            className="flex flex-row items-center justify-start w-full"
            onMouseEnter={() => handleMouseEnter(message.sender)}
            onMouseLeave={handleMouseLeave}
          >
  <span className="font-bold mr-2">{message.sender}</span>
  <span>{message.message}</span>
  <span>{new Date(message.createdAt).toLocaleString()}</span>
          </div>
        ))}
        {loading && <div>Loading...</div>}
      </div>
    );
  }

  export default Chat;
