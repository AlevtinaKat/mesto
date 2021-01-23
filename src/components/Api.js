export default class Api {
  constructor(options) {
    this._options = options;
  }

  showUserInfo() {
    return this._getJson("/users/me");
  }

  getInitialCards() {
    return this._getJson("/cards");
  }

  saveUserInfo(title, subtitle) {
    return fetch(this._options.baseUrl + "/users/me", {
      method: "PATCH",
      headers: this._options.headers,
      body: JSON.stringify({
        name: title,
        about: subtitle,
      }),
    }).then(this._checkResponse);
  }

  saveCard(name, link) {
    return fetch(this._options.baseUrl + "/cards", {
      method: "POST",
      headers: this._options.headers,
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    }).then(this._checkResponse);
  }

  deleteCard(id) {
    return fetch(this._options.baseUrl + "/cards/" + id, {
      method: "DELETE",
      headers: this._options.headers,
    }).then(this._checkResponse);
  }

  like(id) {
    return this._likeSupport(id, "PUT");
  }

  deleteLike(id) {
    return this._likeSupport(id, "DELETE");
  }

  saveAvatar(link) {
    return fetch(this._options.baseUrl + "/users/me/avatar", {
      method: "PATCH",
      headers: this._options.headers,
      body: JSON.stringify({
        avatar: link,
      }),
    }).then(this._checkResponse);
  }

  _likeSupport(id, method) {
    return fetch(this._options.baseUrl + "/cards/likes/" + id, {
      method: method,
      headers: this._options.headers,
    }).then(this._checkResponse);
  }

  _getJson(endpoint) {
    return fetch(this._options.baseUrl + endpoint, {
      headers: this._options.headers,
    }).then(this._checkResponse);
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
  }
}
