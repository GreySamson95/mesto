import '../pages/index.css'
import { Section } from '../components/Section.js'
import { Card } from '../components/Card.js'
import { initialCards } from '../constants/initialCards'
import { FormValidator } from '../components/FormValidator.js'
import { PopupWithImage } from '../components/PopupWithImage.js'
import { PopupWithForm } from '../components/PopupWithForm.js'
import { UserInfo } from '../components/UserInfo.js'
import * as obj from '../constants/constants.js'
const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit-button',
    inactiveButtonClass: 'popup__submit-button_disabled',
    inputErrorClass: 'popup__input_error',
    errorClass: 'popup__input-error_active'
  };
  
function handleCardClick(name, link) {
  imagePopup.open(name, link)
}


const cardSection = new Section({
  items: initialCards,
  renderer: (item) => {
    const newCard = createCard(item.name, item.link)
    cardSection.addItem(newCard)
  }
}, obj.elementContainer)
cardSection.renderItems()

function createCard(name, link) {
  const newCard = new Card(name, link, obj.templateSelector, handleCardClick)
  return newCard.generateCard()
}

const newUserInfo = new UserInfo(obj.profileNameSelector, obj.profileSelfSelector)


function fillUserInfo() {
  return newUserInfo.getUserInfo()
}

function setUserInfo(paramObj) {
  return newUserInfo.setUserInfo(paramObj)
}

function fillEditFormFields() {
  const { name, about } = fillUserInfo()
  obj.inputNameSelector.value = name
  obj.inputAboutSelector.value = about
}

const editFormValidator = new FormValidator(validationConfig, obj.inputEditProfileFormSelector)
editFormValidator.enableValidation()

const addFormValidator = new FormValidator(validationConfig, obj.inputAddImageFormSelector)
addFormValidator.enableValidation()

const imagePopup = new PopupWithImage(obj.popupImage)
imagePopup.setEventListeners()

const editPopup = new PopupWithForm(obj.popupEditProfile, 
  (paramObj) => {
    setUserInfo(paramObj)
  })
editPopup.setEventListeners()

function openEditProfilePopup() {
  fillEditFormFields()
  editFormValidator.resetState()
  editPopup.open()
}

const addPopup = new PopupWithForm(obj.popupAddImage,
  ({param1, param2}) => {
    const newCard = createCard(param1, param2)
    cardSection.addItem(newCard)
  })
  addPopup.setEventListeners()

  function openAddCardPopup() {
    obj.inputAddImageFormSelector.reset()
    addFormValidator.resetState()
    addPopup.open()
  }

obj.editButton.addEventListener('click', openEditProfilePopup);
obj.popupAddOpen.addEventListener('click', openAddCardPopup);