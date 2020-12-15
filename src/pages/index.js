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

// function handleCardClick(name, link) {
//   imagePopup.open(name, link)
// }


// const cardSection = new Section({
//   items: initialCards,
//   renderer: (item) => {
//     const newCard = createCard(item.name, item.link)
//     cardSection.addItem(newCard)
//   }
// }, obj.elementContainerSelector)
// cardSection.renderItems()

// function createCard(name, link) {
//   const newCard = new Card(name, link, obj.templateSelector, handleCardClick)
//   return newCard.generateCard()
// }

// const newUserInfo = new UserInfo(obj.profileNameSelector, obj.profileAboutSelector)


// function fillUserInfo() {
//   return newUserInfo.getUserInfo()
// }

// function setUserInfo(paramObj) {
//   return newUserInfo.setUserInfo(paramObj)
// }

// function fillEditFormFields() {
//   const { name, about } = fillUserInfo()
//   obj.inputName.value = name
//   obj.inputAbout.value = about
// }

// const editFormValidator = new FormValidator(obj.validationConfig, obj.inputEditProfileForm)
// editFormValidator.enableValidation()

// const addFormValidator = new FormValidator(obj.validationConfig, obj.inputAddImageForm)
// addFormValidator.enableValidation()

// const imagePopup = new PopupWithImage(obj.popupImageSelector)
// imagePopup.setEventListeners()

// const editPopup = new PopupWithForm(obj.popupEditProfileSelector, 
//   (paramObj) => {
//     setUserInfo(paramObj)
//   })
// editPopup.setEventListeners()

// function openEditProfilePopup() {
//   fillEditFormFields()
//   editFormValidator.resetState()
//   editPopup.open()
// }

// const addPopup = new PopupWithForm(obj.popupAddImageSelector,
//   ({param1, param2}) => {
//     const newCard = createCard(param1, param2)
//     cardSection.addItem(newCard)
//   })
//   addPopup.setEventListeners()

//   function openAddCardPopup() {
//     obj.inputAddImageForm.reset()
//     addFormValidator.resetState()
//     addPopup.open()
//   }

// obj.editButton.addEventListener('click', openEditProfilePopup)
// obj.popupAddOpen.addEventListener('click', openAddCardPopup)
///////////////////////////////////////
const newUserInfo = new UserInfo(obj.profileNameSelector, obj.profileAboutSelector, obj.profileAvatarSelector)

function setUserInfo(paramObj) {
      return newUserInfo.setUserInfo(paramObj)
}

function fillUserInfo() {
    return newUserInfo.getUserInfo()
}

const confirmPopup = new PopupWithSubmit(obj.popupConfirm, {
    handleCardClick: (evt) => {
        const photoID = evt.target.nextElementSibling.id
        api.deletePhoto(photoID)
            .then((response) => {
                if (response.ok) {
                    handleDeleteIconClick(evt)
                    return response.json()
                }
                return Promise.reject(`Ошибка: ${res.status}`)
            })
            .catch((err) => {
                console.log(err)
            })
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
            .then((res) => {
                if (res.ok) {
                    return res.json()
                }
                return Promise.reject(`Что-то пошло не так: ${res.status}`)
            })
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

function handleLikeIconClick(evt) {
    const element = evt.target.closest('.element')
    const isLiked = evt.target.classList.contains('element__like_active')
    const photoID = element.querySelector('.element__photo').id
    const countOfLike = element.querySelector('.element__amount')
    if (isLiked) {
        api.unlikePhoto(photoID)
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Что-то пошло не так: ${res.status}`)
            })
            .then((data) => {
                countOfLike.textContent = data.likes.length;
                evt.target.classList.remove('element__like_active')
            })
            .catch((err) => {
                console.log(err)
            })
    } else {
        api.likePhoto(photoID)
            .then((res) => {
                if (res.ok) {
                    return res.json()
                }
                return Promise.reject(`Что-то пошло не так: ${res.status}`)
            })
            .then((data) => {
                countOfLike.textContent = data.likes.length
                evt.target.classList.add('element__like_active')
            })
            .catch((err) => {
                console.log(err)
            })
    }
}

let userID

const addPopup = new PopupWithForm(obj.popupAddImageSelector,
        (paramObj) => {
            renderLoading(obj.popupAddImageSelector, true);
            api.postPhoto(paramObj)
                .then((response) => {
                    if (response.ok) {
                        return response.json()
                    }
                    return Promise.reject(`Ошибка: ${res.status}`)
                })
                .then((data) => {
                    addPopup.close()
                    data.userID = userID;
                    const newCard = new Card({
                        data: data,
                        handleCardClick: (evt) => {
                            const cardItem = evt.target
                            const name = cardItem.alt
                            const link = cardItem.src
                            imagePopup.open(link, name)
                        },
                        handleLikeClick: (evt) => {
                            handleLikeIconClick(evt)
                        },
                        handleDeleteIconClick: (evt) => {
                            confirmPopup.open();
                            confirmPopup.chooseFunc(evt)
                        }
                    }, obj.templateSelector)
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
                .then((res) => {
                    if (res.ok) {
                        return res.json()
                    }
                    return Promise.reject(`Что-то пошло не так: ${res.status}`)
                })
                .then((data) => {
                    setUserInfo(data)
                    updateAvatarPopup.close()
                })
                .catch((err) => {
                    console.log(err)
                })
                .finally(() => {
                    renderLoading(obj.popupUpdateAvatar, false)
                });
        }
)
updateAvatarPopup.setEventListeners()

function getNewCardSection(initialCards) {
        const cardSection = new Section({
            items: initialCards,
            renderer: (item) => {
                const newCard = new Card({
                    data: {
                        "name": item.name,
                        "link": item.link,
                        "likes": item.likes,
                        "_id": item._id,
                        "owner": item.owner,
                        "userID": userID,
                        "whoLiked": item.likes
                    },
                    handleCardClick: (evt) => {
                        const cardItem = evt.target
                        const link = cardItem.src
                        const name = cardItem.alt
                        imagePopup.open(link, name)
                    },
                    handleLikeClick: (evt) => {
                        handleLikeIconClick(evt)
                    },
                    handleDeleteIconClick: (evt) => {
                        confirmPopup.open()
                        confirmPopup.chooseFunc(evt)
                    }
                }, obj.templateSelector)
                cardSection.addItem(newCard.generateCard())
            }
        }, obj.elementContainerSelector)
        return cardSection
}

const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-18/cards',
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
    });

function handleDeleteIconClick(evt) {
    evt.target.closest('.element').remove()
    confirmPopup.close()
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