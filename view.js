
export default class View {
  _data;
  #clear() {
    this._parentElement.innerHTML = "";
  }
  render(data) {
    this._data = data;
    const markup = this.generateMarkup();
    this.#clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }
}
