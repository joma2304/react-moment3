import { NavLink } from "react-router-dom";
import { useState } from "react";
import "./Header.css";

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header className="header">
            <div className="container">
                <h1 className="logo">Moment3</h1>
                <button onClick={() => setIsOpen(!isOpen)} className="menu-button">
                    {isOpen ? <span>&#10005;</span> : <span>&#9776;</span>}
                </button>
                <nav className={`nav ${isOpen ? 'open' : ''}`}>
                    <ul className="nav-list">
                        <li><NavLink to="/" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Start</NavLink></li>
                        <li><NavLink to="/admin" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Admin</NavLink></li>
                        <li><NavLink to="/login" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Inloggning</NavLink></li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}

export default Header;