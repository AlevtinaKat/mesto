export default class Card {

  constructor(cardData, template, handleCardClick) {
    this._cardData = cardData;
    this._template = template;
    this._handleCardClick = handleCardClick;
  }

  createPhotoElement() {
    const element = this._template.content.cloneNode(true);

    element
      .querySelector(".element__foto-button")
      .addEventListener("click", this._handleCardClick);

    const elementFoto = element.querySelector(".element__foto");
    elementFoto.src = this._cardData.link;
    elementFoto.alt = this._cardData.name;

    element
      .querySelector(".element__bin")
      .addEventListener("click", this._removeElement);

    const elementTitle = element.querySelector(".element__title");
    elementTitle.textContent = this._cardData.name;

    element
      .querySelector(".element__heart")
      .addEventListener("click", this._clickLike);

    return element;
  }

  _removeElement(event) {
    event.target.closest(".element").remove();
  }

  _clickLike(event) {
    event.target.classList.toggle("element__heart_black");
  }
}