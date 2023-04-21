export class Api {
    //aka (options)
    constructor(settings) {
        this._baseUrl = setting.baseUrl;
        this._headers = setting.headers;
    }

    //https://mesto.nomoreparties.co/v1/cohort-64

    getDefoltElements() {
        return fetch(`${this._baseUrl}/cards`, { headers: this._headers })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }

                return Promise.reject(`Ошибка: ${res.status}`);
                //тут смотрим ошибку, нужно положить под каждый return res
            })
            .catch(err => {
                console.log(err)
            })
    }

    getNewCard() {
        return fetch(this._baseUrl, { headers: this._headers })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`)
            })
            .catch(err => {
                console.log(err)
            })
    }

    //aka CreateTask
    postNewCard(cardInfo) {
        return fetch(`${this._baseUrl}/cards`, {
            method: 'POST',
            headers: this._headers,
            //если в своём запросе я хочу что-то отправить на сервер,
            // то логично у запроса должно быть тело
            body: JSON.stringify({
                name: cardInfo.name,
                link: cardInfo.link
            })
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`)
            })
            .catch(err => {
                console.log(err)
            })
    }

    deleteCard() {
        //_cardId есть в её джейсоне, только как его достать
        return fetch(`${this._baseUrl}/cards${this._cardId}`, { headers: this._headers })
    }

    getUserInfo() {
        return fetch(`${this._baseUrl}/users/me`, { headers: this._headers })


    }

    postUserInfo(userName, userAbout) {
        return fetch('https://mesto.nomoreparties.co/v1/cohort-64/users/me', {
            method: 'PATCH',
            headers: {
                authorization: '6891c063-8435-431b-87d5-a0d9903b0e56',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: userName,
                about: userAbout
            })
        })
    }

    likeCard() {

    }

    deleteLikeCard() {
        //Это скорее всего не понадобится, вспомни как лайк переключался в теории
    }

}