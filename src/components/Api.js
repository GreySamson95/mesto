export class Api {
    constructor({ baseUrl, headers }) {
        this._url = baseUrl
        this._headers = headers
    }

    _getResponseData(res) {
        if (res.ok) {
            return res.json()
        }
        return Promise.reject(`Ошибка: ${res.status}`)
    }  

    getInitialCards() {
        return fetch(`${this._url}cards`, {
                headers: this._headers,
            })
            .then(this._getResponseData)
    }

    getInformation() {
        return fetch(`${this._url}users/me`, {
                headers: this._headers,
            })
            .then(this._getResponseData)
    }

    getAllNeededData() {
        return Promise.all([this.getInformation(), this.getInitialCards()])
    }

    updateInformation({ name, about }) {
        return fetch(`${this._url}users/me`, {
            method: 'PATCH',
            headers: this._headers,
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
            headers: this._headers,
            body: JSON.stringify({
                avatar: avatar
            })
        })
        .then(this._getResponseData)
    }

    postPhoto({ name, link }) {
        return fetch(`${this._url}cards`, {
            method: 'POST',
            headers: this._headers,
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
            headers: this._headers,
        })
        .then(this._getResponseData)
    }

    likePhoto(id) {
        return fetch(`${this._url}cards/likes/${id}`, {
            method: 'PUT',
            headers: this._headers,
        })
        .then(this._getResponseData)
    }

    unlikePhoto(id) {
        return fetch(`${this._url}cards/likes/${id}`, {
            method: 'DELETE',
            headers: this._headers,
        })
        .then(this._getResponseData)
    }
}
