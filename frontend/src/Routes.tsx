import React from "react";
import { useRoutes } from "react-router-dom";
import NotFound from "pages/NotFound";
import Inventario from "pages/Inventory";
import LoginPage from "pages/Login";
import Landingpage from "pages/Landingpage";
import Register from "pages/Register";
import Configuration from "pages/Configuration";
import SandboxMenu from "pages/SandboxMenu";
import Loading from "pages/Loading";
import ItemCreator from "pages/ItemCreator";
import Post from "pages/Post";
import SandboxSurvival from "pages/SandboxSurvival";
import SandboxAdmin from "pages/SandboxAdmin";

const ProjectRoutes = () => {
  let element = useRoutes([
    {
      path: "/*",
      element: <NotFound />,
    },
    {
      path: "/Landingpage", //pagina de listas, precisa atualizar adicionanod objetos (tipo os presentes no posts pra linkar os recomendados) quando carrregar a pagina, alem disso precisa de um search e um input de categoria
      element: <Landingpage />,
    }, {
      path: "/sandboxmenu", //jogo em sim, primeira tela dps de logar, verdadeira "home", PRECISA GAMEFICAR A PARTIR DAQUI
      element: <SandboxMenu />,
    }, {
      path: "/sandboxsurvival", //jogo em sim, primeira tela dps de logar, verdadeira "home", PRECISA GAMEFICAR A PARTIR DAQUI
      element: <SandboxSurvival />,
    }, {
      path: "/sandboxadmin", //jogo em sim, primeira tela dps de logar, verdadeira "home", PRECISA GAMEFICAR A PARTIR DAQUI
      element: <SandboxAdmin />,
    }, {
      path: "/inventario", //modelo de inventario, vai de base logo logo
      element: <Inventario />,
    }, {
      path: "/", //tela que abre antes de logar
      element: <LoginPage />,
    },
    {
      path: "/register", // registro duhh
      element: <Register />,
    },
    {
      path: "/configuration",
      element: <Configuration />,
    },
    {
      path: "/loading",
      element: <Loading />,
    },
    {
      path: "/itemcreator",
      element: <ItemCreator />,
    },
    {
      path: "/post",
      element: <Post />,
    }
  ]);

  return element;
};

export default ProjectRoutes;
