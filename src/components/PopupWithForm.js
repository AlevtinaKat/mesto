import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popup, formSubmit, formValidator) {
    super(popup);
    this._formSubmit = formSubmit;
    this._popupForm = popup.querySelector(".popup__content");
    this._button = popup.querySelector(".popup__button");
    this._formValidator = formValidator;
    this._formValidator.popupFormValidation();
    this._inputList = this._popup.querySelectorAll(".popup__input");
  }

  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach(
      (input) => (this._formValues[input.name] = input.value)
    );
    return this._formValues;
  }

  setEventListeners(closeButton) {
    super.setEventListeners(closeButton);
    this._popupForm.addEventListener("submit", (event) => {
      this._button.textContent = "Сохранение...";
      this._formSubmit(event, this._getInputValues());
      this._button.textContent = "Сохранить";
    });
  }

  close() {
    super.close();
    this._formValidator.eraseInputs();
  }
}
