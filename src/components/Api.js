export class Api {
    constructor(options) {

    }

    getInitialCards() {
        return fetch('https://mesto.nomoreparties.co/v1/cohort-18/cards', {
                headers: {
                    authorization: '66264c4a-1a87-4c46-9ef9-8541779913f9',
                    'Content-Type': 'application/json'
                }
            })
            .then(res => {
                if (res.ok) {
                    return res.json()
                }
                return Promise.reject(`Ошибка: ${res.status}`)
            })
    }

    getInformation() {
        return fetch('https://mesto.nomoreparties.co/v1/cohort-18/users/me', {
                headers: {
                    authorization: '66264c4a-1a87-4c46-9ef9-8541779913f9',
                    'Content-Type': 'application/json'
                }
            })
            .then(res => {
                if (res.ok) {
                    return res.json()
                }
                return Promise.reject(`Ошибка: ${res.status}`)
            })
    }

    getAllNeededData() {
        return Promise.all([this.getInformation(), this.getInitialCards()])
    }

    updateInformation({ name, about }) {
        return fetch('https://mesto.nomoreparties.co/v1/cohort-18/users/me', {
            method: 'PATCH',
            headers: {
                authorization: '66264c4a-1a87-4c46-9ef9-8541779913f9',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                about: about
            })
        })
    }

    updateAvatar({ avatar }) {
        return fetch('https://mesto.nomoreparties.co/v1/cohort-18/users/me/avatar', {
            method: 'PATCH',
            headers: {
                authorization: '66264c4a-1a87-4c46-9ef9-8541779913f9',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                avatar: avatar
            })
        })
    }

    postPhoto({ name, link }) {
        return fetch('https://mesto.nomoreparties.co/v1/cohort-18/cards', {
            method: 'POST',
            headers: {
                authorization: '66264c4a-1a87-4c46-9ef9-8541779913f9',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                link: link
            })
        })
    }

    deletePhoto(id) {
        return fetch(`https://mesto.nomoreparties.co/v1/cohort-18/cards/${id}`, {
            method: 'DELETE',
            headers: {
                authorization: '66264c4a-1a87-4c46-9ef9-8541779913f9',
                'Content-Type': 'application/json'
            }
        })
    }

    likePhoto(id) {
        return fetch(`https://mesto.nomoreparties.co/v1/cohort-18/cards/likes/${id}`, {
            method: 'PUT',
            headers: {
                authorization: '66264c4a-1a87-4c46-9ef9-8541779913f9',
                'Content-Type': 'application/json'
            }
        })
    }

    unlikePhoto(id) {
        return fetch(`https://mesto.nomoreparties.co/v1/cohort-18/cards/likes/${id}`, {
            method: 'DELETE',
            headers: {
                authorization: '66264c4a-1a87-4c46-9ef9-8541779913f9',
                'Content-Type': 'application/json'
            }
        })
    }
}
