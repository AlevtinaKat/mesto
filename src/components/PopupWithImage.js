import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popup) {
    super(popup);
    this._img = document.querySelector(".popup__foto-full");
    this._popupFotoTitle = document.querySelector(".popup__foto-title");
  }

  open(event) {
    super.open();
    this._img.src = event.target.src;
    this._img.alt = event.target.alt;
    this._popupFotoTitle.textContent = event.target.alt;
  }
}
