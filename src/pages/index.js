import './index.css';
import { ValidationOptions } from '../scripts/utils/Constants';
import { Card } from '../scripts/components/Card.js';
import { FormValidator } from '../scripts/components/FormValidator.js';
import { Section } from '../scripts/components/Section.js';
import { UserInfo } from '../scripts/components/UserInfo.js';
import { PopupWithImage } from '../scripts/components/PopupWithImage.js';
import { PopupWithForm } from '../scripts/components/PopupWithForm.js';
import { api } from '../scripts/components/Api.js';
import { PopupWithDelete } from '../scripts/components/PopupWithDelete.js';

const buttonProfile = document.querySelector('.profile__edit-button');
const popupProfile = document.querySelector('.popup_profile');
const nameInput = popupProfile.querySelector('#username-input');
const jobInput = popupProfile.querySelector('#about-input');
const buttonAddCard = document.querySelector('.profile__add-button');
const cardTemplate = document.querySelector('#user-card');
const buttonAvatar = document.querySelector('.profile__avatar');
const formValidators = {};
let userId;
/* -------------------------- */

Promise.all([api.getDefoltElements(), api.getUserInfo()])
    .then(([cardsData, userData]) => {
        userId = userData._id
        userInfo.setUserInfo(userData)
        userInfo.setAvatar(userData)
        createSection.renderItem(cardsData)
    })
    .catch(err => {
        console.log(err);
    })

const userInfo = new UserInfo({
    userNameSelector: '.profile__name',
    userAboutSelector: '.profile__about',
    userAvatarSelector: '.profile__avatar'
})

/* ---- */
const handleProfileFormSubmit = (profileInfo) => {
    const userData = {
        name: profileInfo.profilename,
        about: profileInfo.profileabout
    }
    editProfile.showLoading(true);
    api.patchUserInfo(userData)
        .then(res => {
            userInfo.setUserInfo(res);
            editProfile.close();
        })
        .catch(err => {
            console.log(err);
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
            addPlacePopup.close();
        })
        .catch(err => {
            console.log(err);
        })
        .finally(() => {
            addPlacePopup.showLoading(false);
        })
};

const handleAvatarFormSubmit = (avatarData) => {
    changeAvatar.showLoading(true)
    api.patchAvatar(avatarData)
        .then(res => {
            userInfo.setAvatar(res);
            changeAvatar.close();
        })
        .catch(err => {
            console.log(err);
        })
        .finally(() => {
            changeAvatar.showLoading(false);
        })
};

const handleCardClick = (cardData) => {
    openZoom.open(cardData);
};

const editPopupProfile = () => {
    editProfile.open();
    const profileData = userInfo.getUserInfo();
    nameInput.value = profileData.name;
    jobInput.value = profileData.about;
    formValidators['profile__info'].cleanValidation();
};

const createCard = (cardData) => {
    const cardElement = new Card({
        cardData,
        cardTemplate,
        userId,
        handleCardClick,
        handleDeleteClick: (cardElement, cardData) => {
            deleteCardPopup.open(cardElement, cardData);
        },
        handleLikeClick: (cardData) => {
            console.log(cardData._id)
            api.addlike(cardData._id)
                .then(res => {
                    cardElement.setLikes(res)
                })
                .catch(err => {
                    console.log(err);
                })
        },
        handleRemoveLike: (cardData) => {
            console.log(cardData._id)
            api.removeLike(cardData._id)
                .then(res => {
                    cardElement.setLikes(res)
                })
                .catch(err => {
                    console.log(err);
                })
        }
    });
    return cardElement.generateElement();
};

const editProfile = new PopupWithForm('.popup_profile', handleProfileFormSubmit);
const addPlacePopup = new PopupWithForm('.popup_place', handlePlaceFormSubmit);
const changeAvatar = new PopupWithForm('.popup_avatar', handleAvatarFormSubmit);
const openZoom = new PopupWithImage('.popup_zoom');
const deleteCardPopup = new PopupWithDelete('.popup_delete', {
    handleFormSubmit: (cardElement, cardData) => {
        api.deleteCard(cardData)
            .then(() => {
                cardElement.deleteCard();
                deleteCardPopup.close();
            })
            .catch(err => {
                console.log(err);
            })
    }
});


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
buttonAvatar.addEventListener('click', () => {
    changeAvatar.open();
    formValidators['avatarurl'].cleanValidation();
});

editProfile.setEventListeners();
addPlacePopup.setEventListeners();
openZoom.setEventListeners();
deleteCardPopup.setEventListeners();
changeAvatar.setEventListeners();

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
/* ------------- ------------- */


