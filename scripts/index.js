import { defoltElements } from './PresetCards.js';
import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';

/* -- DOM профиля -- */
const popupProfile = document.querySelector('.popup_profile');
const buttonOpen = document.querySelector('.profile__edit-button');
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');
const nameInput = popupProfile.querySelector('#username-input');
const jobInput = popupProfile.querySelector('#about-input');
const formElement = popupProfile.querySelector('.popup__form_profile');
const buttonClose = popupProfile.querySelector('.popup__close_profile');

const popupPlace = document.querySelector('.popup_place');
const buttonAdd = document.querySelector('.profile__add-button');
const buttonPlaceClose = popupPlace.querySelector('.popup__close_place');
const formPlaceElement = popupPlace.querySelector('.popup__form_place');
const placeNameInput = popupPlace.querySelector('#place-name-input');
const placeImageInput = popupPlace.querySelector('#place-image-input');
const newElementTitle = document.querySelector('.elements__title');
const newElementImage = document.querySelector('.elements__image');

const elementsList = document.querySelector('.elements__list');
const cardForm = document.querySelector('.popup__form_place');
const cardTemplate = document.getElementById('user-card');
const popupZoom = document.querySelector('.popup_zoom');
const popupImage = popupZoom.querySelector('.popup__image');
const popupCaption = popupZoom.querySelector('.popup__caption');

/* -- -- */

function closePopup(popup) {
    popup.classList.remove('popup_active');
    document.removeEventListener('keyup', handleEsc);
}

const closePopupOverlay = (event) => {
    if (event.target === event.currentTarget) {
        closePopup(event.currentTarget);
    }
};

function handleEsc(evt) {
    if (evt.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_active');
        closePopup(openedPopup);
    }
};

function openPopup(popup) {
    popup.classList.add('popup_active');
    document.addEventListener('keyup', handleEsc);
}

function editPopupProfile() {
    openPopup(popupProfile);
    nameInput.value = profileName.textContent;
    jobInput.value = profileAbout.textContent;
    validationProfile.cleanValidation();
}

const imageZoom = (evt) => {
    const itCard = evt.target.closest('.elements__item');
    popupCaption.textContent = itCard.querySelector('.elements__title').textContent;
    popupImage.src = itCard.querySelector('.elements__image').src;
    popupImage.alt = itCard.querySelector('.elements__title').textContent;
    openPopup(popupZoom);
};

/* -- Обработчики профиля -- */





function handleFormSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileAbout.textContent = jobInput.value;
    closePopup(popupProfile);
}



/* --Обработчики места-- */

const handlePlaceFormSubmit = (evt) => {
    evt.preventDefault();
    const fieldForm = {
        name: placeNameInput.value,
        link: placeImageInput.value
    };
    renderElement(elementsList, fieldForm);
    placeNameInput.value = '';
    placeImageInput.value = '';
    closePopup(popupPlace);
}


/* ---- */
buttonOpen.addEventListener('click', editPopupProfile);

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

buttonAdd.addEventListener('click', () => {
    openPopup(popupPlace);
    validationPlace.cleanValidation();
    formPlaceElement.reset();
});

buttonPlaceClose.addEventListener('click', () => {
    closePopup(popupPlace)
});

/* --Рендеринг карточек-- */

// const getElement = (fieldForm) => {
//     const newElement = cardTemplate.content.cloneNode(true);

//     const newElementTitle = newElement.querySelector('.elements__title');
//     const newElementImage = newElement.querySelector('.elements__image');
//     newElementTitle.textContent = fieldForm.name;
//     newElementImage.src = fieldForm.link;
//     newElementImage.alt = fieldForm.name;

//     const buttonLike = newElement.querySelector('.elements__like-button');
//     const buttonDelete = newElement.querySelector('.elements__trash-button');
//     const buttonZoom = newElement.querySelector('.elements__image');

//     buttonDelete.addEventListener('click', cardDelete);
//     buttonLike.addEventListener('click', likeToggle);
//     buttonZoom.addEventListener('click', imageZoom);

//     return newElement;
// };

const renderElement = (wrap, fieldForm) => {
    const cardElement = getElement();
    wrap.prepend(cardElement);
};


defoltElements.forEach((element) => {
    renderElement(elementsList, element);
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

enableValidation(validationOptions);