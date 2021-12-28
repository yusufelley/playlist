import React from "react";
import { NavItems } from "./NavItems";
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav>
      <h1>Navbar</h1>
      <ul>
        {NavItems.map((e, i) => {
          return (
            <li key={i}>
              <Link to={e.url} state={{}}>
                {e.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
