/* --- */
let popup = document.querySelector('.popup');
let buttonOpen = document.querySelector('.profile__edit-button');

let profileName = document.querySelector('.profile__name');
let profileAbout = document.querySelector('.profile__about');

let nameInput = popup.querySelector('#username-input');
let jobInput = popup.querySelector('#about-input');
let formElement = popup.querySelector('.popup__form');
let buttonClose = document.querySelector('.popup__close');

function popupClose() {
    popup.classList.remove('popup_opened');
}

buttonClose.addEventListener('click', popupClose);

function popupEdit() {
    popup.classList.add('popup_opened');
    nameInput.value = profileName.textContent;
    jobInput.value = profileAbout.textContent;
}

buttonOpen.addEventListener('click', popupEdit);

function handleFormSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileAbout.textContent = jobInput.value;
    popupClose();
}

formElement.addEventListener('submit', handleFormSubmit);

/* --Обработка попапа места-- */
// let popup = document.querySelector('.popup');
const buttonAdd = document.querySelector('.profile__add-button');

// let profileName = document.querySelector('.profile__name');
// let profileAbout = document.querySelector('.profile__about');

const placeNameInput = document.querySelector('.place-name-input');
const placeImageInput = document.querySelector('.place-image-input');

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
// const form = document.querySelector('.') тут добавляем форму добавления мест
const cardTemplate = document.getElementById('user-card');

const getElement = (element) => {
    const newElement = cardTemplate.content.cloneNode(true);

    const newElementTitle = newElement.querySelector('.elements__title');
    const newElementImage = newElement.querySelector('.elements__image').src;
    newElementTitle.textContent = element.name;
    newElementImage.href = element.link;
    // newElementImage.href = element.link;
    return newElement;
};

const renderElement = (wrap, element) => {
    wrap.prepend(getElement(element));
};

defoltElements.forEach((element) => {
    renderElement(elementsList, element);
});