export default class UserInfo {
  constructor(titleSelector, subtitleSelector, profileAvatar) {
    this._titleSelector = titleSelector;
    this._subtitleSelector = subtitleSelector;
    this._profileAvatar = profileAvatar;
  }

  showUser(user) {
    this._setUserInfo(user.name, user.about);
    this._profileAvatar.src = user.avatar;
    this._profileAvatar.alt = user.name;
    this._id = user._id;
  }

  getUserId() {
    return this._id;
  }

  getUserInfo() {
    return {
      title: this._titleSelector.textContent,
      subtitle: this._subtitleSelector.textContent,
    };
  }

  _setUserInfo(title, subtitle) {
    this._titleSelector.textContent = title;
    this._subtitleSelector.textContent = subtitle;
  }
}
