export const validationConfig = {
  inputSelector: ".popup__input",
  buttonSelector: ".popup__button",
  inputInvalidClass: "popup__input_state_invalid",
  buttonInvalidClass: "popup__button_invalid",
  customMessages: {
    inputMissmath: "Вы пропустили это поле.",
    siteMismatch: "Введите адрес сайта.",
  },
};

export const apiOption = {
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-19",
  headers: {
    authorization: "eaf8f09c-3663-467a-8d68-0d5e48f6a657",
    "Content-Type": "application/json",
  },
};

export const popupEdit = document.querySelector(".popup_edit");
export const popupBin = document.querySelector(".popup_bin");

export const editButton = document.querySelector(".profile__edit-button");

export const titleInput = document.querySelector(".popup__input_title");
export const subtitleInput = document.querySelector(".popup__input_subtitle");
export const profileTitle = document.querySelector(".profile__title");
export const profileSubtitle = document.querySelector(".profile__subtitle");
export const profileAvatar = document.querySelector(".profile__avatar");

export const elements = document.querySelector(".elements");

export const popupFoto = document.querySelector(".popup_foto");

export const popupAddCard = document.querySelector(".popup_picture");
export const popupAvatar = document.querySelector(".popup_avatar");

export const addButton = document.querySelector(".profile__add-button");

export const cardTemplate = document.querySelector(".element-template");

export const avatarButton = document.querySelector(".profile__avatar-button");