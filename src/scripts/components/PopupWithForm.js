import { Popup } from './Popup.js';
export class PopupWithForm extends Popup {
    constructor(popupSelector, handleFormSubmit) {
        super(popupSelector)
        this._handleFormSubmit = handleFormSubmit;
        this._form = this._popup.querySelector('.popup__form');
        this._inputList = Array.from(this._form.querySelectorAll('.popup__input'));
        this._submit = this._popup.querySelector('.popup__submit');
        this._submitText = this._submit.textContent;
        //this._handleFormSubmit = this._handleFormSubmit.bind(this)
    }

    _getInputValues() {
        const inputListValues = {};
        this._inputList.forEach(input => {
            inputListValues[input.name] = input.value;
        });
        console.log('инпутЛистВал', inputListValues)
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

    showLoading(stillLoading) {
        if (stillLoading) {
            this._submit.textContent = 'Cохрание ...';
        } else {
            this._submit.textContent = this._submitText;
        }
    }
}