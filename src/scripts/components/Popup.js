export class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
    }

    open() {
        this._popup.classList.add('popup_active');
        document.addEventListener('keyup', this._handleEscClose.bind(this));
    }

    close() {
        this._popup.classList.remove('popup_active');
        document.removeEventListener('keyup', this._handleEscClose.bind(this));
    }

    _handleEscClose(evt) {
        if (evt.key === 'Escape') {
            this.close();
        }
    }

    setEventListeners() {
        this._popup.addEventListener('mousedown', (evt) => {
            if (evt.target.classList.contains('popup_active') || evt.target.classList.contains('popup__close')) {
                this.close();
            }
        })
    }
}