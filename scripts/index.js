import Card from "./Card.js";
import FormValidator from "./FormValidator.js";

const ESC_CODE = 27;
const popup = document.querySelector(".popup_edit");

const editButton = document.querySelector(".profile__edit-button");
const closeButton = document.querySelector(".popup__close_edit");

const popupForm = document.querySelector(".popup__content_edit");

const titleInput = document.querySelector(".popup__input_title");
const subtitleInput = document.querySelector(".popup__input_subtitle");
const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");

const elements = document.querySelector(".elements");

const popupFoto = document.querySelector(".popup_foto");
const closeFotoButton = document.querySelector(".popup__close_foto");

const popupPicture = document.querySelector(".popup_picture");

const addButton = document.querySelector(".profile__add-button");
const closePictureButton = document.querySelector(".popup__close_picture");

const popupPictureForm = document.querySelector(".popup__content_picture");

const placeInput = document.querySelector(".popup__input_place");
const linkInput = document.querySelector(".popup__input_link");

const img = document.querySelector(".popup__foto-full");
const popupFotoTitle = document.querySelector(".popup__foto-title");

const cardTemplate = document.querySelector(".element-template");

const popupForms = document.querySelectorAll(".popup__content");

const initialCards = [
  {
    name: "Архыз",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

function showClick() {
  showPopup(popup);
  titleInput.value = profileTitle.textContent;
  subtitleInput.value = profileSubtitle.textContent;
}

function closeClick(popupInput) {
  closePopup(popupInput);
  eraseInputs(popupInput);
}

function eraseInputs(popupInput) {
  const popupInputs = popupInput.querySelectorAll(".popup__input");
  popupInputs.forEach((input) => {
    input.value = "";
    hideError(popupInput, input);
  });
}

function saveClick(event) {
  event.preventDefault();
  profileTitle.textContent = titleInput.value;
  profileSubtitle.textContent = subtitleInput.value;
  closeClick(popup);
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
  showPopup(popupPicture);
}

function savePictureClick(event) {
  event.preventDefault();
  const card = new Card(
    { name: placeInput.value, link: linkInput.value },
    cardTemplate,
    showFotoClick
  );
  const elem = card.createFotoElement();
  addElement(elem);
  closeClick(popupPicture);
}

initialCards.forEach((initialCard) => {
  const card = new Card(initialCard, cardTemplate, showFotoClick);
  const elem = card.createFotoElement();
  addElement(elem);
});

editButton.addEventListener("click", showClick);
closeButton.addEventListener("click", () => closeClick(popup));
popupForm.addEventListener("submit", saveClick);

addButton.addEventListener("click", showPictureClick);
closePictureButton.addEventListener("click", () => closeClick(popupPicture));
popupPictureForm.addEventListener("submit", savePictureClick);

closeFotoButton.addEventListener("click", () => closePopup(popupFoto));

function showFotoClick(event) {
  showPopup(popupFoto);
  img.src = event.target.src;
  img.alt = event.target.alt;
  popupFotoTitle.textContent = event.target.alt;
}

function closePopupEsc(event) {
  if (event.keyCode == ESC_CODE) {
    const open = document.querySelector(".popup__open");
    if (open != null) {
      closeClick(open);
    }
  }
}

function closePopupOverlay(event) {
  if (event.target.classList.contains("popup__open")) {
    closeClick(event.target);
  }
}


function hideError(parent, input) {
  const error = parent.querySelector(`#${input.name}-error`);
  error.textContent = "";
  input.classList.remove("popup__input_state_invalid");
}

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

popupForms.forEach(popupForm => {
  const formValidator = new FormValidator(validationConfig, popupForm, hideError);
  formValidator.popupFormValidation();
});