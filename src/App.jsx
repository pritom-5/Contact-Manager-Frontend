import { useContext, useEffect } from "react";
import "./App.css";
import AuthCtx from "./context/AuthCtx";
import Contacts from "./pages/Contacts";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserInfo from "./pages/UserInfo";
import Contact from "./pages/Contact";
import ErrorModal from "./components/UI/ErrorModal";
import DisplayCtx from "./context/DisplayCtx";

function App() {
  const { isLoggedIn } = useContext(AuthCtx);
  const { showErrorModal } = useContext(DisplayCtx);

  return (
    <div className="App">
      {/* error modal */}
      {showErrorModal.show && <ErrorModal />}
      <div className="main_section">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/contacts"
            element={isLoggedIn ? <Contacts /> : <Home />}
          />
          <Route
            path="/contact/:contactId"
            element={isLoggedIn ? <Contact /> : <Home />}
          />
          <Route
            path="/userInfo"
            element={isLoggedIn ? <UserInfo /> : <Home />}
          />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
