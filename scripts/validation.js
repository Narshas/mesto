
const enableValidation = (validationOptions) => {
    const forms = Array.from(document.querySelectorAll(validationOptions.formSelector));

    forms.forEach(form => {
        setEventListeners(form, validationOptions);

    });
};