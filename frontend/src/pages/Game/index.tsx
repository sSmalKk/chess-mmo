import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css'; // Certifique-se de que este arquivo existe no mesmo diretório

function Game() {
  const [userData, setUserData] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [showMap, setShowMap] = useState<boolean>(false);
  const [boardCount, setBoardCount] = useState<{ columns: number, rows: number }>({ columns: 1, rows: 1 });

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

  useEffect(() => {
    const handleResize = () => {
      const boardSize = 100; // tamanho do tabuleiro em pixels
      const columns = Math.ceil(window.innerWidth / boardSize);
      const rows = Math.ceil(window.innerHeight / boardSize);
      setBoardCount({ columns, rows });
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!userData) {
    return null;
  }

  const handleMouseMove = (event: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    // Detecta a posição do mouse em relação ao canvas
    const canvas = event.currentTarget;
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    console.log("Mouse position on canvas:", { x, y });
  };

  return (
    <>
      <Helmet>
        <title>Chess MMO Game</title>
      </Helmet>

      <div className="game-container position-relative bg-black-900_60">
        <div className="chess-boards d-flex flex-wrap justify-content-center align-items-center">
          {[...Array(boardCount.rows * boardCount.columns)].map((_, index) => (
            <div key={index} className="chess-board border border-dark">
              {[...Array(8)].map((_, boardRowIndex) => (
                <div key={boardRowIndex} className="row no-gutters">
                  {[...Array(8)].map((_, boardColIndex) => (
                    <div
                      key={boardColIndex}
                      className={`col border ${boardRowIndex % 2 === boardColIndex % 2 ? 'bg-white' : 'bg-dark'}`}
                      style={{ paddingTop: '100%' }}
                    />
                  ))}
                </div>
              ))}
            </div>
          ))}
        </div>

        <div className="minimap position-absolute bottom-5 end-5">
          <canvas
            width="200"
            height="200"
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setShowMap(true)}
            onMouseLeave={() => setShowMap(false)}
            className="border border-white"
          />
          {showMap && (
            <div className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center overlay">
              <div className="map-viewer bg-white border border-black">
                <h2 className="text-center">Mapa Completo</h2>
                <canvas width="800" height="800" className="border border-black" />
              </div>
            </div>
          )}
        </div>

        <div className="bottom-bar bg-black-900_60 position-absolute w-100">
          <div className="container text-center">
            <p className="text-white">Barra Inferior</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Game;
