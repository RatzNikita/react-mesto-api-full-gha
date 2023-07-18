class Api {
    constructor(options) {
        this._options = options
    }

    getInitialCards() {
        return fetch(`${this._options.baseUrl}/cards`, {
            method: 'GET', headers: this._options.headers
        })
            .then(res => {
                return this._checkStatus(res)
            })
    }

    postCard(name, link) {
        return fetch(`${this._options.baseUrl}/cards`, {
            method: 'POST', headers: this._options.headers, body: JSON.stringify({
                name: name, link: link
            })
        })
            .then(res => {
                return this._checkStatus(res)
            })
    }

    deleteCard(id) {
        return fetch(`${this._options.baseUrl}/cards/${id}`, {
            method: 'DELETE', headers: this._options.headers,
        })
            .then(res => {
                return this._checkStatus(res)
            })
    }

    setLikeToCard(id) {
        return fetch(`${this._options.baseUrl}/cards/${id}/likes`, {
            method: 'PUT', headers: this._options.headers,
        })
            .then(res => {
                return this._checkStatus(res)
            })
    }

    removeLikeFromCard(id) {
        return fetch(`${this._options.baseUrl}/cards/${id}/likes`, {
            method: 'DELETE', headers: this._options.headers,
        })
            .then(res => {
                return this._checkStatus(res)
            })
    }

    changeLikeCardStatus(id, isLiked) {
        if (isLiked) {
            return this.removeLikeFromCard(id)
        } else {
            return this.setLikeToCard(id)
        }
    }

    getUserInfo() {
        return fetch(`${this._options.baseUrl}/users/me`, {
            method: 'GET', headers: this._options.headers
        })
            .then(res => {
                return this._checkStatus(res)
            })
    }

    setUserInfo(name, about) {
        return fetch(`${this._options.baseUrl}/users/me`, {
            method: 'PATCH', headers: this._options.headers, body: JSON.stringify({
                name: name, about: about
            })
        })
            .then(res => {
                return this._checkStatus(res)
            })
    }

    updateUserAvatar(url) {
        return fetch(`${this._options.baseUrl}/users/me/avatar`, {
            method: 'PATCH', headers: this._options.headers, body: JSON.stringify({
                avatar: url,
            })
        })
            .then(res => {
                return this._checkStatus(res)
            })
    }

    _checkStatus(res) {
        return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
    }
}

export const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-64', headers: {
        authorization: 'da5e3f1b-5494-4e8a-9664-96fdffad12db', 'Content-Type': 'application/json'
    }
});