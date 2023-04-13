import { useContext } from "react";
import AuthCtx from "../context/AuthCtx";
import Button from "../components/UI/Button";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const { isLoggedIn } = useContext(AuthCtx);
  const navigate = useNavigate();

  return (
    <div className="home_section">
      Home
      {/* background gradiend and some description with title about the app */}
      <div className="title_section">
        <div className="title">Manage your contacts from one place </div>
        <div className="description">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident
          iure delectus ipsam consequatur tenetur assumenda fuga molestiae
          fugiat in aperiam.
        </div>
      </div>
      <div className="buttons_section">
        {/* if logged in show this section => contacts button*/}
        {!isLoggedIn && (
          <div className="login_register_button">
            <Button
              buttonHandler={() => navigate("/login")}
              buttonTxt={"Login"}
            />
            <Button
              buttonHandler={() => navigate("/register")}
              buttonTxt={"Register"}
            />
          </div>
        )}
        {/* else show this => register login buttons */}
        {isLoggedIn && (
          <div className="contacts_button">
            <Button
              buttonHandler={() => navigate("/contacts")}
              buttonTxt={"Contacts"}
            />
          </div>
        )}
      </div>
      {/* show additional info and links */}
      <div className="footer"></div>
    </div>
  );
}
