export class Card {
    constructor(fieldForm, cardTemplate, handleCardClick) {
        this._name = fieldForm.name;
        this._link = fieldForm.link;
        this._templateSelector = cardTemplate.content;
        this._handleCardClick = handleCardClick;
        this._fieldForm = fieldFom;

    }
    //вынести хэндлеры в другой класс?
    _toggleLike = (evt) => {
        evt.target.classList.toggle('elements__like-button_active');
    }

    _deleteCard = (evt) => {
        evt.target.closest('.elements__item').remove();
    }

    generateElement() {
        this._element = this._templateSelector.cloneNode(true).children[0];
        this._cardImage = this._element.querySelector('.elements__image');

        this._element.querySelector('.elements__title').textContent = this._name;
        this._cardImage.src = this._link;
        this._cardImage.alt = this._name;

        this._setEventListeners();
        return this._element;
    }

    _setEventListeners = () => {
        this._element.querySelector('.elements__like-button').addEventListener('click', this._toggleLike);
        this._element.querySelector('.elements__trash-button').addEventListener('click', this._deleteCard);
        this._cardImage.addEventListener('click', () => {
            this._handleCardClick(this._fieldForm);
        });
    }
}