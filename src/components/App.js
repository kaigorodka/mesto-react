import React from "react";
import "../index.css";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import PopupWithForm from "./PopupWithForm";
import SaveButton from "./SaveButton";

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [isConfirmPopupOpen, setConfirmPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(false);
  function closeAllPopups() {
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setConfirmPopupOpen(false);
    setSelectedCard(false);
  }
  function getOnEditAvatar() {
    setEditAvatarPopupOpen(true);
  }
  function getOnEditProfile() {
    setEditProfilePopupOpen(true);
  }
  function getOnAddPlace() {
    setAddPlacePopupOpen(true);
  }
  function handleTrashClick() {
    setConfirmPopupOpen(true);
  }
  function handleCardClick(card) {
    setSelectedCard(card);
  }
  return (
    <div className="page">
      <Header />
      <Main
        onEditAvatar={() => {
          getOnEditAvatar();
        }}
        onEditProfile={() => {
          getOnEditProfile();
        }}
        onAddPlace={() => {
          getOnAddPlace();
        }}
        handleTrashClick={() => {
          handleTrashClick();
        }}
        handleCardClick={(card) => {
          handleCardClick(card);
        }}
      />
      <Footer />
      <PopupWithForm
        isOpen={isEditProfilePopupOpen ? "popup_opened" : ""}
        onClose={closeAllPopups}
        name="edit-profile"
        title="Редактировать профиль"
        children={
          <>
            <input
              type="text"
              className="popup__input popup__input_type_name"
              id="name"
              name="name"
              value=""
              required
              placeholder="Имя"
              minLength="2"
              maxLength="40"
            />
            <span className="popup__error popup__error_name-error"></span>
            <input
              type="text"
              name="about"
              value=""
              required
              placeholder="О себе"
              className="popup__input popup__input_type_status"
              id="status"
              minLength="2"
              maxLength="200"
            />
            <span className="popup__error popup__error_status-error"></span>
            <SaveButton buttonText={"Сохранить"} />
          </>
        }
      />
      <PopupWithForm
        isOpen={isAddPlacePopupOpen ? "popup_opened" : ""}
        onClose={closeAllPopups}
        name="new_item"
        title="Новое место"
        children={
          <>
            <input
              type="text"
              className="popup__input popup__input_type_name"
              id="place_name"
              name="name"
              value=""
              required
              placeholder="Название"
              minLength="2"
              maxLength="30"
            />
            <span className="popup__error popup__error_place_name-error"></span>
            <input
              type="url"
              name="link"
              value=""
              required
              placeholder="Ссылка на картинку"
              className="popup__input popup__input_type_status"
              id="input_url"
            />
            <span className="popup__error popup__error_input_url-error"></span>
            <SaveButton buttonText={"Создать"} />
          </>
        }
      />
      <ImagePopup onClose={closeAllPopups} card={selectedCard} />
      <PopupWithForm
        isOpen={isEditAvatarPopupOpen ? "popup_opened" : ""}
        title="Обновить аватар"
        onClose={closeAllPopups}
        name="avatar_edit"
        children={
          <>
            <input
              type="url"
              name="avatar"
              value=""
              required
              placeholder="Ссылка на картинку"
              className="popup__input popup__input_type_status"
              id="avatar_url"
            />
            <span className="popup__error popup__error_avatar_url-error"></span>
            <SaveButton buttonText={"Сохранить"} />
          </>
        }
      />
      <PopupWithForm
        title="Вы уверены?"
        name="confirm"
        children={
          <>
            <SaveButton buttonText={"Да"} />
          </>
        }
        isOpen={isConfirmPopupOpen ? "popup_opened" : ""}
        onClose={closeAllPopups}
      />
    </div>
  );
}

export default App;
