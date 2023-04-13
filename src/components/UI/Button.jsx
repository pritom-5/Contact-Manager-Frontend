import css from "./Button.module.css";
export default function Button({ buttonTxt, buttonHandler }) {
  return (
    <div className={css.button_section} onClick={buttonHandler}>
      {buttonTxt}
    </div>
  );
}
