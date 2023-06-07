import "./pages/index.css";
import { closePopup, openPopup, handleOverlayClick } from "./components/modal.js";
import {
  profilePopup,
  editButton,
  cardContainer,
  formProfile,
  userNameInput,
  descriptionInput,
  profileTitle,
  profileSubtitle,
  addButton,
  formAddPlace,
  closeButton,
  closeButtonPopupPicEdit,
  initialCards,
  picNameInput,
  picLinkInput,
  popupPicEdit,
  fullscreenPopup,
  imagePopup,
  captionPopup,
  popupList,
} from "./components/constants.js";
import { addCardElement } from "./components/card";
import { enableValidation } from "./components/validate";
import { disableButton } from "./components/utils";

closeButton.forEach((el) => {
  el.addEventListener("click", () => closePopup(el.closest(".popup")));
});

popupList.forEach((el) => {
  el.addEventListener("click", handleOverlayClick);
});

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
  form: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_error",
  errorClass: "popup__error_visible",
});

export function addNewCard(evt) {
  evt.preventDefault();
  addCardElement(picNameInput.value, picLinkInput.value, cardContainer);
  closePopup(popupPicEdit);
  formAddPlace.reset();
  disableButton(evt.submitter);
}

export const openProfilePopup = () => {
  userNameInput.value = profileTitle.textContent;
  descriptionInput.value = profileSubtitle.textContent;
  openPopup(profilePopup);
};

editButton.addEventListener("click", openProfilePopup);

export const openFullscreenPopup = (name, link, alt) => {
  imagePopup.src = link;
  captionPopup.textContent = name;
  imagePopup.textContent = alt;
  openPopup(fullscreenPopup);
};

export const closePopupPicEdit = () => {
  closePopup(popupPicEdit);
};

closeButtonPopupPicEdit.addEventListener("click", closePopupPicEdit);

export const openAddPopup = () => {
  openPopup(popupPicEdit);
};

addButton.addEventListener("click", openAddPopup);
