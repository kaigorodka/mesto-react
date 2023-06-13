import React from "react";
import "../index.css";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import PopupWithForm from "./PopupWithForm";
import api from "../utils/api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
function App() {
  const [currentUser, setCurrentUser] = React.useState([]);
  const [cards, setCards] = React.useState([]);
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [isConfirmPopupOpen, setConfirmPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(false);

  // подгрузка данных с сервера
  React.useEffect(() => {
    Promise.all([api.getUserInfo(), api.getCardList()])
      .then(([info, cards]) => {
        const userInformation = info;
        setCurrentUser(info);
        setCards(cards);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // закрытие попапов
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

  //обработка лайка через API
  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    api
      .changeLikeCardStatus({ data: card, isLiked: isLiked })
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //удаление карты через API
  function handleCardDelete(mainCard) {
    api
      .deleteCard(mainCard)
      .then(
        setCards(
          cards.filter(function (card) {
            return card._id !== mainCard._id;
          })
        )
      )
      .catch((err) => {
        console.log(err);
      });
  }

  // обновление данных юзера через API
  function handleUpdateUser(data) {
    api
      .editUserInfo(data)
      .then((data) => {
        setCurrentUser(data);
      })
      .then(closeAllPopups)
      .catch((err) => {
        console.log(err);
      });
  }

  // обновление аватара через API
  function handleUpdateAvatar(data) {
    api
      .editUserAvatar(data)
      .then((data) => {
        setCurrentUser(data);
      })
      .then(closeAllPopups)
      .catch((err) => {
        console.log(err);
      });
  }

  // добавление новой карточки через API
  function handleAddPlaceSubmit(data) {
    api
      .addNewCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
      })
      .then(closeAllPopups)
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
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
          handleCardLike={(card) => {
            handleCardLike(card);
          }}
          handleCardDelete={(card) => {
            handleCardDelete(card);
          }}
          cards={cards}
        />
        <Footer />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={(data) => {
            handleUpdateUser(data);
          }}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={(data) => {
            handleUpdateAvatar(data);
          }}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlacePopup={(data) => {
            handleAddPlaceSubmit(data);
          }}
        />
        <ImagePopup onClose={closeAllPopups} card={selectedCard} />

        {/* <PopupWithForm
          title="Вы уверены?"
          name="confirm"
          buttonText={"Да"}
          isOpen={isConfirmPopupOpen ? "popup_opened" : ""}
          onClose={closeAllPopups}
        /> */}
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
