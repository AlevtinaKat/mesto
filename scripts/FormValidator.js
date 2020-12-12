export default class FormValidator {
  constructor(config, form, hideError) {
    this._config = config;
    this._form = form;
    this._hideError = hideError;
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
      this._hideError(this._form, input);
    } else {
      this._showError(input);
    }
  }

  popupFormValidation() {
    const popupButton = this._form.querySelector(this._config.buttonSelector);
    this._setButtonState(popupButton, this._form.checkValidity());

    const popupInputs = this._form.querySelectorAll(this._config.inputSelector);

    popupInputs.forEach((input) => {
      input.addEventListener("input", () => {
        this._checkInputValidity(input);
        this._setButtonState(popupButton, this._form.checkValidity());
      });
    });
  }
}
