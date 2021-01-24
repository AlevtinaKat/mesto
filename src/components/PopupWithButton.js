import Popup from "./Popup.js";

export default class PopupWithButton extends Popup {
  constructor(popup, api) {
    super(popup);
    this._api = api;
    this._popupForm = popup.querySelector(".popup__content");
    this._removeElement = this._removeElement.bind(this);
  }

  open(element, id) {
    super.open();
    this._element = element;
    this._id = id;
  }

  setEventListeners(closeButton) {
    super.setEventListeners(closeButton);
    this._popupForm.addEventListener("submit", (event) => {
      this._removeElement(event);
    });
  }

  _removeElement(event) {
    event.preventDefault();
    this._api.deleteCard(this._id)
    .then(() =>  {
      this._element.remove()
      super.close()
    } )
    .catch((err) => {
      console.log(err);
    });
  }
}
