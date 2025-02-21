import { NavLink } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import "./Header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";


const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const {user, logout} = useAuth();

  return (
    <header className="header">
      <div className="container">
        <NavLink to="/" className="logo">
          <img src="/logotyp2.png" alt="Moment3 Logo" className="logo-img" />
        </NavLink>

        <button onClick={() => setIsOpen(!isOpen)} className="menu-button">
    <FontAwesomeIcon icon={isOpen ? faTimes : faBars} />
</button>
        <nav className={`nav ${isOpen ? 'open' : ''}`}>
          <ul className="nav-list">
            <li><NavLink to="/" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Start</NavLink></li>
            <li><NavLink to="/admin" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Admin</NavLink></li>
            <li>
              {
                !user ? <NavLink to="/login" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Inloggning</NavLink> : <button onClick={logout} className="logOutBtn">Logga ut</button>
              }
              </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;