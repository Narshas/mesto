import { Popup } from './Popup.js'
//на вход мы сюда передаем весь массив данных о карточке cardData — надо это учесть
export class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector)
        this._cardImage = this._popup.querySelector('.popup__image');
        this._cardTitle = this._popup.querySelector('.popup__caption');
    }

    open(cardData) {
        super.open();
        this._cardTitle.textContent = cardData.name;
        this._cardImage.alt = cardData.name;
        this._cardImage.src = cardData.link;
    }
}