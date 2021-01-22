import "./../pages/index.css";
import Card from "./Card.js";
import PopupWithForm from "./PopupWithForm";
import PopupWithImage from "./PopupWithImage.js";
import PopupWithButton from "./PopupWithButton.js";
import Section from "./Section";
import UserInfo from "./UserInfo";
import FormValidator from "./FormValidator.js";
import Api from "./Api.js";

const validationConfig = {
  inputSelector: ".popup__input",
  buttonSelector: ".popup__button",
  inputInvalidClass: "popup__input_state_invalid",
  buttonInvalidClass: "popup__button_invalid",
  customMessages: {
    inputMissmath: "Вы пропустили это поле.",
    siteMismatch: "Введите адрес сайта.",
  },
};

const apiOption = {
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-19",
  headers: {
    authorization: "eaf8f09c-3663-467a-8d68-0d5e48f6a657",
    "Content-Type": "application/json",
  },
};
const api = new Api(apiOption);

const popupEdit = document.querySelector(".popup_edit");
const popupBin = document.querySelector(".popup_bin");

const editButton = document.querySelector(".profile__edit-button");
const closeButton = document.querySelector(".popup__close_edit");
const closeBinButton = document.querySelector(".popup__close_bin");

const titleInput = document.querySelector(".popup__input_title");
const subtitleInput = document.querySelector(".popup__input_subtitle");
const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");
const profileAvatar = document.querySelector(".profile__avatar");

const elements = document.querySelector(".elements");

const popupFoto = document.querySelector(".popup_foto");
const closeFotoButton = document.querySelector(".popup__close_foto");

const popupAddCard = document.querySelector(".popup_picture");
const popupAvatar = document.querySelector(".popup_avatar");

const addButton = document.querySelector(".profile__add-button");
const closeAddCardButton = document.querySelector(".popup__close_picture");
const closeAvatarButton = document.querySelector(".popup__close_avatar");

const cardTemplate = document.querySelector(".element-template");

const avatarButton = document.querySelector(".profile__avatar-button");

const section = new Section(renderCard, elements);

api
  .getInitialCards()
  .then((json) => section.renderAll(json))
  .catch((err) => {
    console.log(err);
  });

const popupFotoClass = new PopupWithImage(popupFoto);
popupFotoClass.setEventListeners(closeFotoButton);

const popupBinClass = new PopupWithButton(popupBin, api);
popupBinClass.setEventListeners(closeBinButton);

const formEditValidator = new FormValidator(
  validationConfig,
  popupEdit.querySelector(".popup__content")
);

const popupEditClass = new PopupWithForm(
  popupEdit,
  saveClick,
  formEditValidator
);
popupEditClass.setEventListeners(closeButton);

const formAddCardValidator = new FormValidator(
  validationConfig,
  popupAddCard.querySelector(".popup__content")
);

const formAvatarValidator = new FormValidator(
  validationConfig,
  popupAvatar.querySelector(".popup__content")
);

const popupAddCardClass = new PopupWithForm(
  popupAddCard,
  savePictureClick,
  formAddCardValidator
);
popupAddCardClass.setEventListeners(closeAddCardButton);

const popupAvatarClass = new PopupWithForm(
  popupAvatar,
  saveAvatarClick,
  formAvatarValidator
);
popupAvatarClass.setEventListeners(closeAvatarButton);

const userInfo = new UserInfo(profileTitle, profileSubtitle, profileAvatar);

api
  .showUserInfo()
  .then((json) => {
    userInfo.showUser(json);
  })
  .catch((err) => {
    console.log(err);
  });

function openEditProfile() {
  popupEditClass.open();
  const data = userInfo.getUserInfo();
  titleInput.value = data.title;
  subtitleInput.value = data.subtitle;
}

function openAvatar() {
  popupAvatarClass.open();
}

function saveClick(event, inputData) {
  event.preventDefault();
  api
    .saveUserInfo(inputData["title"], inputData["subtitle"])
    .then((json) => userInfo.showUser(json))
    .catch((err) => {
      console.log(err);
    });
  popupEditClass.close();
}

function showPictureClick() {
  popupAddCardClass.open();
}

function handleCardClick(event) {
  popupFotoClass.open(event);
}

function savePictureClick(event, inputData) {
  event.preventDefault();
  api
    .saveCard(inputData["place"], inputData["link"])
    .then((card) => {
      const elem = renderCard(card, cardTemplate, handleCardClick);
      section.addItem(elem);
    })
    .catch((err) => {
      console.log(err);
    });
  popupAddCardClass.close();
}

function saveAvatarClick(event, inputData) {
  event.preventDefault();
  api
    .saveAvatar(inputData["avatarLink"])
    .then((json) => {
      userInfo.showUser(json);
    })
    .catch((err) => {
      console.log(err);
    });
  popupAvatarClass.close();
}

function renderCard(initialCard) {
  const card = new Card(
    initialCard,
    cardTemplate,
    handleCardClick,
    popupBinClass,
    userInfo.getUserId(),
    api
  );
  return card.createPhotoElement();
}

editButton.addEventListener("click", openEditProfile);
addButton.addEventListener("click", showPictureClick);
avatarButton.addEventListener("click", openAvatar);
