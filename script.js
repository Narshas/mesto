let element = document.querySelector('profile__edit-button');
let element_b = document.querySelector('popup');
element.addEventListener('click', function () {
    element_b.classList.add('popup_opened');

})

let element_a = document.querySelector('popup__close');
element_a.addEventListener('click', function () {
    element_b.classList.remove('popup_opened');

})

// Находим форму в DOM
let formElement = document.querySelector('.popup__form');// Воспользуйтесь методом querySelector()
// Находим поля формы в DOM
let nameInput = formElement.querySelector('#username-input');
// Воспользуйтесь инструментом .querySelector()
let jobInput = formElement.querySelector('#about-input');// Воспользуйтесь инструментом .querySelector()

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleFormSubmit(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    // Так мы можем определить свою логику отправки.
    // О том, как это делать, расскажем позже.

    // Получите значение полей jobInput и nameInput из свойства value
    let newWho = nameInput.value;
    let newWhat = jobInput.value;
    // Выберите элементы, куда должны быть вставлены значения полей
    let who = document.querySelector('.profile__name');
    let what = document.querySelector('.profile__about');
    // Вставьте новые значения с помощью textContent
    who.textContent = newWho;
    what.textContent = newWhat;
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', handleFormSubmit); 