export class Card {
    constructor(fildForm, cardTemplate, imageZoom) {
        this._name = fildForm.name;
        this._link = fildForm.link;
        this._templateSelector = cardTemplate;
        this._imageZoom = imageZoom;
    }

    _getTemplate() {
        const element = document
            .querySelector(cardTemplate)
            .content
            .querySelector('.elements__item')
            .cloneNode(true);

        return element
    }

    _likeToggle = (evt) => {
        evt.target.classList.toggle('elements__like-button_active');
    }

    _cardDelete = (evt) => {
        evt.target.closest('.elements__item').remove();
    }

    generateElement() {
        this._element = this._getTemplate();

        this._element.querySelector('.elements__title').textContent = this._name;
        this._element.querySelector('.elements__image').src = this._link;
        this._element.querySelector('.elements__image').alt = this._name;

        this._element.querySelector('.elements__like-button').addEventListener('click', this._likeToggle);
        this._element.querySelector('.elements__trash-button').addEventListener('click', this._cardDelete);
        this._element.querySelector('.elements__image').addEventListener('click', this._imageZoom);

        return this._element;
    }

}