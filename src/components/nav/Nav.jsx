import { Link } from "react-router-dom";

export default function Nav() {
  return (
    <div className="nav_section">
      {/* home contacts usericon */}
      <ul>
        <li>
          <Link to={"/"}>Home</Link>
        </li>
        <li>
          <Link to={"/addNewContact"}>Add New Contact</Link>
        </li>
        <li>
          <Link to={"/userInfo"}>User Info</Link>
        </li>
      </ul>
    </div>
  );
}
