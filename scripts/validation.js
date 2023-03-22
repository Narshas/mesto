







const toggleInputState = (formElement, inputElement, validationOptions) => {
    const isValid = inputElement.validity.valid;
    if (isValid) {
        hideError(formElement, inputElement, validationOptions);
    } else {
        console.log(formElement, inputElement, inputElement.validationMessage, validationOptions);
        showError(formElement, inputElement, inputElement.validationMessage, validationOptions);
    }
}

const stopSubmit = (e) => {
    e.preventDefault();
}

const setEventListeners = (form, validationOptions) => {
    const inputs = Array.from(form.querySelectorAll(validationOptions.inputSelector));
    form.addEventListener = ('submit', stopSubmit);
    inputs.forEach(inputElement => {
        const formElement = inputElement.closest(validationOptions.formSelector);
        inputElement.addEventListener('input', () => {
            toggleInputState(formElement, inputElement, validationOptions);
            toggleButtonState(formElement, validationOptions);
        });
    });
};

const cleanValidation = (formElement, validationOptions) => {
    cleanInputError(formElement, validationOptions);
    toggleButtonState(formElement, validationOptions);
};

const enableValidation = (validationOptions) => {
    const forms = Array.from(document.querySelectorAll(validationOptions.formSelector));

    forms.forEach(form => {
        setEventListeners(form, validationOptions);

    });
};