import '../pages/index.css'
import { Section } from '../components/Section.js'
import { Card } from '../components/Card.js'
import { initialCards } from '../constants/initialCards'
import { FormValidator } from '../components/FormValidator.js'
import { PopupWithImage } from '../components/PopupWithImage.js'
import { PopupWithForm } from '../components/PopupWithForm.js'
import { UserInfo } from '../components/UserInfo.js'

// export const imageItem = ".popup-image__element"
// export const imageText = ".popup-image__text"
export const popupImage = '.popup-image'

const profileName = '.profile__name'
const profileSelf = '.profile__self'
const editButton = document.querySelector('.profile__edit-button')
const popupAddOpen = document.querySelector(".profile__add-button")
const popupAddImage = ".popup_add-image"
const popupEditProfile = ".popup_edit-profile"
const elementContainer = ".elements"
const inputEditProfileForm = document.forms.editProfile
const inputName = inputEditProfileForm.elements.name
const inputAbout = inputEditProfileForm.elements.about
const inputAddImageForm = document.forms.addImage


const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit-button',
    inactiveButtonClass: 'popup__submit-button_disabled',
    inputErrorClass: 'popup__input_error',
    errorClass: 'popup__input-error_active'
  };
  
function handleCardClick(evt) {
  const cardItem = evt.target
  const name = cardItem.alt
  const link = cardItem.src
    imagePopup.open(name, link)
}

const cardSection = new Section({
  items: initialCards,
  renderer: (item) => {
    const newCard = new Card(item.name, item.link, handleCardClick)
    cardSection.addItem(newCard.generateCard())
  }
}, elementContainer)
cardSection.renderItems()

const newUserInfo = new UserInfo(profileName, profileSelf)

function fillUserInfo() {
  return newUserInfo.getUserInfo()
}

function setUserInfo(paramObj) {
  return newUserInfo.setUserInfo(paramObj)
}

function fillEditFormFields() {
  const { name, about } = fillUserInfo()
  inputName.value = name
  inputAbout.value = about
}

const editFormValidator = new FormValidator(validationConfig, inputEditProfileForm)
editFormValidator.enableValidation()

const addFormValidator = new FormValidator(validationConfig, inputAddImageForm)
addFormValidator.enableValidation()

const imagePopup = new PopupWithImage(popupImage)

const editPopup = new PopupWithForm(popupEditProfile, 
  (paramObj) => {
    setUserInfo(paramObj)
  })

editPopup.setEventListeners()

function openEditProfilePopup() {
  fillEditFormFields()
  editFormValidator.resetState()
  editPopup.open()
}

const addPopup = new PopupWithForm(popupAddImage,
  ({param1, param2, ...rest}) => {
    const newCard = new Card(param1, param2, handleCardClick)
    cardSection.addItem(newCard.generateCard())
  })
  
  addPopup.setEventListeners()

  function openAddCardPopup() {
    inputAddImageForm.reset()
    addFormValidator.resetState()
    addPopup.open()
  }

editButton.addEventListener('click', openEditProfilePopup);
popupAddOpen.addEventListener('click', openAddCardPopup);

//   function addElement (link, name, templateElement, openImagePopup) {
//     const card = new Card(link, name, templateElement, openImagePopup)
//     const newCard = card.generateCard()
//     return newCard
//   }
    
//   initialCards.forEach((cardItem) => {
//     const cardElement = addElement(cardItem.link, cardItem.name, templateElement, openImagePopup)
//     elementContainer.append(cardElement)
//   })

//   function fillEditFormFields() {
//     inputName.value = profileName.textContent
//     inputAbout.value = profileSelf.textContent
//   }

//   const editFormValidator = new FormValidator(validationConfig, inputEditProfileForm)
//   editFormValidator.enableValidation()

//   const addFormValidator = new FormValidator(validationConfig, inputAddImageForm)
//   addFormValidator.enableValidation()

//   function openEditProfilePopup() {
//     fillEditFormFields()
//     editFormValidator.resetState()
//     openPopup(popupEditProfile)
//   }

//   function openAddImagePopup() {
//     inputAddImageForm.reset()
//     addFormValidator.resetState()
//     openPopup(popupAddImage)
//   }

//   function openImagePopup(link, name) {
//     imageItem.setAttribute('src', link)
//     imageItem.setAttribute('alt', name)
//     imageText.textContent = name
//     openPopup(popupImage)
//   }

//   function submitEditProfileForm(event) {
//     event.preventDefault()
//     profileName.textContent = inputName.value
//     profileSelf.textContent = inputAbout.value
//   }

//   function submitAddItemForm(event) { 
//     event.preventDefault()
//     const cardElement = addElement(inputLink.value, inputPlace.value, templateElement, openImagePopup)
//     elementContainer.prepend(cardElement)
//   }

//   editButton.addEventListener('click', openEditProfilePopup)
//   popupAddOpen.addEventListener('click', openAddImagePopup)
//   inputEditProfileForm.addEventListener('submit', submitEditProfileForm)
//   inputAddImageForm.addEventListener('submit', submitAddItemForm)