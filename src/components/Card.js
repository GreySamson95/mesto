// export class Card { 
//     constructor({ data, handleCardClick, handleLikeClick, handleDeleteIconClick },  userID, templateSelector) { 
//         this._name = data.name 
//         this._link = data.link 
//         this._likes = data.likes.length 
//         this._id = data._id 
//         this._owner = data.owner._id 
//         this._userID = userID 
//         this._whoLiked = data.whoLiked 
//         this._handleCardClick = handleCardClick 
//         this._handleLikeClick = handleLikeClick 
//         this._handleDeleteIconClick = handleDeleteIconClick 
//         this._templateSelector = templateSelector 
//     } 
//     _getTemplate() { 
//         const cardTemplate = document 
//             .querySelector(this._templateSelector) 
//             .content 
//             .querySelector('.element') 
//             .cloneNode(true) 
//         return cardTemplate 
//     } 
//     _setElementAttr(elemConfig) { 
//         const imageItem = this._element.querySelector(elemConfig.photo); 
//         imageItem.setAttribute('src', this._link) 
//         imageItem.setAttribute('alt', this._name) 
//         imageItem.setAttribute('id', this._id) 
//         this._element.querySelector(elemConfig.text).textContent = this._name 
//         this._element.querySelector(elemConfig.likes).textContent = this._likes 
//         if (this._owner !== this._userID) { 
//             this._element.querySelector('.element__delete').remove() 
//         } 
//         if (this._whoLiked) { 
//             this._youLiked = this._whoLiked.some((item) => { 
//                 return this._userID === item._id 
//             }) 
//             if (this._youLiked) { 
//                 this._element.querySelector('.element__like').classList.add('.element__like_active') 
//             } 
//         } 
//     } 
//     _setEventListeners() { 
//         this._element.querySelector('.element__like').addEventListener('click', (evt) => { 
//             this._handleLikeClick(evt) 
//         }) 
//         if (this._owner === this._userID) { 
//             this._element.querySelector('.element__delete').addEventListener('click', (evt) => { 
//                 this._handleDeleteIconClick(evt) 
//             }) 
//         } 
//         this._element.querySelector('.element__photo').addEventListener('click', (evt) => { 
//             this._handleCardClick(evt) 
//         }) 
//     } 
//     generateCard() { 
//         this._element = this._getTemplate() 
//         const elemConfig = { 
//             photo: '.element__photo', 
//             text: '.element__text', 
//             likes: '.element__amount' 
//         } 
//         this._setElementAttr(elemConfig) 
//         this._setEventListeners() 
//         return this._element 
//     } 
//     removeCard() { 
//         this._element.closest('.element').remove(); 
//         this._element = null; 
//     } 
//     handleDisLike() { 
//         this._element.querySelector('.element__amount').textContent = this._likes -= 1 
//         this._element.querySelector('.element__like').classList.remove('element__like_active') 
//     } 
//     handleAddLike() { 
//         this._element.querySelector('.element__amount').textContent = this._likes += 1 
//         this._element.querySelector('.element__like').classList.add('element__like_active') 
//     } 

//     setNumberOfLikes(amount) { 
//         this._likes.textContent = amount 
//     } 
     
// }


export class Card {
    constructor({ data, handleCardClick, handleLikeClick, handleDeleteIconClick },  userID, templateSelector) {
        this._name = data.name
        this._link = data.link
        this._likes = data.likes.length
        this._id = data._id
        this._owner = data.owner._id
        this._userID = userID
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
    _setElementAttr(elemConfig) {
        const imageItem = this._element.querySelector(elemConfig.photo);
        imageItem.setAttribute('src', this._link)
        imageItem.setAttribute('alt', this._name)
        imageItem.setAttribute('id', this._id)
        this._element.querySelector(elemConfig.text).textContent = this._name
        this._element.querySelector(elemConfig.likes).textContent = this._likes
        if (this._owner !== this._userID) {
            this._element.querySelector('.element__delete').remove()
        }
        // if (this._whoLiked) {
        //     this._youLiked = this._whoLiked.some((item) => {
        //         return this._userID === item._id
        //     })
        //     if (this._youLiked) {
        //         this._element.querySelector('.element__like').classList.add('element__like_active')
        //     }
        // }
        if (this.isLiked()) {
            this._element.querySelector('.element__like').classList.add('element__like_active')
        }
    }
    _setEventListeners() {
        this._element.querySelector('.element__like').addEventListener('click', (evt) => {
            this._handleLikeClick(evt)
        })
        if (this._owner === this._userID) {
            this._element.querySelector('.element__delete').addEventListener('click', (evt) => {
                this._handleDeleteIconClick(evt)
            })
        }
        this._element.querySelector('.element__photo').addEventListener('click', (evt) => {
            this._handleCardClick(evt)
        })
    }
    generateCard() {
        this._element = this._getTemplate()
        const elemConfig = {
            photo: '.element__photo',
            text: '.element__text',
            likes: '.element__amount'
        }
        this._setElementAttr(elemConfig)
        this._setEventListeners()
        return this._element
    }
    removeCard() {
        this._element.closest('.element').remove();
        this._element = null
    }
    handleDisLike() {
        this._element.querySelector('.element__amount').textContent = this._likes -= 1
        this._element.querySelector('.element__like').classList.remove('element__like_active')
    }
    handleAddLike() {
        this._element.querySelector('.element__amount').textContent = this._likes += 1
        this._element.querySelector('.element__like').classList.add('element__like_active')
    }
    // setNumberOfLikes() {
    //     this._element.querySelector('.element__amount').textContent = this._likes
    // }
    isLiked() {
        const cardLikes =  Array.from(this._likes)
        return cardLikes.some((item) => {
            return this._userID == item._id
            })
    }
    
}
