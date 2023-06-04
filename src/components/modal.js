import { userNameInput, profileTitle, popupPicEdit, descriptionInput, profileSubtitle, profilePopup, imagePopup, captionPopup, fullscreenPopup } from './constants';

export const openPopup = (popup) => {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", handleEscapeKey);
  document.addEventListener("click", handleClick);
};

export function handleClick(evt) {
  const activePopup = document.querySelector(".popup_opened");
  if (evt.target.classList.contains("popup_opened")) {
    closePopup(evt.target);
  }
}

export function handleEscapeKey(evt) {
  const activePopup = document.querySelector(".popup_opened");
  if (evt.key === "Escape") {
    closePopup(activePopup);
  }
}

export const openProfilePopup = () => {
  userNameInput.value = profileTitle.textContent;
  descriptionInput.value = profileSubtitle.textContent;
  openPopup(profilePopup);
};

export const closePopup = (popup) => {
  popup.classList.remove("popup_opened");
};

export const openFullscreenPopup = (name, link) => {
  imagePopup.src = link;
  captionPopup.textContent = name;
  openPopup(fullscreenPopup);
};

export const openAddPopup = () => {
  openPopup(popupPicEdit);
};

export const closePopupPicEdit = () => {
  popupPicEdit.classList.remove("popup_opened");
};
