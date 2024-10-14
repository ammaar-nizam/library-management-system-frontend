import React from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa"; // Importing icons from react-icons
import "./Footer.css";

const Footer: React.FC = () => {
  return (
    <footer>
      <div className="footer-container">
        <div className="links">
          <a
            href="https://github.com/ammaar-nizam/"
            target="_blank"
          >
            <FaGithub size={24} /> 
          </a>
          <a
            href="https://www.linkedin.com/in/ammaar-nizam/"
            target="_blank"
          >
            <FaLinkedin size={24} />
          </a>
        </div>
        <p>© {new Date().getFullYear()} Ammaar Nizam. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
