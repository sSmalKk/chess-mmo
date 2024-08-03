import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

function Menu() {
  const [userData, setUserData] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<string>('menu');
  const [gameSize, setGameSize] = useState<number>(8);
  const [gameId, setGameId] = useState<string>('');
  const [pieceData, setPieceData] = useState<any>({ name: '', type: '' });

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

  const startGame = async () => {
    try {
      const response = await fetch(`${apiUrl}/admin/game/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ size: gameSize, addedBy: userData._id })
      });

      if (!response.ok) {
        throw new Error('Failed to start game');
      }

      const data = await response.json();
      console.log('Game started:', data);
      setCurrentPage('menu');
    } catch (error) {
      console.error('Error starting game:', error);
    }
  };

  const joinGame = async () => {
    try {
      // Exemplo de endpoint para entrar em um jogo
      const response = await fetch(`${apiUrl}/admin/game/join`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ gameId, userId: userData._id })
      });

      if (!response.ok) {
        throw new Error('Failed to join game');
      }

      const data = await response.json();
      console.log('Joined game:', data);
      setCurrentPage('menu');
    } catch (error) {
      console.error('Error joining game:', error);
    }
  };

  const createPiece = async () => {
    try {
      // Exemplo de endpoint para criar uma peça
      const response = await fetch(`${apiUrl}/admin/piece/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ ...pieceData, addedBy: userData._id })
      });

      if (!response.ok) {
        throw new Error('Failed to create piece');
      }

      const data = await response.json();
      console.log('Piece created:', data);
      setCurrentPage('menu');
    } catch (error) {
      console.error('Error creating piece:', error);
    }
  };

  if (!userData) {
    return null;
  }

  const renderPageContent = () => {
    switch (currentPage) {
      case 'menu':
        return (
          <div className="flex flex-col items-center gap-6 w-full max-w-md">
            <button onClick={() => setCurrentPage('startGame')} className="bg-green-700 text-white py-3 px-6 rounded text-xl w-full hover:bg-green-600">Iniciar Jogo</button>
            <button onClick={() => setCurrentPage('joinGame')} className="bg-blue-700 text-white py-3 px-6 rounded text-xl w-full hover:bg-blue-600">Entrar em Jogo</button>
            {isAdmin && <button onClick={() => setCurrentPage('createPiece')} className="bg-red-700 text-white py-3 px-6 rounded text-xl w-full hover:bg-red-600">Criar Peças</button>}
          </div>
        );
      case 'startGame':
        return (
          <div className="flex flex-col items-center gap-6 w-full max-w-md">
            <h2 className="text-white text-2xl mb-4">Iniciar Partida</h2>
            <input
              type="number"
              value={gameSize}
              onChange={(e) => setGameSize(Number(e.target.value))}
              className="w-full p-3 rounded"
              placeholder="Tamanho do jogo"
            />
            <button onClick={startGame} className="bg-green-700 text-white py-3 px-6 rounded text-xl w-full hover:bg-green-600">Iniciar</button>
            <button onClick={() => setCurrentPage('menu')} className="mt-4 bg-red-700 text-white py-2 px-4 rounded hover:bg-red-600">Voltar</button>
          </div>
        );
      case 'joinGame':
        return (
          <div className="flex flex-col items-center gap-6 w-full max-w-md">
            <h2 className="text-white text-2xl mb-4">Entrar em Partida</h2>
            <input
              type="text"
              value={gameId}
              onChange={(e) => setGameId(e.target.value)}
              className="w-full p-3 rounded"
              placeholder="ID do jogo"
            />
            <button onClick={joinGame} className="bg-blue-700 text-white py-3 px-6 rounded text-xl w-full hover:bg-blue-600">Entrar</button>
            <button onClick={() => setCurrentPage('menu')} className="mt-4 bg-red-700 text-white py-2 px-4 rounded hover:bg-red-600">Voltar</button>
          </div>
        );
      case 'createPiece':
        return (
          <div className="flex flex-col items-center gap-6 w-full max-w-md">
            <h2 className="text-white text-2xl mb-4">Criar Peça</h2>
            <input
              type="text"
              value={pieceData.name}
              onChange={(e) => setPieceData({ ...pieceData, name: e.target.value })}
              className="w-full p-3 rounded"
              placeholder="Nome da Peça"
            />
            <input
              type="text"
              value={pieceData.type}
              onChange={(e) => setPieceData({ ...pieceData, type: e.target.value })}
              className="w-full p-3 rounded"
              placeholder="Tipo da Peça"
            />
            <button onClick={createPiece} className="bg-red-700 text-white py-3 px-6 rounded text-xl w-full hover:bg-red-600">Criar</button>
            <button onClick={() => setCurrentPage('menu')} className="mt-4 bg-red-700 text-white py-2 px-4 rounded hover:bg-red-600">Voltar</button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <Helmet>
        <title>Sandbox Admin</title>
      </Helmet>

      <div className="bg-black min-h-screen flex items-center justify-center">
        <div className="menu bg-black-900_60 p-10 rounded-lg flex flex-col items-center w-full max-w-2xl">
          <h1 className="text-white text-4xl mb-8 text-center">Sandbox Admin</h1>
          {renderPageContent()}
        </div>
      </div>
    </>
  );
}

export default Menu;
