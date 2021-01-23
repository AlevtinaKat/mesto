import "./../pages/index.css";
import Card from "../components/Card.js";
import PopupWithForm from "../components/PopupWithForm";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithButton from "../components/PopupWithButton.js";
import Section from "../components/Section";
import UserInfo from "../components/UserInfo";
import FormValidator from "../components/FormValidator.js";
import Api from "../components/Api.js";
import * as Constants from "../utils/constants.js";

const api = new Api(Constants.apiOption);

const section = new Section(renderCard, Constants.elements);

api
  .getInitialCards()
  .then((json) => section.renderAll(json))
  .catch((err) => {
    console.log(err);
  });

const popupFotoClass = new PopupWithImage(Constants.popupFoto);
popupFotoClass.setEventListeners();

const popupBinClass = new PopupWithButton(Constants.popupBin, api);
popupBinClass.setEventListeners();

const formEditValidator = new FormValidator(
  Constants.validationConfig,
  Constants.popupEdit.querySelector(".popup__content")
);

const popupEditClass = new PopupWithForm(
  Constants.popupEdit,
  saveClick,
  formEditValidator
);
popupEditClass.setEventListeners();

const formAddCardValidator = new FormValidator(
  Constants.validationConfig,
  Constants.popupAddCard.querySelector(".popup__content")
);

const formAvatarValidator = new FormValidator(
  Constants.validationConfig,
  Constants.popupAvatar.querySelector(".popup__content")
);

const popupAddCardClass = new PopupWithForm(
  Constants.popupAddCard,
  savePictureClick,
  formAddCardValidator
);
popupAddCardClass.setEventListeners();

const popupAvatarClass = new PopupWithForm(
  Constants.popupAvatar,
  saveAvatarClick,
  formAvatarValidator
);
popupAvatarClass.setEventListeners();

const userInfo = new UserInfo(
  Constants.profileTitle,
  Constants.profileSubtitle,
  Constants.profileAvatar
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
  Constants.titleInput.value = data.title;
  Constants.subtitleInput.value = data.subtitle;
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
      const elem = renderCard(card, Constants.cardTemplate, handleCardClick);
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
    Constants.cardTemplate,
    handleCardClick,
    popupBinClass,
    userInfo.getUserId(),
    api
  );
  return card.createPhotoElement();
}

Constants.editButton.addEventListener("click", openEditProfile);
Constants.addButton.addEventListener("click", showPictureClick);
Constants.avatarButton.addEventListener("click", openAvatar);
