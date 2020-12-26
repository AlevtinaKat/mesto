export default class UserInfo {
  constructor(titleSelector, subtitleSelector) {
    this._titleSelector = titleSelector;
    this._subtitleSelector = subtitleSelector;
  }

  getUserInfo() {
    return { title: this._titleSelector.textContent, subtitle: this._subtitleSelector.textContent };
  }

  setUserInfo(title, subtitle) {
    this._titleSelector.textContent = title;
    this._subtitleSelector.textContent = subtitle;
  }
}
