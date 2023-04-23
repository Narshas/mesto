export class Api {
    constructor(settings) {
        this._baseUrl = settings.baseUrl;
        this._headers = settings.headers;
    }

    _testRes(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }

    getUserInfo() {
        return fetch(`${this._baseUrl}/users/me`, { headers: this._headers })
            .then(res => this._testRes(res))
            .catch(err => {
                console.log(err)
            })
    }

    getDefoltElements() {
        return fetch(`${this._baseUrl}/cards`, { headers: this._headers })
            .then(res => this._testRes(res))
            .catch(err => {
                console.log(err)
            })
    }

    postNewCard(cardInfo) {
        return fetch(`${this._baseUrl}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: cardInfo.name,
                link: cardInfo.link
            })
        })
            .then(res => this._testRes(res))
            .catch(err => {
                console.log(err)
            })
    }

    deleteCard(cardId) {
        //_cardId есть в её джейсоне, только как его достать
        return fetch(`${this._baseUrl}/cards/${cardId}`, {
            method: 'DELETE',
            headers: this._headers
        })
            .then(res => this._testRes(res))
            .catch(err => {
                console.log(err)
            })
    }

    patchUserInfo(userName, userAbout) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: userName,
                about: userAbout
            })
        })
            .then(res => this._testRes(res))
            .catch(err => {
                console.log(err)
            })
    }

    addlikeCard(cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}`, {
            method: 'PUT',
            headers: this._headers
        })
            .then(res => this._testRes(res))
            .catch(err => {
                console.log(err)
            })
    }

    deleteLikeCard(cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}`, {
            method: 'DELETE',
            headers: this._headers
        })
            .then(res => this._testRes(res))
            .catch(err => {
                console.log(err)
            })
        //Это скорее всего не понадобится, вспомни как лайк переключался в теории
    }

    patchAvatar(avatar) {
        return fetch(`${this._baseUrl}/cards/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: avatar
            })
        })
            .then(res => this._testRes(res))
            .catch(err => {
                console.log(err)
            })
    }
}