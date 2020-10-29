let editButton = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let closeButton = document.querySelector('.popup__close');
let saveButton = document.querySelector('.popup__button');

function showClick() {
    popup.classList.add('popup__open');
}

function closeClick() {
    popup.classList.remove('popup__open');
}

function saveClick() {
    let titleInput = document.querySelector('.popup__title');
    let subtitleInput = document.querySelector('.popup__subtitle');
    let profileTitle = document.querySelector('.profile__title');
    let profileSubtitle = document.querySelector('.profile__subtitle');
    let titleValue = titleInput.value;
    let subtitleValue = subtitleInput.value;
    profileTitle.innerHTML = titleValue;
    profileSubtitle.innerHTML = subtitleValue;
    titleInput.setAttribute('value', titleValue);
    subtitleInput.setAttribute('value', subtitleValue);
    closeClick();
}

editButton.addEventListener('click', showClick);
closeButton.addEventListener('click', closeClick);
saveButton.addEventListener('click', saveClick);