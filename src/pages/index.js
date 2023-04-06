import './index.css';
import { defoltElements } from '../scripts/PresetCards.js';
import { Card } from '../scripts/Card.js';
import { FormValidator } from '../scripts/FormValidator.js';
import { UserInfo } from '../scripts/UserInfo';

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

const formProfileElement = document.forms['profile__info'];
const formPlaceElement = document.forms['place'];

const elementsList = document.querySelector('.elements__list');
const cardTemplate = document.querySelector('#user-card');

const popups = document.querySelectorAll('.popup');
const formValidators = {};

/* ---- */

const userInfo = new UserInfo({
    userName: document.querySelector('.profile__name'),
    userAbout: document.querySelector('.profile__about')
})

/* -- функции обработчики-- */

// popups.forEach(popup => {
//     popup.addEventListener('mousedown', (evt) => {
//         if (evt.target.classList.contains('popup_active')) {
//             closePopup(popup);
//         }
//         if (evt.target.classList.contains('popup__close')) {
//             closePopup(popup)
//         }
//     })
// })

// const closePopup = (popup) => {
//     popup.classList.remove('popup_active');
//     document.removeEventListener('keyup', handleEsc);
// }

// const handleEsc = (evt) => {
//     if (evt.key === 'Escape') {
//         const openedPopup = document.querySelector('.popup_active');
//         closePopup(openedPopup);
//     }
// };

// const openPopup = (popup) => {
//     popup.classList.add('popup_active');
//     document.addEventListener('keyup', handleEsc);
// }
//-----//

const editPopupProfile = () => {
    openPopup(popupProfile);
    nameInput.value = profileName.textContent;
    jobInput.value = profileAbout.textContent;
    formValidators['profile__info'].cleanValidation();
}

const handleProfileFormSubmit = (evt) => {
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
    evt.target.reset();
    closePopup(popupPlace);
}

const handleCardClick = (evt) => {
    const itCard = evt.target.closest('.elements__item');
    popupCaption.textContent = itCard.querySelector('.elements__title').textContent;
    popupImage.src = itCard.querySelector('.elements__image').src;
    popupImage.alt = itCard.querySelector('.elements__title').textContent;
    openPopup(popupZoom);
};

/* --Рендеринг карточек-- */


const renderElement = (fieldForm) => {
    elementsList.prepend(createCard(fieldForm));
};

const createCard = (fieldForm) => {
    const cardElement = new Card(fieldForm, cardTemplate, handleCardClick);
    return cardElement.generateElement(fieldForm);
}

defoltElements.forEach(renderElement);

/* -- создание секции -- */

const elementsSection = new Section({
    defoltElements,
    renderer: (item) => {
        elementsSection.addItem(createCard(item));
    },
}, elementsList
)

/* ---- */

buttonProfile.addEventListener('click', editPopupProfile);

formProfileElement.addEventListener('submit', handleProfileFormSubmit);

formPlaceElement.addEventListener('submit', handlePlaceFormSubmit);

buttonAddCard.addEventListener('click', () => {
    openPopup(popupPlace);
    formPlaceElement.reset();
    formValidators['place'].cleanValidation();
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

const enableValidation = (validationOptions) => {
    const formList = Array.from(document.querySelectorAll(validationOptions.formSelector))
    formList.forEach((formElement) => {
        const validator = new FormValidator(validationOptions, formElement)
        // получаем данные из атрибута `name` у формы
        const formName = formElement.getAttribute('name')

        // вот тут в объект записываем под именем формы
        formValidators[formName] = validator;
        validator.enableValidation();
    });
};

enableValidation(validationOptions);