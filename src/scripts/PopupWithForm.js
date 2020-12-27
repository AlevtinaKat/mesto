import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popup, formSubmit, formValidator) {
    super(popup);
    this._formSubmit = formSubmit;
    this._popupForm = popup.querySelector(".popup__content");
    
    this._formValidator = formValidator;
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
