export default class Popup {
  constructor(popup) {
    this._popup = popup;
    this._ESC_CODE = 27;
    this._handleEscClose = this._handleEscClose.bind(this);
    this._closeOverlay = this._closeOverlay.bind(this);
  }

  open() {
    this._popup.classList.add("popup_opened");
    document.addEventListener("keyup", this._handleEscClose);
    this._popup.addEventListener("click", this._closeOverlay);
  }

  close() {
    this._popup.classList.remove("popup_opened");
    document.removeEventListener("keyup", this._handleEscClose);
    this._popup.removeEventListener("click", this._closeOverlay);
  }

  _handleEscClose(event) {
    if (event.keyCode === this._ESC_CODE) {
      this.close();
    }
  }

  _closeOverlay(event) {
    if (event.target.classList.contains("popup_opened")) {
      this.close();
    }
  }

  setEventListeners() {
    this._popup.querySelector('.popup__close').addEventListener("click", () => this.close());
  }
}
