import './index.css';
import { defoltElements } from '../scripts/PresetCards.js';
import { Card } from '../scripts/components/Card.js';
import { FormValidator } from '../scripts/components/FormValidator.js';
import { Section } from '../scripts/components/Section.js';
import { UserInfo } from '../scripts/components/UserInfo.js';
import { PopupWithImage } from '../scripts/components/PopupWithImage.js';
import { PopupWithForm } from '../scripts/components/PopupWithForm.js';

/* -- DOM -- */
//const profileName = document.querySelector('.profile__name');
//const profileAbout = document.querySelector('.profile__about');

const buttonProfile = document.querySelector('.profile__edit-button');
const popupProfile = document.querySelector('.popup_profile');
const nameInput = popupProfile.querySelector('#username-input');
const jobInput = popupProfile.querySelector('#about-input');

const buttonAddCard = document.querySelector('.profile__add-button');
const popupPlace = document.querySelector('.popup_place');
//const placeNameInput = popupPlace.querySelector('#place-name-input');
const placeImageInput = popupPlace.querySelector('#place-image-input');

const popupZoom = document.querySelector('.popup_zoom');
const popupImage = popupZoom.querySelector('.popup__image');
const popupCaption = popupZoom.querySelector('.popup__caption');

//const formProfileElement = document.forms['profile__info'];
const formPlaceElement = document.forms['place'];

const elementsList = document.querySelector('.elements__list');
const cardTemplate = document.querySelector('#user-card');

//const popups = document.querySelectorAll('.popup');
const formValidators = {};
console.log(nameInput.textContent, placeImageInput.textContent);

/* ---- */

const userInfo = new UserInfo({
    userName: '.profile__name',
    userAbout: '.profile__about'
})

const handleProfileFormSubmit = (profileInfo) => {
    userInfo.setUserInfo(profileInfo);
};

const handlePlaceFormSubmit = (placeInfo) => {
    const fieldForm = {
        name: placeInfo.placetext,
        link: placeInfo.placeurl
    };
    console.log(fieldForm);
    createSection.addItem(createCard(fieldForm));
    addPlacePopup.close();
};

const editProfile = new PopupWithForm(popupProfile, handleProfileFormSubmit);
const addPlacePopup = new PopupWithForm(popupPlace, handlePlaceFormSubmit);

const editPopupProfile = () => {
    editProfile.open();
    const ProfileData = userInfo.getUserInfo();
    nameInput.value = ProfileData.name;
    jobInput.value = ProfileData.about;
    console.log(ProfileData);
    formValidators['profile__info'].cleanValidation();
};

const handleCardClick = (fieldForm) => {
    openZoom.open(fieldForm);

    const itCard = evt.target.closest('.elements__item');
    popupCaption.textContent = itCard.querySelector('.elements__title').textContent;
    popupImage.src = itCard.querySelector('.elements__image').src;
    popupImage.alt = itCard.querySelector('.elements__title').textContent;
    openPopup(popupZoom);
};

const openZoom = new PopupWithImage(popupZoom);

const createCard = (fieldForm) => {
    const cardElement = new Card(fieldForm, cardTemplate, handleCardClick);
    return cardElement.generateElement(fieldForm);
}

const createSection = new Section({
    renderer: (item) => {
        createSection.addItem(createCard(item));
    }
}, elementsList
);

createSection.renderItem(defoltElements);

/* ---- */

buttonAddCard.addEventListener('click', () => {
    addPlacePopup.open();
    formPlaceElement.reset();
    formValidators['place'].cleanValidation();
});

buttonProfile.addEventListener('click', editPopupProfile);

editProfile.setEventListeners();
addPlacePopup.setEventListeners();
openZoom.setEventListeners();

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
        const formName = formElement.getAttribute('name')

        formValidators[formName] = validator;
        validator.enableValidation();
    });
};

enableValidation(validationOptions);