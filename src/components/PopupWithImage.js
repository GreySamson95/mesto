import { Popup } from './Popup.js'

export class PopupWithImage extends Popup {
    open(name, link) {
        const imageItem = document.querySelector(".popup-image__element")
        imageItem.setAttribute('src', link)
        imageItem.setAttribute('alt', name)
        document.querySelector(".popup-image__text").textContent = name
        super.open();
    }
}