import React from "react";
import "./Header.css";
import { Link, NavLink } from "react-router-dom";

const Header = () => {
  return (
    <section>
      <div>
        <div>
          <Link to="/">
            <img src="./favicon.png" alt="logo" />
          </Link>
          <h1>Easy Library</h1>
        </div>
        <p>Hello, Ammaar!</p>
      </div>
    </section>
  );
};

export default Header;
