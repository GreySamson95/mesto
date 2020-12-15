import { Popup } from './Popup.js'

export class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector)
        this._imageItem = this._popup.querySelector('.popup-image__element')
        this._header = this._popup.querySelector('.popup-image__text')
    }

    open(link, name) {
        this._imageItem.setAttribute('alt', name)
        this._imageItem.setAttribute('src', link)
        this._header.textContent = name
        super.open()
    }
}

// open(link, name) {
//     console.log(link)
//     this._imageItem.setAttribute('alt', name)
//     this._imageItem.setAttribute('src', link)
//     this._header.textContent = name
//     super.open()
// }



// export class PopupWithImage extends Popup {
//     open(name, link) {
//         const imageItem = this._popup.querySelector(".popup-image__element")
//         imageItem.setAttribute('src', link)
//         imageItem.setAttribute('alt', name)
//         this._popup.querySelector(".popup-image__text").textContent = name
//         super.open();
//     }
// }