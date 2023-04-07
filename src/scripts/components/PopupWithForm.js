import Popup from './Popup.js';
export class PopupWithForm extends Popup {
    constructor(popup, { handleFormSubmit }) {
        super(popup)
        this._popup = popup;
        this._handleFormSubmit = handleFormSubmit;
        this._form = popup.querySelector('.popup__form');
        this._inputList = Array.from(this._form.querySelectorAll('.popup__input'));
    }

    _getInputValues() {
        this._inputListValues = {};
        this._inputList.forEach(input => {
            this._inputListValues[input.name] = input.value;
        });
        return this._inputListValues;
    }

    //передача d index

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleFormSubmit(_getInputValues());
            this.close;
        })
    }

    close() {
        super.close();
        this._form.reset();
    }
}