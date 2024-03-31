//import PropTypes from 'prop-types';
import { NavLink } from "react-router-dom";
import logo from "../images/EasyRecipesremovebg.png";

function Header() {
  return (
    <header className="header">
      <img src={logo} className="logo_er" alt="LogoEasyRecipes" />
      <h1 className="slogan">... because life is already hard enough</h1>
      <nav className="navBar">
        <NavLink className="linkNav" to="#">
          Home
        </NavLink>
        <NavLink className="linkNav" to="#">
          Login
        </NavLink>
        <NavLink className="linkNav" to="#">
          Sign in
        </NavLink>
        <NavLink className="linkNav" to="#">
          Close session
        </NavLink>
      </nav>
    </header>
  );
}

/* Header.propTypes = {
}; */

export default Header;
