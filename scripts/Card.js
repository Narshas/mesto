class Card {
    constructor(fildForm, templateSlector, imageZoom) {
        this._name = fildForm.name;
        this._link = fildForm.link;
        this._templateSlector = templateSlector;
        this._imageZoom = imageZoom;
    }

    _getTemplate() {
        const Element = document
            .querySelector(this._templateSelector)
            .content
            .querySelector('.elements__item')
            .cloneNode(true)

        return Element
    }

    generateElement() {
        this._element = this._getTemplate();

        this._element.querySelector('.elements__title').textContent = this._name;
        this._element.querySelector('.elements__image').src = this._link;
        this._element.querySelector('.elements__image').alt = this._name;

        this._element.querySelector('.elements__like-button').addEventListener('click', this._likeToggle);
        this._element.querySelector('.elements__trash-button').addEventListener('click', this._cardDelete);

        return this._element;
    }

    _likeToggle = (evt) => {
        evt.target.classList.toggle('elements__like-button_active');
    }

    _cardDelete = (evt) => {
        evt.target.closest('.elements__item').remove();
    }
}

export { Card };