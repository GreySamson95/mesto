export class Section {
    constructor({ items, renderer }, elementContainer) {
        this._items = items
        this._renderer = renderer
        this._container = document.querySelector(elementContainer)
    }

    addItem(element) {
        this._container.prepend(element)
    }

    renderItems() {
        this._items.forEach(item => {
            this._renderer(item)
        });
    }
}