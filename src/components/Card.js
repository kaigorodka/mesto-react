import React from "react";
import trashIcon from "../images/Trash.svg";
import likeIcon from "../images/Vector_(2).svg";
debugger;
function Card({ cards, handleTrashClick, onCardClick }) {
  return cards.map((card, i) => (
    <>
      <div key={i} className="element">
        <button
          className="trash-button"
          type="button"
          onClick={handleTrashClick}
        >
          <img className="trash-button__icon" alt="Корзина" src={trashIcon} />
        </button>
        <img
          src={card.link}
          alt={card.name}
          className="element__image"
          onClick={function handleClick() {
            onCardClick(card);
          }}
        />
        <div className="element__white-part">
          <h2 className="element__title">{card.name}</h2>
          <button className="like-button" type="button">
            <img src={likeIcon} alt="Нравится" className="like-button__icon" />
          </button>
          <h3 className="element__numbers">{card.likes.length}</h3>
        </div>
      </div>
    </>
  ));
}

export default Card;
