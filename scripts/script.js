const profilePopup = document.querySelector(".popup_profile");
const editButton = document.querySelector(".profile__edit-button");
const cardContainer = document.querySelector(".elements");
const formProfile = document.querySelector(".popup__form_profile");
const userNameInput = document.querySelector(".popup__input_userName");
const descriptionInput = document.querySelector(
  ".popup__input_userDescription"
);
const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");
const popupPicEdit = document.querySelector(".popup_pic_edit");
const addButton = document.querySelector(".profile__add-button");
const picNameInput = document.querySelector(".popup__input_picname");
const picLinkInput = document.querySelector(".popup__input_piclink");
const formAddPlace = document.querySelector(".popup__form_add-place");
const closeButton = document.querySelectorAll(".popup__close-button");
const trashButton = document.querySelector(".element__trash-button");
const likeButton = document.querySelector(".element__like-button");
const closeButtonPopupPicEdit = document.querySelector(
  ".popup__close-button_edit"
);

const openPopup = (popup) => {
  popup.classList.add("popup_opened");
};

const openProfilePopup = () => {
  userNameInput.value = profileTitle.textContent;
  descriptionInput.value = profileSubtitle.textContent;
  openPopup(profilePopup);
};

editButton.addEventListener("click", openProfilePopup);

const closePopup = (popup) => {
  popup.classList.remove("popup_opened");
};
//closeButton.addEventListener("click", closePopup);

closeButton.forEach((el) => {
  el.addEventListener("click", closePopup);
});

const openAddPopup = () => {
  openPopup(popupPicEdit);
};
addButton.addEventListener("click", openAddPopup);

const closePopupPicEdit = () => {
  popupPicEdit.classList.remove("popup_opened");
};
closeButtonPopupPicEdit.addEventListener("click", closePopupPicEdit);

function handleFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = userNameInput.value;
  profileSubtitle.textContent = descriptionInput.value;
  closePopup(profilePopup);
}

formProfile.addEventListener("submit", handleFormSubmit);

const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];
function addCard(name, link) {
  const elementTemplate = document.querySelector("#elements-template").content;
  const cardElement = elementTemplate.querySelector(".element").cloneNode(true);
  // наполняем содержимым
  cardElement.querySelector(".element__photo").src = link;
  cardElement.querySelector(".element__title").textContent = name;
  // отображаем на странице
  cardContainer.prepend(cardElement);
}

initialCards.forEach((el) => {
  addCard(el.name, el.link);
});

function addNewCard(evt) {
  evt.preventDefault();
  addCard(picNameInput.value, picLinkInput.value);
  closePopup(popupPicEdit);
}

formAddPlace.addEventListener("submit", addNewCard);


trashButton.addEventListener('click', function () {
  const deleteCard = trashButton.closest('.element');
  deleteCard.remove();
});

//  likeButton.addEventListener('click', function (evt) {
//  evt.target.classList.toggle('element__like-button_active');
// });
