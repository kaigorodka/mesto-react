import React from "react";
import closeIcon from "../images/Close_Icon.svg";
import SaveButton from "./SaveButton";
function PopupWithForm(props) {
  return (
    <div className={`popup popup_${props.name} ${props.isOpen}`}>
      <div className="popup__container">
        <button className="close-icon" onClick={props.onClose} type="reset">
          <img src={closeIcon} alt="Закрыть" className="close-icon__img" />
        </button>
        <h2 className="popup__title">{props.title}</h2>
        <form name={props.name} className="popup__form" action="/">
          {props.children}
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
