/* -- DOM для профиля -- */
const popupProfile = document.querySelector('.popup_profile');
const buttonOpen = document.querySelector('.profile__edit-button');

const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');

const nameInput = popupProfile.querySelector('#username-input');
const jobInput = popupProfile.querySelector('#about-input');
const formElement = popupProfile.querySelector('.popup__form_profile');
const buttonClose = popupProfile.querySelector('.popup__close_profile');

/* -- DOM для добавления места -- */

const popupPlace = document.querySelector('.popup_place');
const buttonAdd = document.querySelector('.profile__add-button');
const buttonPlaceClose = popupPlace.querySelector('.popup__close_place');
const formPlaceElement = popupPlace.querySelector('.popup__form_place');

const placeNameInput = popupPlace.querySelector('#place-name-input');
const placeImageInput = popupPlace.querySelector('#place-image-input');

const newElementTitle = document.querySelector('.elements__title');
const newElementImage = document.querySelector('.elements__image');

/* -- Дефолтные карточки для рендеринга -- */

const defoltElements = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

/* -- DOM для рендеринга -- */

const elementsList = document.querySelector('.elements__list');
const cardForm = document.querySelector('.popup__form_place');
const cardTemplate = document.getElementById('user-card');
const popupZoom = document.querySelector('.popup_zoom');
const popupImage = popupZoom.querySelector('.popup__image');
const popupCaption = popupZoom.querySelector('.popup__caption');

/* -- Обработчики профиля -- */

function editPopupProfile() {
    openPopup(popupProfile);
    nameInput.value = profileName.textContent;
    jobInput.value = profileAbout.textContent;
    cleanValidation(formElement, validationOptions);
}

function handleEsc(evt, popup) {
    if (evt.key === 'Escape') {
        closePopup(popup);
    }
};

function openPopup(popup) {
    popup.classList.add('popup_active');
    // function handleEsc(evt) {
    //     if (evt.key === 'Escape') {
    //         closePopup(popup);
    //     }
    // }
    document.addEventListener('keyup', (evt) =>
        handleEsc(evt, popup));
}

function closePopup(popup) {
    popup.classList.remove('popup_active');
    document.removeEventListener('keyup', (evt) =>
        handleEsc(evt, popup));
    // const currentForm = popup.querrySelector('.popup__form');
    // currentForm.reset();
}

const closePopupOverlay = (event) => {
    if (event.target === event.currentTarget) {
        closePopup(event.currentTarget);
    }
};

popupProfile.addEventListener('click', closePopupOverlay);

function handleFormSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileAbout.textContent = jobInput.value;
    closePopup(popupProfile);
}

buttonClose.addEventListener('click', () => {
    closePopup(popupProfile)
});

buttonOpen.addEventListener('click', editPopupProfile);
formElement.addEventListener('submit', handleFormSubmit);

/* --Обработчики места-- */

buttonAdd.addEventListener('click', () => {
    openPopup(popupPlace);
    cleanValidation(formPlaceElement, validationOptions);
    formPlaceElement.reset();
});
buttonPlaceClose.addEventListener('click', () => {
    closePopup(popupPlace)
});

popupPlace.addEventListener('click', closePopupOverlay);

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

formPlaceElement.addEventListener('submit', handlePlaceFormSubmit);

/* --Рендеринг карточек-- */

const getElement = (fieldForm) => {
    const newElement = cardTemplate.content.cloneNode(true);

    const newElementTitle = newElement.querySelector('.elements__title');
    const newElementImage = newElement.querySelector('.elements__image');
    newElementTitle.textContent = fieldForm.name;
    newElementImage.src = fieldForm.link;
    newElementImage.alt = fieldForm.name;

    const buttonLike = newElement.querySelector('.elements__like-button');
    const buttonDelete = newElement.querySelector('.elements__trash-button');
    const buttonZoom = newElement.querySelector('.elements__image');

    buttonDelete.addEventListener('click', cardDelete);
    buttonLike.addEventListener('click', likeToggle);
    buttonZoom.addEventListener('click', imageZoom);

    return newElement;
};

const renderElement = (wrap, fieldForm) => {
    const cardElement = getElement(fieldForm);
    wrap.prepend(cardElement);
};

const likeToggle = (evt) => {
    evt.target.classList.toggle('elements__like-button_active');
};

const cardDelete = (evt) => {
    evt.target.closest('.elements__item').remove();
};

const imageZoom = (evt) => {
    const itCard = evt.target.closest('.elements__item');
    popupCaption.textContent = itCard.querySelector('.elements__title').textContent;
    popupImage.src = itCard.querySelector('.elements__image').src;
    popupImage.alt = itCard.querySelector('.elements__title').textContent;

    openPopup(popupZoom);
};

popupZoom.querySelector('.popup__close_zoom').addEventListener('click', () => {
    closePopup(popupZoom)
});

popupZoom.addEventListener('click', closePopupOverlay);

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

enableValidation(validationOptions);

// const formSignIn = document.forms.signIn;
// const resetButton = formSignIn.querySelector('.form__reset');
// const submitButton = formSignIn.querySelector('.form__submit');

// formSignIn.addEventListener('submit', (e) => {
//   e.preventDefault();
//   console.log(formSignIn);
//   formSignIn.reset();
//   disableButton(submitButton, validationOptions.disabledButtonClass);
// });

// resetButton.addEventListener('click', () => {
//   const inputs = Array.from(formSignIn.querySelectorAll('.form__input'));
//   /**
//    * Комментарий №3 (Последний)
//    * Вместо функции hiddenErrorForInput теперь вызывается setInputState
//    * с нужным состоянием для инпута (валидное или невалидное)
//    */
//   inputs.forEach(input => {
//     setInputState(input, true, validationOptions);
//   });
//   disableButton(submitButton, validationOptions.disabledButtonClass);
// });