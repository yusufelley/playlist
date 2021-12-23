import React from "react";
import { NavItems } from "./NavItems";

const Navbar = () => {
  return (
    <nav>
      <h1>Playlist</h1>
      <ul>
        {NavItems.map((e, i) => {
          return (
            <li key={i}>
              <a>{e.title}</a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
