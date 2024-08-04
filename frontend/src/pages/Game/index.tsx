import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import "./style.css"

function Game() {
  const [userData, setUserData] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [showMap, setShowMap] = useState<boolean>(false);
  const [boardCount, setBoardCount] = useState<{ rows: number, cols: number }>({ rows: 1, cols: 1 });

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

  useEffect(() => {
    const calculateBoards = () => {
      const boardSize = 50; // size of one square in the chess board
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      const cols = Math.ceil(windowWidth / (boardSize * 8));
      const rows = Math.ceil(windowHeight / (boardSize * 8));
      setBoardCount({ rows, cols });
    };

    calculateBoards();
    window.addEventListener('resize', calculateBoards);

    return () => {
      window.removeEventListener('resize', calculateBoards);
    };
  }, []);

  if (!userData) {
    return null;
  }

  const handleMouseMove = (event: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
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

      <div className="game-container bg-black-900_60 position-relative w-100 h-100 overflow-hidden d-flex align-items-center justify-content-center">
        <div className="boards-wrapper d-flex flex-wrap justify-content-center align-items-center">
          {[...Array(boardCount.rows)].map((_, rowIndex) => (
            [...Array(boardCount.cols)].map((_, colIndex) => (
              <div key={`${rowIndex}-${colIndex}`} className="board-container">
                {[...Array(8)].map((_, row) => (
                  <div key={row} className="row no-gutters">
                    {[...Array(8)].map((_, col) => (
                      <div
                        key={col}
                        className={`col border ${row % 2 === col % 2 ? 'bg-white' : 'bg-dark'}`}
                        style={{ width: '50px', height: '50px' }}
                      />
                    ))}
                  </div>
                ))}
              </div>
            ))
          ))}
        </div>

        <div className="minimap position-absolute bottom-0 end-0 m-3 bg-black-900_60">
          <canvas
            width="200"
            height="200"
            onMouseMove={handleMouseMove}
            onClick={() => setShowMap(!showMap)}
            className="border border-white"
          />
          {showMap && (
            <div className="position-fixed top-0 start-0 w-100 h-100 bg-black bg-opacity-75 d-flex justify-content-center align-items-center">
              <div className="map-viewer w-100 h-100 bg-white">
                <h2 className="text-center">Mapa Completo</h2>
                <canvas width="800" height="800" className="border border-black" />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Game;
