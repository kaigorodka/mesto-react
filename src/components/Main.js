import React from "react";
import EditProfileButtom from "../images/Edit_Button(1).svg";
import EditAvatarButton from "../images/edit__avatar.svg";
import AddButton from "../images/Vector_(3).svg";
import api from "../utils/api.js";
import Card from "./Card.js";

function Main(props) {
  const [userName, setUserName] = React.useState("");
  const [userDescription, setUserDescription] = React.useState("");
  const [userAvatar, setUserAvatar] = React.useState("");
  const [cards, setCards] = React.useState([]);
  React.useEffect(() => {
    Promise.all([api.getUserInfo(), api.getCardList()])
      .then(([info, cards]) => {
        // userId = info._id;
        const userInformation = info;
        setUserName(userInformation.name);
        setUserDescription(userInformation.about);
        setUserAvatar(userInformation.avatar);
        setCards(cards);
        // cardList.renderItems(cards);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <main>
      <section className="profile">
        <div className="profile__alignment">
          <button className="profile__edit" onClick={props.onEditAvatar}>
            <img
              src={EditAvatarButton}
              alt="Редактировать"
              className="profile__edit-icon"
            />
            <div className="opacity-maker"></div>
            <img src={userAvatar} alt="Аватар" className="profile__image" />
          </button>
          <div className="profile-info">
            <div className="profile__row-alignment">
              <h1 className="profile__name">{userName}</h1>
              <button
                className="edit-button"
                type="button"
                onClick={props.onEditProfile}
              >
                <img
                  src={EditProfileButtom}
                  alt="Редактировать"
                  className="edit-button__icon"
                />
              </button>
            </div>
            <h2 className="profile__status">{userDescription}</h2>
          </div>
        </div>
        <button className="add-button" type="button" onClick={props.onAddPlace}>
          <img src={AddButton} alt="Добавить" className="add-button__icon" />
        </button>
      </section>
      <section className="elements">
        {cards.map((card) => {
          return (
            <Card
              card={card}
              key={card._id}
              handleTrashClick={props.handleTrashClick}
              onCardClick={props.handleCardClick}
            />
          );
        })}
      </section>
    </main>
  );
}
export default Main;
