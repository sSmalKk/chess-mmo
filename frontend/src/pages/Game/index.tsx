import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

function Game() {
  const [userData, setUserData] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  const apiUrl = process.env.REACT_APP_API_URL;
  const token = localStorage.getItem('token') || process.env.JWT;
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      console.error('Token não configurado');
      navigate("/");
      return;
    }

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

        // Verifica se o usuário é administrador
        if (data.data.userType === 'Admin') {
          setIsAdmin(true);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        navigate("/");
      }
    };

    fetchUserData();
  }, [token, navigate, apiUrl]);

  if (!userData) {
    return null;
  }

  const handleStartGame = () => {
    navigate('/game/start');
  };

  const handleJoinGame = () => {
    navigate('/game/join');
  };

  const handleCreatePiece = () => {
    navigate('/admin/create-piece');
  };

  return (
    <>
      <Helmet>
        <title>Sandbox Admin</title>
      </Helmet>

      <div className="menu">
        <h1>Menu Principal</h1>
        <button onClick={handleStartGame}>Iniciar Jogo</button>
        <button onClick={handleJoinGame}>Entrar em Jogo</button>
        {isAdmin && <button onClick={handleCreatePiece}>Criar Peças</button>}
      </div>
    </>
  );
}

export default Game;
