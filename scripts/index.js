/* --Обработка попапа профиля-- */
let popupProfile = document.querySelector('.popup_profile');
let buttonOpen = document.querySelector('.profile__edit-button');

let profileName = document.querySelector('.profile__name');
let profileAbout = document.querySelector('.profile__about');

let nameInput = popupProfile.querySelector('#username-input');
let jobInput = popupProfile.querySelector('#about-input');
let formElement = popupProfile.querySelector('.popup__form_profile');
let buttonClose = popupProfile.querySelector('.popup__close_profile');

function popupProfileClose() {
    popupProfile.classList.remove('popup_opened');
}

buttonClose.addEventListener('click', popupProfileClose);

function popupProfileEdit() {
    popupProfile.classList.add('popup_opened');
    nameInput.value = profileName.textContent;
    jobInput.value = profileAbout.textContent;
}

buttonOpen.addEventListener('click', popupProfileEdit);

function handleFormSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileAbout.textContent = jobInput.value;
    popupProfileClose();
}

formElement.addEventListener('submit', handleFormSubmit);

/* --Обработка попапа места-- */
const popupPlace = document.querySelector('.popup_place');
const buttonAdd = document.querySelector('.profile__add-button');
const buttonPlaceClose = popupPlace.querySelector('.popup__close_place');
const formPlaceElement = popupPlace.querySelector('.popup__form_place');

const placeNameInput = popupPlace.querySelector('#place-name-input');
const placeImageInput = popupPlace.querySelector('#place-image-input');

const newElementTitle = document.querySelector('.elements__title');
const newElementImage = document.querySelector('.elements__image');

const popupPlaceEdit = () => {
    popupPlace.classList.add('popup_opened');
};

buttonAdd.addEventListener('click', popupPlaceEdit);

const popupPlaceClose = () => {
    popupPlace.classList.remove('popup_opened');
};

buttonPlaceClose.addEventListener('click', popupPlaceClose);

const handlePlaceFormSubmit = (evt) => {
    evt.preventDefault();
    let fieldForm = {
        name: placeNameInput.value,
        link: placeImageInput.value
    };
    renderElement(elementsList, fieldForm);
    placeNameInput.value = '';
    placeImageInput.value = '';
    popupPlaceClose();
}

formPlaceElement.addEventListener('submit', handlePlaceFormSubmit);

/* --Рендеринг карточек-- */
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

const elementsList = document.querySelector('.elements__list');
const cardForm = document.querySelector('.popup__form_place');
const cardTemplate = document.getElementById('user-card');
const popupZoom = document.querySelector('.popup-zoom');

const getElement = (fieldForm) => {
    const newElement = cardTemplate.content.cloneNode(true);

    const newElementTitle = newElement.querySelector('.elements__title');
    const newElementImage = newElement.querySelector('.elements__image');
    newElementTitle.textContent = fieldForm.name;
    newElementImage.src = fieldForm.link;

    const buttonLike = newElement.querySelector('.elements__like-button');
    const buttonDelete = newElement.querySelector('.elements__trash-button');
    const buttonZoom = newElement.querySelector('.elements__image');

    buttonDelete.addEventListener('click', cardDelete);
    buttonLike.addEventListener('click', likeToggle);
    buttonZoom.addEventListener('click', imageZoom);

    return newElement;
};

const popupZoomClose = () => {
    popupZoom.classList.remove('popup-zoom_active');
}

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
    popupZoom.querySelector('.popup-zoom__caption').textContent = itCard.querySelector('.elements__title').textContent;
    popupZoom.querySelector('.popup-zoom__image').src = itCard.querySelector('.elements__image').src;

    popupZoom.querySelector('.popup__close').addEventListener('click', popupZoomClose);

    popupZoom.classList.toggle('popup-zoom_active');
};

defoltElements.forEach((element) => {
    renderElement(elementsList, element);
});




