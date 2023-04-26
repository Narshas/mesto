import { Popup } from "./Popup.js";
export class PopupWithDelete extends Popup {
    constructor(popupSelector) {
        super(popupSelector)
    }

    handleDelete(deleteFunction) {
        this._handleDelete = deleteFunction;
    }

    setEventListeners() {
        super.setEventListeners()
        this._popup.querySelector('.popup__form_delete').addEventListener('submit', () => {
            evt.preventDefault();
            this._handleDelete();
        })
    }

}