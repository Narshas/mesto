export class Card {
    constructor({ cardData, cardTemplate, userId, handleCardClick, handleDeleteClick, handleLikeClick }) {
        this._templateSelector = cardTemplate.content;
        this._handleCardClick = handleCardClick;
        //мы передали рес целиком, надо тут его очистить?
        this._cardData = cardData;
        this._userId = userId;
        this._handleDeleteClick = handleDeleteClick;
        this._handleLikeClick = handleLikeClick;
        //ownerid = cardData.owner._id
    }

    setLikes(evt, cardLikes) {
        //this._likeCount = this._cardData.likes.length
        //В ещё не свертсанный элемент likeCount мы записываем this._cardData.likes.length
        this._likes = this._cardData.likes //тут надо ещё добавить 
        this._toggleLike(evt)
    }

    _toggleLike = (evt) => {
        if (this._cardData.likes.some(element => element._id === this._userId)) {
            this._cardData
            evt.target.classList.toggle('elements__like-button_active');
            //нужно добавить свой лайк к общему массиву
        }
        //тут тоже нужен обработчик снаружи? Или сделать этот метод публичным
    }

    _deleteCard = (evt) => {

        //evt.target.closest('.elements__item').remove();
        this._handleDeleteClick(this._cardData._id)
        //handleDeleteClick это api.deleteCard
    }

    generateElement() {
        this._element = this._templateSelector.cloneNode(true).children[0];
        this._cardImage = this._element.querySelector('.elements__image');

        this._element.querySelector('.elements__title').textContent = this._cardData.name;
        this._cardImage.src = this._cardData.link;
        this._cardImage.alt = this._cardData.name;

        this._setEventListeners();

        if (this._cardData.owner._id !== this._userId) {
            this._element.querySelector('.elements__trash-button').style.display = 'none'
        }

        // this._likeCounter = this._cardData.likes.length

        return this._element;
    }

    _setEventListeners = () => {
        this._element.querySelector('.elements__like-button').addEventListener('click', () => {
            this._handleLikeClick(this._cardData._id)
        });
        this._element.querySelector('.elements__trash-button').addEventListener('click', () => {
            this._deleteCard
        });
        this._cardImage.addEventListener('click', () => {
            this._handleCardClick(this._cardData);
        });
    }
}