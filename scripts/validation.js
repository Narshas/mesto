const hideError = (formElement, inputElement, validationOptions) => {
    const errorElement = formElement.querySelector(`.popup__input-error_${inputElement.id}`);
    inputElement.classList.remove(validationOptions.inputInvalidClass);
    errorElement.textContent = '';
    errorElement.classList.remove(validationOptions.inputErrorClass);
};

const showError = (formElement, inputElement, validationMessage, validationOptions) => {
    const errorElement = formElement.querySelector(`.popup__input-error_${inputElement.id}`);
    inputElement.classList.add(validationOptions.inputInvalidClass);
    errorElement.textContent = validationMessage;
    errorElement.classList.add(validationOptions.inputErrorClass);
};

// const findInputErrorElement = (inputElement, options) => {
//     const formSectionElement = inputElement.closest(options.inputSectionSelector);
//     const errorElement = formSectionElement.querySelector(options.inputErrorSelector);
//     return errorElement;
// };

// const hiddenErrorForInput = (inputElement, options) => {
//
//     const errorElement = findInputErrorElement(inputElement, options);
//     hiddenError(errorElement, options.inputErrorClass);
// };

const enableButton = (submitElement, validationOptions) => {
    submitElement.removeAttribute('disabled');
    submitElement.classList.remove(validationOptions.disabledButtonClass);
};

const disableButton = (submitElement, validationOptions) => {
    submitElement.setAttribute('disabled', true);
    submitElement.classList.add(validationOptions.disabledButtonClass);
};

const toggleButtonState = (formElement, validationOptions) => {
    const submitElement = formElement.querySelector(validationOptions.submitSelector);
    const formIsValid = formElement.checkValidity();

    // const formIsValid = formElement.validity.valid;
    // every((inputElement) => {
    //     return inputElement.validity.valid;
    // });

    if (formIsValid) {
        enableButton(submitElement, validationOptions);
    } else {
        disableButton(submitElement, validationOptions);
    }
};

const toggleInputState = (formElement, inputElement, validationOptions) => {
    const isValid = inputElement.validity.valid;
    // const errorElement = findInputErrorElement(inputElement, options);
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
    // const submitElement = form.querySelector(validationOptions.submitSelector);
    const inputs = Array.from(form.querySelectorAll(validationOptions.inputSelector));
    form.addEventListener = ('submit', stopSubmit);
    inputs.forEach(inputElement => {
        const formElement = inputElement.closest(validationOptions.formSelector);
        inputElement.addEventListener('input', () => {
            toggleInputState(formElement, inputElement, validationOptions);
            toggleButtonState(formElement, validationOptions);
        });
    });
    // toggleButtonState(inputs, submitElement, validationOptions.disabledButtonClass);
};

const cleanInputError = (formElement, validationOptions) => {
    const inputs = Array.from(formElement.querySelectorAll(validationOptions.inputSelector));
    inputs.forEach(inputElement => {
        hideError(formElement, inputElement, validationOptions)
    });
};

const cleanValidation = (formElement, validationOptions) => {
    cleanInputError(formElement, validationOptions);
    toggleButtonState(formElement, validationOptions);
    // console.log(form);
};

const enableValidation = (validationOptions) => {
    const forms = Array.from(document.querySelectorAll(validationOptions.formSelector));

    forms.forEach(form => {
        setEventListeners(form, validationOptions);
        // console.log(form);

    });
};