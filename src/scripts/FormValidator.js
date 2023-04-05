export class FormValidator {
    constructor(validationOptions, formElement) {
        this._validationOptions = validationOptions;
        this._form = formElement;
        this._inputList = Array.from(this._form.querySelectorAll(this._validationOptions.inputSelector));
        this._submitElement = this._form.querySelector(this._validationOptions.submitSelector);
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
        const formIsValid = this._form.checkValidity();

        if (formIsValid) {
            this._enableButton(this._submitElement);
        } else {
            this._disableButton(this._submitElement);
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
        this._form.addEventListener = ('submit', this._stopSubmit);
        this._inputList.forEach(inputElement => {
            inputElement.addEventListener('input', () => {
                this._toggleInputState(inputElement);
                this._toggleButtonState();
            });
        });
    };

    cleanValidation = () => {
        this._cleanInputErrors();
        this._toggleButtonState();
    };


    _cleanInputErrors = () => {
        this._inputList.forEach(inputElement => {
            this._hideError(inputElement);
        });
    };

    enableValidation() {
        this._setEventListeners();
    }
}