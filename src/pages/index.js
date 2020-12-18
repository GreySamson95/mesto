import { Api } from '../components/Api.js'
import { Section } from '../components/Section.js'
import { Card } from '../components/Card.js'
import { FormValidator } from '../components/FormValidator.js'
import { PopupWithImage } from '../components/PopupWithImage.js'
import { PopupWithForm } from '../components/PopupWithForm.js'
import { PopupWithSubmit } from '../components/PopupWithSubmit.js'
import { UserInfo } from '../components/UserInfo.js'
import * as obj from '../constants/constants.js'
import '../pages/index.css'

const newUserInfo = new UserInfo(obj.profileNameSelector, obj.profileAboutSelector, obj.profileAvatarSelector)

const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-18/',
    headers: {
        authorization: '66264c4a-1a87-4c46-9ef9-8541779913f9',
        'Content-Type': 'application/json'
    }
})

api.getAllNeededData()
    .then((result) => {
        const [dataFromFirstPromise, dataFromSecondPromise] = result
        userID = dataFromFirstPromise._id
        setUserInfo({
            "name": dataFromFirstPromise.name,
            "about": dataFromFirstPromise.about,
            "avatar": dataFromFirstPromise.avatar
        })
        return dataFromSecondPromise
    })
    .then((dataFromSecondPromise) => {
        const initialCards = dataFromSecondPromise
        getNewCardSection(initialCards).renderItems()
    })
    .catch((err) => {
        console.log(err)
    })

function setUserInfo(paramObj) {
    return newUserInfo.setUserInfo(paramObj)
}

function fillUserInfo() {
    return newUserInfo.getUserInfo()
}

const confirmPopup = new PopupWithSubmit(obj.popupConfirm, {
    handleCardClick: (card) => {
        api.deletePhoto(card._id)
            .then((res) => {
        card.removeCard()
        confirmPopup.close()})
    }
})
confirmPopup.setEventListeners()

const imagePopup = new PopupWithImage(obj.popupImageSelector)
imagePopup.setEventListeners()

function renderLoading(popupSelector, isLoading) {
    const popup = document.querySelector(popupSelector)
    const sumbitButton = popup.querySelector('.popup__submit-button')
    if (isLoading) {
        sumbitButton.textContent = 'Сохранение...'
    } else {
        sumbitButton.textContent = 'Сохранить'
    }
}

const editPopup = new PopupWithForm(obj.popupEditProfileSelector,
    (paramObj) => {
        renderLoading(obj.popupEditProfileSelector, true)
        api.updateInformation(paramObj)
            .then((data) => {
                setUserInfo(data)
                editPopup.close()
            })
            .catch((err) => {
                console.log(err)
            })
            .finally(() => {
                renderLoading(obj.popupEditProfileSelector, false)
            })
    }
)
editPopup.setEventListeners()

let userID

const addPopup = new PopupWithForm(obj.popupAddImageSelector,
        (paramObj) => {
            renderLoading(obj.popupAddImageSelector, true);
            api.postPhoto(paramObj)
                .then((data) => {
                    addPopup.close()
                    data.userID = userID;
                    const newCard = createCard(data);
                    getNewCardSection().addItem(newCard.generateCard())
                })
                .catch((err) => {
                    console.log(err)
                })
                .finally(() => {
                    renderLoading(obj.popupAddImageSelector, false)
                });
        }
)

addPopup.setEventListeners()
const updateAvatarPopup = new PopupWithForm(obj.popupUpdateAvatar,
        (paramObj) => {
            renderLoading(obj.popupUpdateAvatar, true)
            api.updateAvatar(paramObj)
                .then((data) => {
                    setUserInfo(data)
                    updateAvatarPopup.close()
                })
                .catch((err) => {
                    console.log(err)
                })
                .finally(() => {
                    renderLoading(obj.popupUpdateAvatar, false)
                })
        }
)

updateAvatarPopup.setEventListeners()


function createCard (data) { 
    const card = new Card({ 
    data, 
    handleCardClick: (evt) => { 
        const cardItem = evt.target 
        const link = cardItem.src 
        const name = cardItem.alt 
        imagePopup.open(link, name) 
    }, 
    handleLikeClick: (evt) => { 
        const isLiked = evt.target.classList.contains('element__like_active') 
        if (isLiked) { 
            api.unlikePhoto(data._id) 
                .then((data) => { 
                    card.handleDisLike() 
                    card.setNumberOfLikes(data.likes.length) 
                }) 
                .catch((err) => { 
                    console.log(err) 
                }) 
        } else { 
            api.likePhoto(data._id) 
                .then((data) => { 
                    card.handleAddLike() 
                    card.setNumberOfLikes(data.likes.length) 
                }) 
                .catch((err) => { 
                    console.log(err) 
                }) 
        } 
    }, 
    handleDeleteIconClick: (evt) => { 
        confirmPopup.open() 
        confirmPopup.chooseFunc(card); 
    }, 
}, userID, obj.templateSelector) 
return card; 
} 

function getNewCardSection(initialCards) {
        const cardSection = new Section({
            items: initialCards,
            renderer: (item) => {
                const newCard = createCard(item)
                cardSection.addItem(newCard.generateCard())
            }
        }, obj.elementContainerSelector)
        return cardSection
}



const editFormValidator = new FormValidator(obj.validationConfig, obj.inputEditProfileForm)
editFormValidator.enableValidation()
const addFormValidator = new FormValidator(obj.validationConfig, obj.inputAddImageForm)
addFormValidator.enableValidation()
const updateAvatarValidator = new FormValidator(obj.validationConfig, obj.inputUpdateAvatardForm)
updateAvatarValidator.enableValidation()

function fillEditFormFields() {
   const { name, about } = fillUserInfo()
    obj.inputName.value = name
    obj.inputAbout.value = about
}

function openEditProfilePopup() {
    fillEditFormFields()
    editFormValidator.resetState()
    editPopup.open()
}

function openAddCardPopup() {
      obj.inputAddImageForm.reset()
      addFormValidator.resetState()
      addPopup.open()
}

function openUpdateAvatarPopup() {
    obj.inputUpdateAvatardForm.reset()
    updateAvatarValidator.resetState()
    updateAvatarPopup.open()
}

  obj.editButton.addEventListener('click', openEditProfilePopup)
  obj.popupAddOpen.addEventListener('click', openAddCardPopup)
  obj.updateAvatarButton.addEventListener('click', openUpdateAvatarPopup)