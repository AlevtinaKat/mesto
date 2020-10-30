let popup = document.querySelector('.popup');

let editButton = document.querySelector('.profile__edit-button');
let closeButton = document.querySelector('.popup__close');

let popupForm = document.querySelector('.popup__content');

let titleInput = document.querySelector('.popup__input_title');
let subtitleInput = document.querySelector('.popup__input_subtitle');
let profileTitle = document.querySelector('.profile__title');
let profileSubtitle = document.querySelector('.profile__subtitle');

function showClick() {
    popup.classList.add('popup__open');
    titleInput.value = profileTitle.textContent;
    subtitleInput.value = profileSubtitle.textContent;
}

function closeClick() {
    popup.classList.remove('popup__open');
}

function saveClick(event) {
    event.preventDefault();
    profileTitle.textContent = titleInput.value;
    profileSubtitle.textContent = subtitleInput.value;
    closeClick();
}

editButton.addEventListener('click', showClick);
closeButton.addEventListener('click', closeClick);
popupForm.addEventListener('submit', saveClick);