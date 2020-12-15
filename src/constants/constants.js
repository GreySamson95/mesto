export const profileNameSelector = '.profile__name'
export const profileAboutSelector = '.profile__about'
export const profileAvatarSelector = '.profile__avatar'
export const editButton = document.querySelector('.profile__edit-button')
export const popupAddOpen = document.querySelector(".profile__add-button")
export const updateAvatarButton = document.querySelector('.profile__edit')
export const popupAddImageSelector = ".popup_add-image"
export const popupEditProfileSelector = ".popup_edit-profile"
export const popupImageSelector = '.popup-image'
export const popupConfirm = '.popup_confirm'
export const elementContainerSelector = ".elements"
export const inputEditProfileForm = document.forms.editProfile
export const inputName = inputEditProfileForm.elements.name
export const inputAbout = inputEditProfileForm.elements.about
export const inputAddImageForm = document.forms.addImage
export const inputUpdateAvatardForm = document.forms.updatePhoto
export const popupUpdateAvatar = '.popup_update-avatar'
export const templateSelector = '#template-element'
export const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit-button',
    inactiveButtonClass: 'popup__submit-button_disabled',
    inputErrorClass: 'popup__input_error',
    errorClass: 'popup__input-error_active'
  }