export class Card {
    constructor(name, link, templateSelector, handleCardClick) {
        this._name = name
        this._link = link
        this._templateElement = templateSelector
        this._handleCardClick = handleCardClick
    }

    _getTemplate() {
        const cardTemplate = document
            .querySelector(this._templateElement)
            .content
            .cloneNode(true)
        return cardTemplate
    }
 
    _likeCardHandler(evt) {
        evt.target.classList.toggle('element__like_active')
    }

    _deleteCardHandler(evt) {
        evt.target.closest('.element').remove()
    }

    _setEventListeners() {
        this._element.querySelector('.element__like').addEventListener('click', (evt) => {
            this._likeCardHandler(evt)
        })

        this._element.querySelector('.element__delete').addEventListener('click', (evt) => {
            this._deleteCardHandler(evt)
        })

        this._cardPhoto.addEventListener('click', () => {
            this._handleCardClick(this._name, this._link)
        })
    }

    generateCard() {
        this._element = this._getTemplate()
        this._cardPhoto = this._element.querySelector(".element__photo")
        this._cardPhoto.src = this._link
        this._cardPhoto.alt = this._name
        this._element.querySelector(".element__text").textContent = this._name
        this._setEventListeners()
        return this._element
    }
}