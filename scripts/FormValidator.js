export class FormValidator {
    constructor(validationOptions, popup) {
        this._validationOptions = validationOptions;
        this._form = popup.querySelector('.popup__form');
        this._inputList = Array.from(this._form.querrySlectorAll(this.inputSelector));
    }

    _enableButton = (submitElement) => {
        submitElement.removeAttribute('disabled');
        submitElement.classList.remove(this._validationOptions.disabledButtonClass);
    };

    _disableButton = (submitElement) => {
        submitElement.setAttribute('disabled', true);
        submitElement.classList.add(this._validationOptions.disabledButtonClass);
    };

    _toggleButtonState = () => {
        const submitElement = this._form.querySelector(this._validationOptions.submitSelector);
        const formIsValid = this._form.checkValidity();

        if (formIsValid) {
            this._enableButton(submitElement);
        } else {
            this._disableButton(submitElement);
        }
    };

    _showError = (inputElement, validationMessage) => {
        const errorElement = this._form.querySelector(`.popup__input-error_${inputElement.id}`);
        inputElement.classList.add(this._validationOptions.inputInvalidClass);
        errorElement.textContent = validationMessage;
        errorElement.classList.add(this._validationOptions.inputErrorClass);
    };

    _hideError = (inputElement) => {
        const errorElement = this._form.querySelector(`.popup__input-error_${inputElement.id}`);
        inputElement.classList.remove(this._validationOptions.inputInvalidClass);
        errorElement.textContent = '';
        errorElement.classList.remove(this._validationOptions.inputErrorClass);
    };

    _toggleInputState = (inputElement) => {
        const isValid = inputElement.validity.valid;
        if (isValid) {
            this._hideError(inputElement);
        } else {
            this._showError(inputElement, inputElement.validationMessage);
        }
    }

    _stopSubmit = (e) => {
        e.preventDefault();
    }

    _setEventListeners = () => {
        //const inputs = Array.from(form.querySelectorAll(validationOptions.inputSelector));
        this._form.addEventListener = ('submit', this._stopSubmit);
        this._inputList.forEach(inputElement => {
            inputElement.addEventListener('input', () => {
                this._toggleInputState(inputElement);
                this._toggleButtonState();
            });
        });
    };

    cleanValidation = () => {
        this._cleanInputError();
        this._toggleButtonState();
    };


    _cleanInputError = () => {
        this._inputList.forEach(inputElement => {
            this._hideError(inputElement);
        });
    };

    enableValidation() {
        this._setEventListeners();
    }
}