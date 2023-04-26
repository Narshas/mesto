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

    patchUserInfo(userData) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: userData.name,
                about: userData.about
            })
        })
            .then(res => this._testRes(res))
            .catch(err => {
                console.log(err)
            })
    }

    addlike(cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}`, {
            method: 'PUT',
            headers: this._headers
        })
            .then(res => this._testRes(res))
            .catch(err => {
                console.log(err)
            })
    }

    removeLike(cardId) {
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

    patchAvatar(avatarData) {
        return fetch(`${this._baseUrl}/cards/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: avatarData.avatarurl
            })
        })
            .then(res => this._testRes(res))
            .catch(err => {
                console.log(err)
            })
    }
}