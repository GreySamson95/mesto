export class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector)
        this._handleClose = this._handleClose.bind(this)
        this._handleEscClose  = this._handleEscClose.bind(this)
    }

    _handleEscClose(evt) {
        if (evt.key === 'Escape') {
            this.close()
        }
    }

    _handleClose(evt) {
        const classSet = evt.target.classList
        if (classSet.contains('popup_opened') || classSet.contains('popup__close-button')) {
            this.close()
        }
    }

    setEventListeners() {
        this._popup.addEventListener('click', this._handleClose)
    }
    open() {
        document.addEventListener('keydown', this._handleEscClose)
        this._popup.classList.add('popup_opened')
    }

    close() {
        document.addEventListener('keydown', this._handleEscClose)
        this._popup.classList.remove('popup_opened')
    }
}
