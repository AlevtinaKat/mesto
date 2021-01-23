export default class Card {
  constructor(cardData, template, handleCardClick, popupBinClass, id, api) {
    this._cardData = cardData;
    this._template = template;
    this._id = id;
    this._api = api;
    this._handleCardClick = handleCardClick;
    this._popupBinClass = popupBinClass;
    this._clickLike = this._clickLike.bind(this);
    this._likeCounter = this._likeCounter.bind(this);
  }

  createPhotoElement() {
    this._element = this._template.content
      .querySelector(".element")
      .cloneNode(true);

    this._element
      .querySelector(".element__foto-button")
      .addEventListener("click", this._handleCardClick);

    const elementFoto = this._element.querySelector(".element__foto");
    elementFoto.src = this._cardData.link;
    elementFoto.alt = this._cardData.name;

    const bin = this._element.querySelector(".element__bin");
    if (this._id === this._cardData.owner._id) {
      bin.addEventListener("click", () =>
        this._popupBinClass.open(this._element, this._cardData._id)
      );
    } else {
      bin.remove();
    }

    const elementTitle = this._element.querySelector(".element__title");
    elementTitle.textContent = this._cardData.name;

    this._heart = this._element.querySelector(".element__heart");
    this._heart.addEventListener("click", this._clickLike);
    this._cardData.likes.forEach((like) => {
      if (like._id === this._id) {
        this._heart.classList.toggle("element__heart_black");
      }
    });

    this._likeCount = this._element.querySelector(".element__like-count");

    this._likeCounter(this._cardData);

    return this._element;
  }

  _clickLike() {
    const cl = this._heart.classList;

    if (!cl.contains("element__heart_black")) {
      this._api
        .like(this._cardData._id)
        .then((json) => {
          this._likeCounter(json);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      this._api
        .deleteLike(this._cardData._id)
        .then((json) => {
          this._likeCounter(json);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    
    cl.toggle("element__heart_black");
  }

  _likeCounter(cardData) {
    const count = cardData.likes.length;
    if (count > 0) {
      this._likeCount.textContent = count;
    } else {
      this._likeCount.textContent = "";
    }
  }
}
