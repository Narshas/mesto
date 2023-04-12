import { Popup } from './Popup.js'
export class PopupWithImage extends Popup {
    constructor(popup) {
        super(popup)
        this._cardImage = this._popup.querySelector('.popup__image');
        this._cardTitle = this._popup.querySelector('.popup__caption');
    }

    open(fielForm) {
        super.open();
        this._cardTitle.textContent = fielForm.name;
        this._cardImage.alt = fielForm.name;
        this._cardImage.src = fielForm.link;
    }
}