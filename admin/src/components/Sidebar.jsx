import React from "react";
import { NavLink } from "react-router-dom";


const navLinks = [
  { name: "Dashboard", path: "dashboard" },
  { name: "Add Dish", path: "add-dish" }
];

const Sidebar = ({ onLinkClick }) => {
  return (
    <div>
      <ul>
        {navLinks.map((link, index) => (
          <li key={index}>
            <NavLink
              to={link.path}
              onClick={onLinkClick}
              end={link.path === "dashboard"}
              className={({ isActive }) => 
                isActive ? "active-link-class" : "normal-link-class"
              }
            >
              {link.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;