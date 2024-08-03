import React from "react";
import { useRoutes } from "react-router-dom";
import NotFound from "pages/NotFound";
import LoginPage from "pages/Login";
import Menu from "pages/Menu";
import Game from "pages/Game";

const ProjectRoutes = () => {
  let element = useRoutes([
    {
      path: "/*",
      element: <NotFound />,
    },
    {
      path: "/menu", //pagina de listas, precisa atualizar adicionanod objetos (tipo os presentes no posts pra linkar os recomendados) quando carrregar a pagina, alem disso precisa de um search e um input de categoria
      element: <Menu />,
    }, {
      path: "/game", //jogo em sim, primeira tela dps de logar, verdadeira "home", PRECISA GAMEFICAR A PARTIR DAQUI
      element: <Game />,
    }, {
      path: "/", //tela que abre antes de logar
      element: <LoginPage />,
    }
  ]);

  return element;
};

export default ProjectRoutes;
