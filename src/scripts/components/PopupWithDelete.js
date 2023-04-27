import { Popup } from "./Popup.js";
export class PopupWithDelete extends Popup {
    constructor(popupSelector, { handleFormSubmit }) {
        super(popupSelector)
        this._formDelete = this._popup.querySelector('.popup__form_delete')
        this._handleFormSubmit = handleFormSubmit
    }

    open(cardElement, cardData) {
        super.open();
        this._cardData = cardData;
        this._element = cardElement;
    }

    // handleDelete(deleteFunction) {
    //     this._handleDelete = deleteFunction;
    // }

    setEventListeners() {
        super.setEventListeners()
        this._formDelete.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleFormSubmit(this._element, this._cardData);
        })
    }

}