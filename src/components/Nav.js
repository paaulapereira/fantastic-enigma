import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMusic } from "@fortawesome/free-solid-svg-icons";
import logo from "../img/logo.png";

const Nav = ({ setLibraryStatus, libraryStatus }) => {
  return (
    <nav>
      <img src={logo} alt="logo" srcset="" />

      <button onClick={() => setLibraryStatus(!libraryStatus)}>
        More Songs
      </button>
    </nav>
  );
};
export default Nav;

//()=> setLibraryStatus(!libraryStatus) es una funcion que cambia el state al contrario del valor que estaba
