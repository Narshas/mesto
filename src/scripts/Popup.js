export class Popup {
    constructor(popup) {
        this._popup = popup;
        this._closeButton = this._popup.querrySelector('.popup__close');
    }

    open() {
        this._popup.classList.add('popup_active');
        document.addEventListener('keyup', _handleEscClose);
    }

    close() {
        this._popup.classList.remove('popup_active');
        document.removeEventListener('keyup', _handleEscClose);
    }

    _handleEscClose(evt) {
        if (evt.key === 'Escape') {
            this.close();
        }
    }

    setEventListeners() {//объединенный обработчик крестика и оверлэя
        this._popup.addEventListener('mousedown', (evt) => {
            if (evt.target.classList.contains('popup_active')) {
                this.close();
            }
            if (evt.target.classList.contains('popup__close')) {
                this.close();
            }
        })
    }
}