export default class Section {
  constructor(render, containerElement) {
    this._render = render;
    this._containerElement = containerElement;
  }

  renderAll(items) {
    items.forEach((item) => {
        const element = this._render(item);
        this.addItem(element);
    });
  }

  addItem(element) {
    this._containerElement.prepend(element);
  }
}
