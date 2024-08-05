import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';

interface Piece {
  image: string;
  color: string;
  active: boolean;
  customColor: string;
}

const initialBoardState: Piece[][] = Array.from({ length: 8 }, () =>
  Array.from({ length: 8 }, () => ({
    image: "",
    color: "",
    active: false,
    customColor: "",
  }))
);

function Game() {
  const [userData, setUserData] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [showMap, setShowMap] = useState<boolean>(false);
  const [boardCount, setBoardCount] = useState<number>(1);
  const [boardState, setBoardState] = useState<Piece[][]>(initialBoardState);

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
    const handleResize = () => {
      const boardSize = 100;
      const columns = Math.floor(window.innerWidth / boardSize);
      setBoardCount(columns);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
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

  const handlePieceClick = (pieceId: number, boardId: number) => {
    console.log(`Piece ${pieceId} clicked on board ${boardId}`);
  };

  return (
    <>
      <Helmet>
        <title>Chess MMO Game</title>
      </Helmet>

      <div className="game-container position-relative">
        <div className="container-fluid">
          <div className="row justify-content-center">
            {[...Array(boardCount)].map((_, index) => (
              <div key={index} className="col-12 col-md-6 col-lg-4">
                <div className="chess-board-wrapper position-relative">
                  <div className="board-border bg-brown">
                    <div className="board-grid">
                      {[...Array(10)].map((_, rowIndex) => (
                        <div key={rowIndex} className="board-row">
                          {[...Array(10)].map((_, colIndex) => (
                            <div
                              key={colIndex}
                              className={`board-square ${rowIndex === 0 || rowIndex === 9 || colIndex === 0 || colIndex === 9 ? 'bg-red' : rowIndex % 2 === colIndex % 2 ? 'bg-white' : 'bg-dark'}`}
                              style={{
                                visibility: (rowIndex === 0 || rowIndex === 9 || colIndex === 0 || colIndex === 9) ? 'visible' : 'visible',
                                borderColor: (rowIndex === 0 || rowIndex === 9 || colIndex === 0 || colIndex === 9) ? 'red' : 'none',
                                pointerEvents: (rowIndex === 0 || rowIndex === 9 || colIndex === 0 || colIndex === 9) ? 'none' : 'auto',
                              }}
                              onClick={() => handlePieceClick(rowIndex * 8 + colIndex, index)}
                            >
                              {(rowIndex === 0 || rowIndex === 9) && (colIndex > 0 && colIndex < 9) && (
                                <div className="board-label">
                                  {String.fromCharCode(64 + colIndex)}
                                </div>
                              )}
                              {(colIndex === 0 || colIndex === 9) && (rowIndex > 0 && rowIndex < 9) && (
                                <div className="board-label">
                                  {9 - rowIndex}
                                </div>
                              )}
                              {(rowIndex > 0 && rowIndex < 9) && (colIndex > 0 && colIndex < 9) && (
                                <div
                                  className="piece"
                                  style={{
                                    backgroundColor: boardState[rowIndex - 1][colIndex - 1].active ? boardState[rowIndex - 1][colIndex - 1].customColor : 'transparent'
                                  }}
                                >
                                  {boardState[rowIndex - 1][colIndex - 1].active && (
                                    <button
                                      className="piece-button"
                                      onClick={() => handlePieceClick(rowIndex * 8 + colIndex, index)}
                                    >
                                      <img
                                        src={boardState[rowIndex - 1][colIndex - 1].image}
                                        alt="piece"
                                        className="piece-image"
                                      />
                                    </button>
                                  )}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
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
            <div className="map-overlay position-fixed top-0 start-0 w-100 h-100 bg-black bg-opacity-75 d-flex justify-content-center align-items-center">
              <div className="map-viewer w-75 h-75 bg-white position-relative">
                <h2 className="text-center">Mapa Completo</h2>
                <canvas width="800" height="800" className="border border-black w-100 h-100" />
                <button className="close-button position-absolute top-0 end-0 m-3 btn btn-danger" onClick={() => setShowMap(false)}>Fechar</button>
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
