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

