export class Api {
    constructor(options) {
        this._url = 'https://mesto.nomoreparties.co/v1/cohort-18/'
        this._auth = '66264c4a-1a87-4c46-9ef9-8541779913f9'
    }

    _getResponseData(res) {
        if (res.ok) {
            return res.json()
        }
        return Promise.reject(`Ошибка: ${res.status}`)
    }  

    getInitialCards() {
        return fetch(`${this._url}cards`, {
                headers: {
                    authorization: this._auth,
                    'Content-Type': 'application/json'
                }
            })
            .then(this._getResponseData)
    }

    getInformation() {
        return fetch(`${this._url}users/me`, {
                headers: {
                    authorization: this._auth,
                    'Content-Type': 'application/json'
                }
            })
            .then(this._getResponseData)
    }

    getAllNeededData() {
        return Promise.all([this.getInformation(), this.getInitialCards()])
    }

    updateInformation({ name, about }) {
        return fetch(`${this._url}users/me`, {
            method: 'PATCH',
            headers: {
                authorization: this._auth,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                about: about
            })
        })
        .then(this._getResponseData)
    }

    updateAvatar({ avatar }) {
        return fetch(`${this._url}users/me/avatar`, {
            method: 'PATCH',
            headers: {
                authorization: this._auth,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                avatar: avatar
            })
        })
        .then(this._getResponseData)
    }

    postPhoto({ name, link }) {
        return fetch(`${this._url}cards`, {
            method: 'POST',
            headers: {
                authorization: this._auth,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                link: link
            })
        })
        .then(this._getResponseData)
    }

    deletePhoto(id) {
        return fetch(`${this._url}cards/${id}`, {
            method: 'DELETE',
            headers: {
                authorization: this._auth,
                'Content-Type': 'application/json'
            }
        })
        .then(this._getResponseData)
    }

    likePhoto(id) {
        return fetch(`${this._url}cards/likes/${id}`, {
            method: 'PUT',
            headers: {
                authorization: this._auth,
                'Content-Type': 'application/json'
            }
        })
        .then(this._getResponseData)
    }

    unlikePhoto(id) {
        return fetch(`${this._url}cards/likes/${id}`, {
            method: 'DELETE',
            headers: {
                authorization: this._auth,
                'Content-Type': 'application/json'
            }
        })
        .then(this._getResponseData)
    }
}
