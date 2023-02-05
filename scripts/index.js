/* --- */
let popup = document.querySelector('.popup');
let openButton = document.querySelector('.profile__edit-button');

let profileName = document.querySelector('.profile__name');
let profileAbout = document.querySelector('.profile__about');

let nameInput = popup.querySelector('.popup__form-name');
let jobInput = popup.querySelector('.popup__form-about');
let formElement = popup.querySelector('.popup__form');
let closeButton = document.querySelector('.popup__close');


openButton.addEventListener('click', function () {
    popup.classList.add('popup_opened');
    nameInput.value = profileName.textContent;
    jobInput.value = profileAbout.textContent;

    closeButton.addEventListener('click', function () {
        popup.classList.remove('popup_opened');
    })
})

function handleFormSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileAbout.textContent = jobInput.value;
    popup.classList.remove('popup_opened');
}

formElement.addEventListener('submit', handleFormSubmit);

