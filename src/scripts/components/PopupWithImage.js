import Popup from './Popup.js'
export class PopupWithImage extends Popup {
    constructor(popup) {
        super(popup)
        this._cardImage = this._popupElement.querySelector;
        this._cardTitle = this._popupElement.querySelector;
    }

    open(fielForm) {
        super.open();
        this._cardTitle.textContent = fielForm.name;
        this._cardImage.alt = fielForm.name;
        this._cardImage.src = fielForm.link;
    }
}