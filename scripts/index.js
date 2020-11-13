const popup = document.querySelector('.popup_edit');

const editButton = document.querySelector('.profile__edit-button');
const closeButton = document.querySelector('.popup__close_edit');

const popupForm = document.querySelector('.popup__content_edit');

const titleInput = document.querySelector('.popup__input_title');
const subtitleInput = document.querySelector('.popup__input_subtitle');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');

const elements = document.querySelector('.elements');

const popupFoto = document.querySelector('.popup_foto');
const closeFotoButton = document.querySelector('.popup__close_foto');

const popupPicture = document.querySelector('.popup_picture');

const addButton = document.querySelector('.profile__add-button');
const closePictureButton = document.querySelector('.popup__close_picture');

const popupPictureForm = document.querySelector('.popup__content_picture');

const placeInput = document.querySelector('.popup__input_place');
const linkInput = document.querySelector('.popup__input_link');


const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

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

function clickLike(event){
    if (event.target.classList.contains('element__heart_black')) {
        event.target.classList.remove('element__heart_black');
    } else {
        event.target.classList.add('element__heart_black');
    }
}

function removeElement(event) {
    elements.removeChild(event.target.parentNode);
}

function showFotoClick(event) {
    popupFoto.classList.add('popup__open');   
    const img = document.querySelector('.popup__foto-full');
    img.src = event.target.src;
    img.alt = event.target.alt;
    const popupFotoTitle = document.querySelector('.popup__foto-title');
    popupFotoTitle.textContent = event.target.alt;
}

function closeFotoClick() {
    popupFoto.classList.remove('popup__open');
}

function createFotoElement(elem) {
    const element = document.createElement('div');
    element.classList.add('element');
    
    const elementFotoButton = document.createElement('button');
    elementFotoButton.classList.add('button');
    elementFotoButton.classList.add('element__foto-button');
    elementFotoButton.type = 'button';
    elementFotoButton.addEventListener('click', showFotoClick);
    element.append(elementFotoButton);

    const elementFoto = document.createElement('img');
    elementFoto.classList.add('element__foto');
    elementFoto.src = elem.link;
    elementFoto.alt = elem.name;
    elementFotoButton.append(elementFoto);

    const elementBin = document.createElement('button');
    elementBin.classList.add('button');
    elementBin.classList.add('element__bin');
    elementBin.type = 'button';
    elementBin.addEventListener('click', removeElement);
    element.append(elementBin);
    
    const elementLike = document.createElement('div');
    elementLike.classList.add('element__like');
    element.append(elementLike);
    
    const elementTitle = document.createElement('h2');
    elementTitle.classList.add('element__title');
    elementTitle.textContent = elem.name;
    elementLike.append(elementTitle);
    
    const buttonElementHeart = document.createElement('button');
    buttonElementHeart.classList.add('button');
    buttonElementHeart.classList.add('element__heart');
    buttonElementHeart.type = 'button';
    buttonElementHeart.addEventListener('click', clickLike)
    elementLike.append(buttonElementHeart);
    
    elements.prepend(element);
}

function showPictureClick() {
    popupPicture.classList.add('popup__open');
}

function closePictureClick() {
    popupPicture.classList.remove('popup__open');
}

function savePictureClick(event) {
    event.preventDefault();
    createFotoElement({name: placeInput.value, link: linkInput.value });
    closePictureClick();
}

initialCards.forEach(createFotoElement);

editButton.addEventListener('click', showClick);
closeButton.addEventListener('click', closeClick);
popupForm.addEventListener('submit', saveClick);

addButton.addEventListener('click', showPictureClick);
closePictureButton.addEventListener('click', closePictureClick);
popupPictureForm.addEventListener('submit', savePictureClick);

closeFotoButton.addEventListener('click', closeFotoClick);