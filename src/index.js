import './pages/index.css';
import { openProfilePopup, closePopup, openAddPopup, closePopupPicEdit } from './components/modal.js';
import { profilePopup, editButton, cardContainer, formProfile, userNameInput, descriptionInput, profileTitle, profileSubtitle, addButton, formAddPlace, closeButton, closeButtonPopupPicEdit, initialCards } from './components/constants.js';
import { addCardElement, addNewCard } from './components/card';
import { enableValidation } from './components/validate';


editButton.addEventListener("click", openProfilePopup);

closeButton.forEach((el) => {
  el.addEventListener("click", () => closePopup(el.closest(".popup")));
});

addButton.addEventListener("click", openAddPopup);

closeButtonPopupPicEdit.addEventListener("click", closePopupPicEdit);

function handleFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = userNameInput.value;
  profileSubtitle.textContent = descriptionInput.value;
  closePopup(profilePopup);
}

formProfile.addEventListener("submit", handleFormSubmit);

initialCards.forEach((el) => {
  addCardElement(el.name, el.link, cardContainer);
});


formAddPlace.addEventListener("submit", addNewCard);

enableValidation({
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_error",
  errorClass: "popup__error_visible",
});

