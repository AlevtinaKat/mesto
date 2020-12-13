import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import { initialCards } from "./CardsArray.js";

const ESC_CODE = 27;
const popupEdit = document.querySelector(".popup_edit");

const editButton = document.querySelector(".profile__edit-button");
const closeButton = document.querySelector(".popup__close_edit");

const popupEditForm = document.querySelector(".popup__content_edit");

const titleInput = document.querySelector(".popup__input_title");
const subtitleInput = document.querySelector(".popup__input_subtitle");
const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");

const elements = document.querySelector(".elements");

const popupFoto = document.querySelector(".popup_foto");
const closeFotoButton = document.querySelector(".popup__close_foto");

const popupAddCard = document.querySelector(".popup_picture");

const addButton = document.querySelector(".profile__add-button");
const closePictureButton = document.querySelector(".popup__close_picture");

const popupPictureForm = document.querySelector(".popup__content_picture");

const placeInput = document.querySelector(".popup__input_place");
const linkInput = document.querySelector(".popup__input_link");

const img = document.querySelector(".popup__foto-full");
const popupFotoTitle = document.querySelector(".popup__foto-title");

const cardTemplate = document.querySelector(".element-template");

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

const formEditValidator = new FormValidator(validationConfig, popupEditForm);
const formPictureValidator = new FormValidator(validationConfig, popupPictureForm);

formEditValidator.popupFormValidation();
formPictureValidator.popupFormValidation();

function openEditProfile() {
  showPopup(popupEdit);
  titleInput.value = profileTitle.textContent;
  subtitleInput.value = profileSubtitle.textContent;
}

function closeForms(popupInput) {
  closePopup(popupInput);
  formEditValidator.eraseInputs();
  formPictureValidator.eraseInputs();
}

function saveClick(event) {
  event.preventDefault();
  profileTitle.textContent = titleInput.value;
  profileSubtitle.textContent = subtitleInput.value;
  closeForms(popupEdit);
}

function showPopup(popupInput) {
  popupInput.classList.add("popup__open");
  document.addEventListener("keyup", closePopupEsc);
  popupInput.addEventListener("click", closePopupOverlay);
}

function closePopup(popupInput) {
  popupInput.classList.remove("popup__open");
  document.removeEventListener("keyup", closePopupEsc);
  popupInput.removeEventListener("click", closePopupOverlay);
}

function addElement(element) {
  elements.prepend(element);
}

function showPictureClick() {
  showPopup(popupAddCard);
}

function savePictureClick(event) {
  event.preventDefault();
  const card = new Card(
    { name: placeInput.value, link: linkInput.value },
    cardTemplate,
    showFotoClick
  );
  const elem = card.createPhotoElement();
  addElement(elem);
  closeForms(popupAddCard);
}

initialCards.forEach((initialCard) => {
  const card = new Card(initialCard, cardTemplate, showFotoClick);
  const elem = card.createPhotoElement();
  addElement(elem);
});

editButton.addEventListener("click", openEditProfile);
closeButton.addEventListener("click", () => closeForms(popupEdit));
popupEditForm.addEventListener("submit", saveClick);

addButton.addEventListener("click", showPictureClick);
closePictureButton.addEventListener("click", () => closeForms(popupAddCard));
popupPictureForm.addEventListener("submit", savePictureClick);

closeFotoButton.addEventListener("click", () => closePopup(popupFoto));

function showFotoClick(event) {
  showPopup(popupFoto);
  img.src = event.target.src;
  img.alt = event.target.alt;
  popupFotoTitle.textContent = event.target.alt;
}

function closePopupEsc(event) {
  if (event.keyCode === ESC_CODE) {
    const open = document.querySelector(".popup__open");
    if (open != null) {
      closeForms(open);
    }
  }
}

function closePopupOverlay(event) {
  if (event.target.classList.contains("popup__open")) {
    closeForms(event.target);
  }
}
