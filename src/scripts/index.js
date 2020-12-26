import './../pages/index.css';
import Card from "./Card.js";
import { initialCards } from "./CardsArray.js";
import PopupWithForm from './PopupWithForm';
import PopupWithImage from "./PopupWithImage.js";
import Section from './Section';
import UserInfo from './UserInfo';

const popupEdit = document.querySelector(".popup_edit");

const editButton = document.querySelector(".profile__edit-button");
const closeButton = document.querySelector(".popup__close_edit");

const titleInput = document.querySelector(".popup__input_title");
const subtitleInput = document.querySelector(".popup__input_subtitle");
const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");

const elements = document.querySelector(".elements");

const popupFoto = document.querySelector(".popup_foto");
const closeFotoButton = document.querySelector(".popup__close_foto");

const popupAddCard = document.querySelector(".popup_picture");

const addButton = document.querySelector(".profile__add-button");
const closeAddCardButton = document.querySelector(".popup__close_picture");

const cardTemplate = document.querySelector(".element-template");

const section = new Section({items: initialCards, render: renderCards}, elements);

const popupFotoClass = new PopupWithImage(popupFoto);
popupFotoClass.setEventListeners(closeFotoButton);

const popupEditClass = new PopupWithForm(popupEdit, saveClick);
popupEditClass.setEventListeners(closeButton);

const popupAddCardClass = new PopupWithForm(popupAddCard, savePictureClick);
popupAddCardClass.setEventListeners(closeAddCardButton);

const userInfo = new UserInfo(profileTitle, profileSubtitle); 

function openEditProfile() {
  popupEditClass.open();
  const data = userInfo.getUserInfo();
  titleInput.value = data.title;
  subtitleInput.value = data.subtitle;
}

function saveClick(event, inputData) {
  event.preventDefault();
  userInfo.setUserInfo(inputData['title'], inputData['subtitle']);
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
  const card = new Card(
    { name: inputData['place'], link: inputData['link'] },
    cardTemplate,
    handleCardClick
  );
  const elem = card.createPhotoElement();
  section.addItem(elem);
  popupAddCardClass.close();
}

function renderCards(initialCard) {
  const card = new Card(initialCard, cardTemplate, handleCardClick);
  return card.createPhotoElement();
}

section.renderAll();

editButton.addEventListener("click", openEditProfile);
addButton.addEventListener("click", showPictureClick);