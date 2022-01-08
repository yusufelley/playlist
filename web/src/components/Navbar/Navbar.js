import React from "react";
import { NavItems } from "./NavItems";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { BackButton } from "../Buttons/BackButton";

export const Navbar = () => {
  return (
    <nav className="navbar">
      <h1 className="logo-text">Playlist</h1>
      <ul className="nav-item-container">
        {NavItems.map((e, i) => {
          return (
            <li className="nav-item" key={i}>
              <Link className="nav-item-text" to={e.url} state={{}}>
                {e.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
