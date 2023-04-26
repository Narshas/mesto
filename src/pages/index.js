import './index.css';
//import { DefoltElements } from '../scripts/utils/Constants.js';
import { ValidationOptions } from '../scripts/utils/Constants';
import { Card } from '../scripts/components/Card.js';
import { FormValidator } from '../scripts/components/FormValidator.js';
import { Section } from '../scripts/components/Section.js';
import { UserInfo } from '../scripts/components/UserInfo.js';
import { PopupWithImage } from '../scripts/components/PopupWithImage.js';
import { PopupWithForm } from '../scripts/components/PopupWithForm.js';
import { Api } from '../scripts/components/Api.js';
import { PopupWithDelete } from '../scripts/components/PopupWithDelete.js';

/* -- DOM -- */
const buttonProfile = document.querySelector('.profile__edit-button');
const popupProfile = document.querySelector('.popup_profile');
const nameInput = popupProfile.querySelector('#username-input');
const jobInput = popupProfile.querySelector('#about-input');

const buttonAddCard = document.querySelector('.profile__add-button');
const popupPlace = document.querySelector('.popup_place');
const placeImageInput = popupPlace.querySelector('#place-image-input');

const popupZoom = document.querySelector('.popup_zoom');
const popupImage = popupZoom.querySelector('.popup__image');
const popupCaption = popupZoom.querySelector('.popup__caption');

const popupDelete = document.querySelector('.popup_delete');
const formPlaceElement = document.forms['place'];

const elementsList = document.querySelector('.elements__list');
const cardTemplate = document.querySelector('#user-card');

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

/* ---- */

const userInfo = new UserInfo({
    userNameSelector: '.profile__name',
    userAboutSelector: '.profile__about',
    userAvatarSelector: '.profile__avatar'
})

const handleProfileFormSubmit = (profileInfo) => {
    userData = {
        name: profileInfo.profilename,
        about: profileInfo.profileabout
    }
    editProfile.showLoading(true);
    api.patchUserInfo(userData)
        .then(res => {
            userInfo.setUserInfo(res);
        })
        .finally(() => {
            editProfile.showLoading(true);
        })
};

const handlePlaceFormSubmit = (placeInfo) => {
    const fieldForm = {
        name: placeInfo.placetext,
        link: placeInfo.placeurl
    }
    addPlacePopup.showLoading(true)
    api.postNewCard(fieldForm)
        .then(res => {
            createSection.addItem(createCard(res));
        })
        .finally(() => {
            addPlacePopup.showLoading(false);
        })
};

const editProfile = new PopupWithForm('.popup_profile', handleProfileFormSubmit);
const addPlacePopup = new PopupWithForm('.popup_place', handlePlaceFormSubmit);
const deleteCardPopup = new PopupWithDelete('.popup_delete');
const changeAvatar = new PopupWithForm('.popup_avatar', {
    handleFormSubmit: (avatarData) => {
        changeAvatar.showLoading(true)
        api.patchAvatar(avatarData)
            .then(res => {
                UserInfo.setAvatar(res);
                changeAvatar.close();
            })
            .finally(() => {
                changeAvatar.showLoading(false);
            })
    }
})

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

const openZoom = new PopupWithImage('.popup_zoom');

const createCard = (cardData) => {
    const cardElement = new Card({
        cardData,
        cardTemplate,
        userId,
        handleCardClick,
        handleDeleteClick: (cardData) => {
            deleteCardPopup.open(cardData);
            deleteCardPopup.handleDelete(() => {
                api.deleteCard(cardData._id)
                    .then(res => {
                        deleteCardPopup.close();
                        createCard.deleteCard();
                    })
                    .catch(err => {
                        console.log(err);
                    })
            })
        },
        handleLikeClick: (cardData) => {
            api.addlike(cardData._id)
                .then(res => {
                    createCard.setLikes(res.likes)
                })
                .catch(err => {
                    console.log(err);
                })
        },
        handleRemoveLike: (cardData) => {
            api.removeLike(cardData._id)
                .then(res => {
                    createCard.setLikes(res.likes)
                })
                .catch(err => {
                    console.log(err);
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

Promise.all([api.getDefoltElements(), api.getUserInfo()])
    .then(([cardsData, userData]) => {
        userId = userData._id
        userInfo.setUserInfo(userData)
        userInfo.setAvatar(userData)
        createSection.renderItem(cardsData)
    })
