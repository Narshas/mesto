const hideError = (errorElement, inputErrorClass, inputInvalidClass) => {
    errorElement.textContent = '';
    errorElement.classList.remove(inputErrorClass);
    inputElement.classList.remove(inputInvalidClass);
};

const showError = (errorElement, message, inputErrorClass, inputInvalidClass) => {
    errorElement.textContent = message;
    errorElement.classList.add(inputErrorClass)
    inputElement.classList.add(inputInvalidClass);
};

const toggleInputState = (inputElement, options) => {
    const isValid = inputElement.validity.valid;
    const formSectionElement = inputElement.closest(option.inputSectionSelector);
    const errorElement = formSectionElement.querySelector(options.inputErrorSelector);

    if (isValid) {
        hideError(errorElement, options.inputErrorClass, options.inputInvalidClass);
    } else {
        showError(errorElement, inputElement.validationMessage, options.inputErrorClass, options.inputInvalidClass);
    }
}

// const hiddenErrorForInput = (inputElement, options) => {
//     const inputSectionElement = inputElement.closest(option.inputSectionSelector);
//     const errorElement = inputSectionElement.querySelector(option.inputErrorSelector);
//     hiddenError(option.errorElement, option.inputErrorClass);
// };

const enableButton = (buttonElement, disabledButtonClass) => {
    buttonElement.removeAttribute('disabled', true);
    buttonElement.classList.remove('.popup__submit_inactive');
};

const disableButton = (buttonElement, disabledButtonClass) => {
    buttonElement.setAttribute('disabled', true);
    buttonElement.classList.add(disabledButtonClass);
};

const toggleButtonState = (inputs, submitElement, disabledButtonClass) => {
    const formIsValid = inputs.every((inputElement) => {
        return inputElement.validity.valid;
    });

    if (formIsValid) {
        enableButton(submitElement, disabledButtonClass);
    } else {
        disableButton(submitElement, disabledButtonClass);
    }
};

const setEventListeners = (form, options) => {
    const submitElement = form.querySelector(options.submitSelector);
    const inputs = Array.from(form.querySelectorAll(options.inputSelector));

    inputs.forEach(inputElement => {
        inputElement.addEventListener('input', () => {
            toggleInputState(inputElement, options);
            toggleButtonState(inputs, submitElement, options.disabledButtonClass);
        });
    });
    toggleButtonState(inputs, submitElement, options.disabledButtonClass);
};

const enableValidation = (options) => {
    const forms = Array.from(document.querySelectorAll(options.formSelector));

    forms.forEach(form => {
        setEventListeners(form, options);
        // console.log(form);

    });
};