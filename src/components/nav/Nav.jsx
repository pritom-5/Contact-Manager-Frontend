import { useContext } from "react";
import { Link } from "react-router-dom";
import AuthCtx from "../../context/AuthCtx";
import css from "./Nav.module.css";

export default function Nav() {
  const { isLoggedIn } = useContext(AuthCtx);
  return (
    <div className={css.nav_section}>
      {/* home contacts usericon */}
      {!isLoggedIn && (
        <li>
          <Link to={"/"}>Home</Link>
        </li>
      )}
      {isLoggedIn && (
        <li>
          <Link to={"/addNewContact"}>Add New Contact</Link>
        </li>
      )}
      {isLoggedIn && (
        <li>
          <Link to={"/contacts"}>Contacts</Link>
        </li>
      )}
      {isLoggedIn && (
        <li>
          <Link to={"/userInfo"}>User Info</Link>
        </li>
      )}
    </div>
  );
}
