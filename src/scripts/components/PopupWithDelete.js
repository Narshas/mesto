import { Popup } from "./Popup.js";
export class PopupWithDelete extends Popup {
    constructor(popupSelector,) {
        super(popupSelector)
    }

    open() {
        super.open()

    }

    showLoading() {

    }

    setEventListeners() {
        super.setEventListeners()
        popup__form_delete
    }

}