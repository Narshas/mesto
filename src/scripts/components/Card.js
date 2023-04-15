export class Card {
    constructor(cardData, cardTemplate, handleCardClick) {
        this._templateSelector = cardTemplate.content;
        this._handleCardClick = handleCardClick;
        this._cardData = cardData;

    }

    _toggleLike = (evt) => {
        evt.target.classList.toggle('elements__like-button_active');
    }

    _deleteCard = (evt) => {
        evt.target.closest('.elements__item').remove();
    }

    generateElement() {
        this._element = this._templateSelector.cloneNode(true).children[0];
        this._cardImage = this._element.querySelector('.elements__image');

        this._element.querySelector('.elements__title').textContent = this._cardData.name;
        this._cardImage.src = this._cardData.link;
        this._cardImage.alt = this._cardData.name;

        this._setEventListeners();
        return this._element;
    }

    _setEventListeners = () => {
        this._element.querySelector('.elements__like-button').addEventListener('click', this._toggleLike);
        this._element.querySelector('.elements__trash-button').addEventListener('click', this._deleteCard);
        this._cardImage.addEventListener('click', () => {
            this._handleCardClick(this._cardData);
        });
    }
}