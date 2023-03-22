class FormValidator {
    constructor(validationOptions, popup) {
        this._validationOptions = validationOptions;
        this._formSelector = validationOptions.formSelector;
        this._submitSelector = validationOptions.submitSelector;
        this._inputSelector = validationOptions.inputSelector;

        this._disabledButtonClass = validationOptions.disabledButtonClass;
        this._inputInvalidClass = validationOptions.inputInvalidClass;
        this._inputErrorSelector = validationOptions.inputErrorSelector;
        this._inputErrorClass = validationOptions.inputErrorClass;

        this._form = popup;
        this._inputList = Array.from(this._form.querrySlectorAll(this.inputSelector));
        this._submitSelector = this._form.querySelector(this._submitSelector);
        //дубль
    }

    //использует переменную из конструктора
    const cleanInputError = (formElement, validationOptions) => {
        const inputs = Array.from(formElement.querySelectorAll(validationOptions.inputSelector));
        inputs.forEach(inputElement => {
            hideError(formElement, inputElement, validationOptions)
        });
    };

    _showError = (formElement, inputElement, validationMessage, validationOptions) => {
        const errorElement = formElement.querySelector(`.popup__input-error_${inputElement.id}`);
        inputElement.classList.add(validationOptions.inputInvalidClass);
        errorElement.textContent = validationMessage;
        errorElement.classList.add(validationOptions.inputErrorClass);
    };

    _hideError = (formElement, inputElement, validationOptions) => {
        const errorElement = formElement.querySelector(`.popup__input-error_${inputElement.id}`);
        inputElement.classList.remove(validationOptions.inputInvalidClass);
        errorElement.textContent = '';
        errorElement.classList.remove(validationOptions.inputErrorClass);
    };

    _toggleButtonState = (formElement, validationOptions) => {
        const submitElement = formElement.querySelector(validationOptions.submitSelector);
        const formIsValid = formElement.checkValidity();

        if (formIsValid) {
            enableButton(submitElement, validationOptions);
        } else {
            disableButton(submitElement, validationOptions);
        }
    };

    _enableButton = (submitElement, validationOptions) => {
        submitElement.removeAttribute('disabled');
        submitElement.classList.remove(validationOptions.disabledButtonClass);
    };

    _disableButton = (submitElement, validationOptions) => {
        submitElement.setAttribute('disabled', true);
        submitElement.classList.add(validationOptions.disabledButtonClass);
    };

    // тут вызываем enableValidation и в ней вызываем setEventListener
    // Деклаируем setEventListener выше в классе

}

export { FormValidator };