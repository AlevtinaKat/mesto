import "./../pages/index.css";
import Card from "../components/Card.js";
import PopupWithForm from "../components/PopupWithForm";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithButton from "../components/PopupWithButton.js";
import Section from "../components/Section";
import UserInfo from "../components/UserInfo";
import FormValidator from "../components/FormValidator.js";
import Api from "../components/Api.js";
import * as constants from "../utils/constants.js";

const api = new Api(constants.apiOption);

const section = new Section(renderCard, constants.elements)

api
  .getInitialCards()
  .then((json) => section.renderAll(json))
  .catch((err) => {
    console.log(err);
  });

const popupFotoClass = new PopupWithImage(constants.popupFoto);
popupFotoClass.setEventListeners();

const popupBinClass = new PopupWithButton(constants.popupBin, api);
popupBinClass.setEventListeners();

const formEditValidator = new FormValidator(
  constants.validationConfig,
  constants.popupEdit.querySelector(".popup__content")
);

const popupEditClass = new PopupWithForm(
  constants.popupEdit,
  saveClick,
  formEditValidator
);
popupEditClass.setEventListeners();

const formAddCardValidator = new FormValidator(
  constants.validationConfig,
  constants.popupAddCard.querySelector(".popup__content")
);

const formAvatarValidator = new FormValidator(
  constants.validationConfig,
  constants.popupAvatar.querySelector(".popup__content")
);

const popupAddCardClass = new PopupWithForm(
  constants.popupAddCard,
  savePictureClick,
  formAddCardValidator
);
popupAddCardClass.setEventListeners();

const popupAvatarClass = new PopupWithForm(
  constants.popupAvatar,
  saveAvatarClick,
  formAvatarValidator
);
popupAvatarClass.setEventListeners();

const userInfo = new UserInfo(
  constants.profileTitle,
  constants.profileSubtitle,
  constants.profileAvatar
);

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
  constants.titleInput.value = data.title;
  constants.subtitleInput.value = data.subtitle;
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
      const elem = renderCard(card, constants.cardTemplate, handleCardClick);
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
    constants.cardTemplate,
    handleCardClick,
    popupBinClass,
    userInfo.getUserId(),
    api
  );
  return card.createPhotoElement();
}

constants.editButton.addEventListener("click", openEditProfile);
constants.addButton.addEventListener("click", showPictureClick);
constants.avatarButton.addEventListener("click", openAvatar);
