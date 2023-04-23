import './index.css';
//import { DefoltElements } from '../scripts/utils/Constants.js';
import { ValidationOptions } from '../scripts/utils/Constants';
import { Card } from '../scripts/components/Card.js';
import { FormValidator } from '../scripts/components/FormValidator.js';
import { Section } from '../scripts/components/Section.js';
import { UserInfo } from '../scripts/components/UserInfo.js';
import { PopupWithImage } from '../scripts/components/PopupWithImage.js';
import { PopupWithForm } from '../scripts/components/PopupWithForm.js';
import { Api } from '../scripts/components/Api.js'

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

let userId;
/* ------------- api ------------- */
const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-64',
    headers: {
        authorization: '6891c063-8435-431b-87d5-a0d9903b0e56',
        'Content-Type': 'application/json'
    }
})

Promise.all([api.getDefoltElements(), api.getUserInfo()])
    .then(([cardsData, userData]) => {
        userId = userData._id
        userInfo.setUserInfo({ name: res.name, about: res.about, avatar: res.avatar })
        //наверное лучше тоже весь рес передать тут

        createSection.renderItem(cardsData)


    })

/* ---- */

const userInfo = new UserInfo({
    userNameSelector: '.profile__name',
    userAboutSelector: '.profile__about'
})

const handleProfileFormSubmit = (profileInfo) => {
    userInfo.setUserInfo(profileInfo);
};

const handlePlaceFormSubmit = (placeInfo) => {
    const fieldForm = {
        name: placeInfo.placetext,
        link: placeInfo.placeurl
    }
    api.postNewCard(fieldForm)
        .then(res => {
            createSection.addItem(createCard(res));
        })
    //createSection.addItem(createCard(fieldForm))
};

const editProfile = new PopupWithForm('.popup_profile', handleProfileFormSubmit);
const addPlacePopup = new PopupWithForm('.popup_place', handlePlaceFormSubmit);

const editPopupProfile = () => {
    editProfile.open();
    const profileData = userInfo.getUserInfo();
    nameInput.value = profileData.name;
    jobInput.value = profileData.about;
    console.log(profileData);
    formValidators['profile__info'].cleanValidation();
};

const handleCardClick = (cardData) => {
    openZoom.open(cardData);
};

// const handleDeleteClick = (cardId) => {
//     api.deleteCard(cardId)
//         .then(res => {
//             console.log('delete')
//         })
// .then(res => {
//     const DefoltElements = res.map(item => {
//         const container = {};
//         container.name = item.name
//         container.link = item.link
//     })
// }


const openZoom = new PopupWithImage('.popup_zoom');

const createCard = (cardData) => {
    const cardElement = new Card({
        cardData,
        cardTemplate,
        userId,
        handleCardClick,
        handleDeleteClick: (cardData) => {
            //тут должен вызываться попап удаления
            api.deleteCard(cardData._id)
                .then(res => {
                    console.log('delete')
                })
        },
        handleLikeClick: (evt, cardData) => {
            api.addlikeCard(cardData.likes)
                .then(res => {
                    //массив объектов кажды из которых объект с данными юхера который лайкнул эту картчоку
                    //тут должен быть if лайкнуто или нет
                    createCard.setLikes(evt, cardData.likes)
                })
        }

    });
    return cardElement.generateElement();
};

const createSection = new Section({
    renderer: (item) => {
        createSection.addItem(createCard(item));
    }
}, '.elements__list'
);

//createSection.renderItem(DefoltElements);

/* ---- */

buttonAddCard.addEventListener('click', () => {
    addPlacePopup.open();
    formValidators['place'].cleanValidation();
});

buttonProfile.addEventListener('click', editPopupProfile);

editProfile.setEventListeners();
addPlacePopup.setEventListeners();
openZoom.setEventListeners();



/* ------------- Валидация ------------- */

const enableValidation = (ValidationOptions) => {
    const formList = Array.from(document.querySelectorAll(ValidationOptions.formSelector))
    formList.forEach((formElement) => {
        const validator = new FormValidator(ValidationOptions, formElement)
        const formName = formElement.getAttribute('name')

        formValidators[formName] = validator;
        validator.enableValidation();
    });
};

enableValidation(ValidationOptions);
