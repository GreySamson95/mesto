export class Card {
    constructor({ data, handleCardClick, handleLikeClick, handleDeleteIconClick }, templateSelector) {
        this._name = data.name
        this._link = data.link
        this._likes = data.likes.length
        this._id = data._id
        this._owner = data.owner._id
        this._userID = data.userID
        this._whoLiked = data.whoLiked
        this._handleCardClick = handleCardClick
        this._handleLikeClick = handleLikeClick
        this._handleDeleteIconClick = handleDeleteIconClick
        this._templateSelector = templateSelector
    }

    _getTemplate() {
        const cardTemplate = document
            .querySelector(this._templateSelector)
            .content
            .querySelector('.element')
            .cloneNode(true)
        return cardTemplate
    }
    
    _setElementAttr() {
        const imageItem = this._element.querySelector('.element__photo');
        imageItem.setAttribute('src', this._link)
        imageItem.setAttribute('alt', this._name)
        imageItem.setAttribute('id', this._id)
        this._element.querySelector('.element__text').textContent = this._name
        this._element.querySelector('.element__like').textContent = this._likes
        if (this._owner !== this._userID) {
            this._element.querySelector('.element__delete').remove()
        }
        if (this._whoLiked) {
            this._youLiked = this._whoLiked.some((item) => {
                return this._userID === item._id
            })
            if (this._youLiked) {
                this._element.querySelector('.element__like').classList.add('element__like_active')
            }
        }
    }

    _setEventListeners() {
        this._element.querySelector('.element__like').addEventListener('click', (evt) => {
            this._handleLikeClick(evt)
        })

        if (this._owner === this._userID) {
            this._element.querySelector('.element__delete').addEventListener('click', (evt) => {
                this._handleDeleteIconClick(evt);
            })
        }

        this._element.querySelector('.element__photo').addEventListener('click', (evt) => {
            this._handleCardClick(evt)
        })
    }

    generateCard() {
        this._element = this._getTemplate()
        this._setElementAttr()
        this._cardPhoto = this._element.querySelector(".element__photo")
        this._cardPhoto.src = this._link
        this._cardPhoto.alt = this._name
        this._element.querySelector(".element__text").textContent = this._name
        this._setEventListeners()
        return this._element
    }
}