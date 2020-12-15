export class Section {
    constructor({ items, renderer }, elementContainerSelector) {
        this._items = items
        this._renderer = renderer
        this._container = document.querySelector(elementContainerSelector)
    }

    addItem(element) {
        this._container.prepend(element)
    }

    renderItems() {
        this._items.forEach(item => {
            this._renderer(item)
        })
    }
}