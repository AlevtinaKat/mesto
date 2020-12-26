export default class Section {
  constructor({ items, render }, containerElement) {
    this._items = items;
    this._render = render;
    this._containerElement = containerElement;
  }

  renderAll() {
    this._items.forEach((item) => {
        const element = this._render(item);
        this.addItem(element);
    });
  }

  addItem(element) {
    this._containerElement.prepend(element);
  }
}
