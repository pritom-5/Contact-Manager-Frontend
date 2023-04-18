import { useContext } from "react";
import AuthCtx from "../../context/AuthCtx";
import { useNavigate } from "react-router-dom";
import Button from "../UI/Button";
import css from "./HomeComponent.module.css";

export default function HomeComponent() {
  const { isLoggedIn } = useContext(AuthCtx);
  const navigate = useNavigate();
  return (
    <div className={css.home_component_section}>
      {/* background gradiend and some description with title about the app */}
      <div className={css.title_section}>
        <div className={css.title}>Manage your contacts from one place </div>
        <div className={css.description}>
          <p>
            With this app, users can store, organize, and access contact details
            such as email addresses, phone numbers, and names easily.
          </p>
          <p>
            Additionally, the contact manager app is built to be scalable,
            meaning that it can handle the storage and management of a large
            number of contacts with ease.
          </p>
        </div>
      </div>
      <div className={css.buttons_section}>
        {/* if logged in show this section => contacts button*/}
        {!isLoggedIn && (
          <Button
            buttonHandler={() => navigate("/login")}
            buttonTxt={"Login"}
          />
        )}
        {!isLoggedIn && (
          <Button
            buttonHandler={() => navigate("/register")}
            buttonTxt={"Register"}
          />
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
    </div>
  );
}
