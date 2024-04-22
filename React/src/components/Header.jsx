import { NavLink } from "react-router-dom";
import logo from "../images/EasyRecipesremovebg.png";

function Header() {
  return (
    <header className="header">
      <img src={logo} className="logo_er" alt="LogoEasyRecipes" />
      <h1 className="slogan hiddenSlogan">
        because life is already hard enough
      </h1>
      <div className="navigationDiv">
        <div className="headerSquare hs-hidden">
          <i className="fa-solid fa-burger iconburger"></i>
        </div>
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
            Log out
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

export default Header;
