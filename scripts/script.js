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
const likeButton = document.querySelectorAll(".element__like-button");
const closeButtonPopupPicEdit = document.querySelector(
  ".popup__close-button_edit"
);
const fullscreenPopup = document.querySelector(".popup_fullscreen");
const imagePopup = document.querySelector(".popup__image");
const captionPopup = document.querySelector(".popup__figcaption");
const photoElement = document.querySelector(".element__photo");

const openPopup = (popup) => {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", handleEscapeKey);
  document.addEventListener("click", handleClick);
};

function handleClick(evt) {
  const activePopup = document.querySelector(".popup_opened");
  if (evt.target.classList.contains("popup_opened")) {
    closePopup(evt.target);
  }
}

function handleEscapeKey(evt) {
  const activePopup = document.querySelector(".popup_opened");
  if (evt.key === "Escape") {
    closePopup(activePopup);
  }
}

const openProfilePopup = () => {
  userNameInput.value = profileTitle.textContent;
  descriptionInput.value = profileSubtitle.textContent;
  openPopup(profilePopup);
};

editButton.addEventListener("click", openProfilePopup);

const closePopup = (popup) => {
  popup.classList.remove("popup_opened");
};

closeButton.forEach((el) => {
  el.addEventListener("click", () => closePopup(el.closest(".popup")));
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

const openFullscreenPopup = (name, link) => {
  imagePopup.src = link;
  captionPopup.textContent = name;
  openPopup(fullscreenPopup);
};

function createCard(name, link) {
  const elementTemplate = document.querySelector("#elements-template").content;
  const cardElement = elementTemplate.querySelector(".element").cloneNode(true);
  cardElement.querySelector(".element__photo").src = link;
  cardElement.querySelector(".element__title").textContent = name;
  cardElement
    .querySelector(".element__trash-button")
    .addEventListener("click", function (evt) {
      const deleteCard = evt.target.closest(".element");
      deleteCard.remove();
    });

  cardElement
    .querySelector(".element__like-button")
    .addEventListener("click", (evt) =>
      evt.target.classList.toggle("element__like-button_active")
    );

  cardElement
    .querySelector(".element__photo")
    .addEventListener("click", () => openFullscreenPopup(name, link));
  return cardElement;
}

const addCardElement = (name, link, cardContainer) => {
  cardContainer.prepend(createCard(name, link));
};

initialCards.forEach((el) => {
  addCardElement(el.name, el.link, cardContainer);
});

function addNewCard(evt) {
  evt.preventDefault();
  addCardElement(picNameInput.value, picLinkInput.value, cardContainer);
  closePopup(popupPicEdit);
}

formAddPlace.addEventListener("submit", addNewCard);

// включение валидации вызовом enableValidation
// все настройки передаются при вызове

enableValidation({
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
});

const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add('form__input_type_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('form__input-error_active');
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove('form__input_type_error');
  errorElement.classList.remove('form__input-error_active');
  errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.form__input'));
  const buttonElement = formElement.querySelector('.form__submit');

  toggleButtonState(inputList, buttonElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};
const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll('.form'));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
const fieldsetList = Array.from(formElement.querySelectorAll('.form__set'));
fieldsetList.forEach((fieldSet) => {
  setEventListeners(fieldSet);
});

  });
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
};

const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
        buttonElement.disabled = true;
    buttonElement.classList.add('button_inactive');
  } else {
        buttonElement.disabled = false;
    buttonElement.classList.remove('button_inactive');
  }
};
enableValidation();
