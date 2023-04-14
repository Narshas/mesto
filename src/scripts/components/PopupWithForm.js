import { Popup } from './Popup.js';
export class PopupWithForm extends Popup {
    constructor(popup, handleFormSubmit) {
        super(popup)
        this._popup = popup;
        this._handleFormSubmit = handleFormSubmit;
        this._form = popup.querySelector('.popup__form');
        this._inputList = Array.from(this._form.querySelectorAll('.popup__input'));
    }

    _getInputValues() {
        const inputListValues = {};
        this._inputList.forEach(input => {
            inputListValues[input.name] = input.value;
        });
        console.log(inputListValues);
        return inputListValues;
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleFormSubmit(this._getInputValues());
            this.close();
        });
    }

    close() {
        super.close();
        this._form.reset();
    }
}