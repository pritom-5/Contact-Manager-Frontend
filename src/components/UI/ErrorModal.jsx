import { useContext } from "react";
import css from "./ErrorModal.module.css";
import DisplayCtx from "../../context/DisplayCtx";

// type: 'error' / 'success'| message: |
export default function ErrorModal() {
  const { showErrorModal } = useContext(DisplayCtx);
  const { message, type } = showErrorModal;

  return (
    <div
      id="error_modal_section"
      className={
        type === "success"
          ? `${css.green} ${css.error_modal_section}`
          : `${css.red} ${css.error_modal_section}`
      }
    >
      {message}
    </div>
  );
}
