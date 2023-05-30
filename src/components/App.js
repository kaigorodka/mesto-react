import React from "react";
import "../index.css";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import PopupWithForm from "./PopupWithForm";

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
  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }
  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }
  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }
  function handleTrashClick() {
    setConfirmPopupOpen(true);
  }
  function handleCardClick(card) {
    setSelectedCard(card);
  }
  return (
    <div>
      <Header />
      <Main
        onEditAvatar={() => {
          handleEditAvatarClick();
        }}
        onEditProfile={() => {
          handleEditProfileClick();
        }}
        onAddPlace={() => {
          handleAddPlaceClick();
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
        buttonText={"Сохранить"}
        children={
          <>
            <input
              type="text"
              className="popup__input popup__input_type_name"
              id="name"
              name="name"
              defaultValue=""
              required
              placeholder="Имя"
              minLength="2"
              maxLength="40"
            />
            <span className="popup__error popup__error_name-error"></span>
            <input
              type="text"
              name="about"
              defaultValue=""
              required
              placeholder="О себе"
              className="popup__input popup__input_type_status"
              id="status"
              minLength="2"
              maxLength="200"
            />
            <span className="popup__error popup__error_status-error"></span>
          </>
        }
      />
      <PopupWithForm
        isOpen={isAddPlacePopupOpen ? "popup_opened" : ""}
        onClose={closeAllPopups}
        name="new_item"
        title="Новое место"
        buttonText={"Создать"}
        children={
          <>
            <input
              type="text"
              className="popup__input popup__input_type_name"
              id="place_name"
              name="name"
              defaultValue=""
              required
              placeholder="Название"
              minLength="2"
              maxLength="30"
            />
            <span className="popup__error popup__error_place_name-error"></span>
            <input
              type="url"
              name="link"
              defaultValue=""
              required
              placeholder="Ссылка на картинку"
              className="popup__input popup__input_type_status"
              id="input_url"
            />
            <span className="popup__error popup__error_input_url-error"></span>
          </>
        }
      />
      <ImagePopup onClose={closeAllPopups} card={selectedCard} />
      <PopupWithForm
        isOpen={isEditAvatarPopupOpen ? "popup_opened" : ""}
        title="Обновить аватар"
        onClose={closeAllPopups}
        name="avatar_edit"
        buttonText={"Сохранить"}
        children={
          <>
            <input
              type="url"
              name="avatar"
              defaultValue=""
              required
              placeholder="Ссылка на картинку"
              className="popup__input popup__input_type_status"
              id="avatar_url"
            />
            <span className="popup__error popup__error_avatar_url-error"></span>
          </>
        }
      />
      <PopupWithForm
        title="Вы уверены?"
        name="confirm"
        buttonText={"Да"}
        isOpen={isConfirmPopupOpen ? "popup_opened" : ""}
        onClose={closeAllPopups}
      />
    </div>
  );
}

export default App;
