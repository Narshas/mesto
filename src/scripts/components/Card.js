export class Card {
    constructor({ cardData, cardTemplate, userId, handleCardClick, handleDeleteClick, handleLikeClick, handleRemoveLike }) {
        this._templateSelector = cardTemplate.content;
        this._handleCardClick = handleCardClick;
        this._cardData = cardData;
        this._userId = userId;
        this._handleDeleteClick = handleDeleteClick;
        this._handleLikeClick = handleLikeClick;
        this._handleRemoveLike = handleRemoveLike;
        this._likes = cardData.likes;
    }

    setLikes(cardData) {
        this._likes = cardData.likes;
        this._buttonLike.classList.toggle('elements__like-button_active');
        this._likeCounter.textContent = this._likes.length;
    }

    generateElement() {
        this._element = this._templateSelector.cloneNode(true).children[0];
        this._cardImage = this._element.querySelector('.elements__image');
        this._buttonLike = this._element.querySelector('.elements__like-button');
        this._trashButton = this._element.querySelector('.elements__trash-button');
        this._likeCounter = this._element.querySelector('.elements__like-counter');

        this._element.querySelector('.elements__title').textContent = this._cardData.name;
        this._cardImage.src = this._cardData.link;
        this._cardImage.alt = this._cardData.name;

        if (this._cardData.owner._id !== this._userId) {
            this._trashButton.remove();
        }

        this._likeCounter.textContent = this._likes.length;
        this._setEventListeners();

        return this._element;
    }

    deleteCard = () => {
        this._element.remove();
    }

    _setEventListeners = () => {
        this._buttonLike.addEventListener('click', () => {
            if (this._buttonLike.classList.contains('elements__like-button_active')) {
                this._handleRemoveLike(this._cardData);
            } else {
                this._handleLikeClick(this._cardData);
            }
        });
        this._trashButton.addEventListener('click', () => {
            this._handleDeleteClick(this, this._cardData);
        });
        this._cardImage.addEventListener('click', () => {
            this._handleCardClick(this._cardData);
        });
    }
}