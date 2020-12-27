export default class Card {

  constructor(cardData, template, handleCardClick) {
    this._cardData = cardData;
    this._template = template;
    this._handleCardClick = handleCardClick;
    this._clickLike = this._clickLike.bind(this);
    this._removeElement = this._removeElement.bind(this);
  }

  createPhotoElement() {
    this._element = this._template.content.querySelector('.element').cloneNode(true);

    this._element
      .querySelector(".element__foto-button")
      .addEventListener("click", this._handleCardClick);

    const elementFoto = this._element.querySelector(".element__foto");
    elementFoto.src = this._cardData.link;
    elementFoto.alt = this._cardData.name;

    this._element
      .querySelector(".element__bin")
      .addEventListener("click", this._removeElement);

    const elementTitle = this._element.querySelector(".element__title");
    elementTitle.textContent = this._cardData.name;

    this._element
      .querySelector(".element__heart")
      .addEventListener("click", this._clickLike);

    return this._element;
  }

  _removeElement() {
    this._element.remove();
    this._element = null;
  }

  _clickLike() {
    this._element.querySelector(".element__heart").classList.toggle("element__heart_black");
  }
}