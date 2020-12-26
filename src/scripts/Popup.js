export default class Popup {
  constructor(popup) {
    this._popup = popup;
    this._ESC_CODE = 27;
  }

  open() {
    this._popup.classList.add("popup__open");
    document.addEventListener("keyup", this._handleEscClose);
    this._popup.addEventListener("click", this._closeOverlay);
  }

  close() {
    this._popup.classList.remove("popup__open");
    document.removeEventListener("keyup", this._handleEscClose);
    this._popup.removeEventListener("click", this._closeOverlay);
  }

  _handleEscClose(event) {
    if (event.keyCode === this._ESC_CODE) {
      const open = document.querySelector(".popup__open");
      if (open != null) {
        this.close();
      }
    }
  }

  _closeOverlay(event) {
    if (event.target.classList.contains("popup__open")) {
      this.close();
    }
  }

  setEventListeners(closeButton) {
    closeButton.addEventListener("click", () => this.close());
  }
}
