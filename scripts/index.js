import { defoltElements } from './PresetCards.js';
import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';

/* -- DOM -- */
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');

const buttonProfile = document.querySelector('.profile__edit-button');
const popupProfile = document.querySelector('.popup_profile');
const nameInput = popupProfile.querySelector('#username-input');
const jobInput = popupProfile.querySelector('#about-input');

const buttonAddCard = document.querySelector('.profile__add-button');
const popupPlace = document.querySelector('.popup_place');
const placeNameInput = popupPlace.querySelector('#place-name-input');
const placeImageInput = popupPlace.querySelector('#place-image-input');

const popupZoom = document.querySelector('.popup_zoom');
const popupImage = popupZoom.querySelector('.popup__image');
const popupCaption = popupZoom.querySelector('.popup__caption');

const buttonClose = popupProfile.querySelector('.popup__close_profile');
const buttonPlaceClose = popupPlace.querySelector('.popup__close_place');

const formElement = popupProfile.querySelector('.popup__form_profile');
const formPlaceElement = popupPlace.querySelector('.popup__form_place');

const elementsList = document.querySelector('.elements__list');
const cardTemplate = document.querySelector('#user-card');

//const newElementTitle = document.querySelector('.elements__title');
//const newElementImage = document.querySelector('.elements__image');
//const cardForm = document.querySelector('.popup__form_place');

/* -- функции обработчики-- */

const closePopup = (popup) => {
    popup.classList.remove('popup_active');
    document.removeEventListener('keyup', handleEsc);
}

const closePopupOverlay = (event) => {
    if (event.target === event.currentTarget) {
        closePopup(event.currentTarget);
    }
};

const handleEsc = (evt) => {
    if (evt.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_active');
        closePopup(openedPopup);
    }
};

const openPopup = (popup) => {
    popup.classList.add('popup_active');
    document.addEventListener('keyup', handleEsc);
}

const editPopupProfile = () => {
    openPopup(popupProfile);
    nameInput.value = profileName.textContent;
    jobInput.value = profileAbout.textContent;
    validationProfile.cleanValidation();
}

const handleFormSubmit = (evt) => {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileAbout.textContent = jobInput.value;
    closePopup(popupProfile);
}

const handlePlaceFormSubmit = (evt) => {
    evt.preventDefault();
    const fieldForm = {
        name: placeNameInput.value,
        link: placeImageInput.value
    };
    renderElement(fieldForm);
    placeNameInput.value = '';
    placeImageInput.value = '';
    closePopup(popupPlace);
}

const imageZoom = (evt) => {
    const itCard = evt.target.closest('.elements__item');
    popupCaption.textContent = itCard.querySelector('.elements__title').textContent;
    popupImage.src = itCard.querySelector('.elements__image').src;
    popupImage.alt = itCard.querySelector('.elements__title').textContent;
    openPopup(popupZoom);
};

/* --Рендеринг карточек-- */

const renderElement = (fieldForm) => {
    const cardElement = new Card(fieldForm, cardTemplate, imageZoom);
    return elementsList.prepend(cardElement.generateElement(fieldForm));
};

defoltElements.forEach(element => {
    renderElement(element);
});

/* ---- */

buttonProfile.addEventListener('click', editPopupProfile);

formElement.addEventListener('submit', handleFormSubmit);

formPlaceElement.addEventListener('submit', handlePlaceFormSubmit);

buttonClose.addEventListener('click', () => {
    closePopup(popupProfile)
});

popupZoom.querySelector('.popup__close_zoom').addEventListener('click', () => {
    closePopup(popupZoom)
});

popupProfile.addEventListener('click', closePopupOverlay);
popupPlace.addEventListener('click', closePopupOverlay);
popupZoom.addEventListener('click', closePopupOverlay);

buttonPlaceClose.addEventListener('click', () => {
    closePopup(popupPlace)
});

buttonAddCard.addEventListener('click', () => {
    openPopup(popupPlace);
    validationPlace.cleanValidation();
    formPlaceElement.reset();
});
/* ------------- Валидация ------------- */

const validationOptions = {
    formSelector: '.popup__form',
    submitSelector: '.popup__submit',
    inputSelector: '.popup__input',
    disabledButtonClass: 'popup__submit_inactive',
    inputInvalidClass: 'popup__input_invalid',
    inputErrorSelector: '.popup__input-error',
    inputErrorClass: 'popup__input-error_active',
};

const validationProfile = new FormValidator(validationOptions, popupProfile);
const validationPlace = new FormValidator(validationOptions, popupPlace);

validationProfile.enableValidation();
validationPlace.enableValidation();