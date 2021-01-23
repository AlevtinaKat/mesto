export default class FormValidator {
  constructor(config, form) {
    this._config = config;
    this._form = form;
    this._popupButton = this._form.querySelector(this._config.buttonSelector);
    this._popupInputs = this._form.querySelectorAll(this._config.inputSelector);
  }

  _setButtonState(button, isActive) {
    if (isActive) {
      button.classList.remove(this._config.buttonInvalidClass);
      button.disabled = false;
    } else {
      button.classList.add(this._config.buttonInvalidClass);
      button.disabled = true;
    }
  }

  _showError(input) {
    const error = this._form.querySelector(`#${input.name}-error`);
    error.textContent = input.validationMessage;
    input.classList.add(this._config.inputInvalidClass);
  }

  _hideError(input) {
    const error = this._form.querySelector(`#${input.name}-error`);
    error.textContent = "";
    input.classList.remove(this._config.inputInvalidClass);
  }

  _checkValidity(input) {
    if (input.validity.valueMissing) {
      input.setCustomValidity(this._config.customMessages.inputMissmath);
    }

    if (input.name === "link" && input.validity.patternMismatch) {
      input.setCustomValidity(this._config.customMessages.siteMismatch);
    }
  }

  _checkInputValidity(input) {
    input.setCustomValidity("");
    this._checkValidity(input);

    if (input.validity.valid) {
      this._hideError(input);
    } else {
      this._showError(input);
    }
  }

  eraseInputs() {
    this._popupInputs.forEach((input) => {
      input.value = "";
      this._hideError(input);
    });
    this._setButtonState(this._popupButton, this._form.checkValidity());
  }

  popupFormValidation() {
    this._setButtonState(this._popupButton, this._form.checkValidity());

    this._popupInputs.forEach((input) => {
      input.addEventListener("input", () => {
        this._checkInputValidity(input);
        this._setButtonState(this._popupButton, this._form.checkValidity());
      });
    });
  }
}
