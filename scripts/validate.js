const popupForms = document.querySelectorAll(".popup__content");

function setButtonState(button, isActive) {
  if (isActive) {
    button.classList.remove("popup__button_invalid");
    button.disabled = false;
  } else {
    button.classList.add("popup__button_invalid");
    button.disabled = true;
  }
}

function showError(form, input) {
  const error = form.querySelector(`#${input.name}-error`);
  error.textContent = input.validationMessage;
  input.classList.add("popup__input_state_invalid");
}

function hideError(parent, input) {
  const error = parent.querySelector(`#${input.name}-error`);
  error.textContent = "";
  input.classList.remove("popup__input_state_invalid");
}

function checkValidity(input) {
  if (input.validity.valueMissing) {
    input.setCustomValidity("Вы пропустили это поле.");
  }

  if (input.name === "link" && input.validity.patternMismatch) {
    input.setCustomValidity("Введите адрес сайта.");
  }
}

function checkInputValidity(form, input) {
  input.setCustomValidity("");
  checkValidity(input);

  if (input.validity.valid) {
    hideError(form, input);
  } else {
    showError(form, input);
  }
}

function popupFormValidation(form) {
  const popupButton = form.querySelector(".popup__button");
  setButtonState(popupButton, form.checkValidity());

  const popupInputs = form.querySelectorAll(".popup__input");

  popupInputs.forEach((input) => {
    input.addEventListener("input", () => {
      checkInputValidity(form, input);
      setButtonState(popupButton, form.checkValidity());
    });
  });
}

popupForms.forEach(popupFormValidation);