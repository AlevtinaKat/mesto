import Popup from "./Popup.js";
import FormValidator from "./FormValidator.js";

export default class PopupWithForm extends Popup {
  constructor(popup, formSubmit) {
    super(popup);
    this._formSubmit = formSubmit;
    this._popupForm = popup.querySelector(".popup__content");
    this._validationConfig = {
      inputSelector: ".popup__input",
      buttonSelector: ".popup__button",
      inputInvalidClass: "popup__input_state_invalid",
      buttonInvalidClass: "popup__button_invalid",
      customMessages: {
        inputMissmath: "Вы пропустили это поле.",
        siteMismatch: "Введите адрес сайта.",
      },
    };
    this._formValidator = new FormValidator(
      this._validationConfig,
      this._popupForm
    );
    this._formValidator.popupFormValidation();
  }

  _getInputValues() {
    this._inputList = this._popup.querySelectorAll(".popup__input");
    this._formValues = {};
    this._inputList.forEach(
      (input) => (this._formValues[input.name] = input.value)
    );
    return this._formValues;
  }

  setEventListeners(closeButton) {
    super.setEventListeners(closeButton);
    this._popupForm.addEventListener("submit", (event) =>
      this._formSubmit(event, this._getInputValues())
    );
  }

  close() {
    super.close();
    this._formValidator.eraseInputs();
  }
}
