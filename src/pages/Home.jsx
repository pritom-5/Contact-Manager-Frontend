import { Fragment, useContext } from "react";
import AuthCtx from "../context/AuthCtx";
import Button from "../components/UI/Button";
import { useNavigate } from "react-router-dom";
import HomeComponent from "../components/home/HomeComponent";

export default function Home() {
  return (
    <Fragment>
      <HomeComponent />
    </Fragment>
  );
}
