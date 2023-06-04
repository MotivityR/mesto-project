import { picNameInput, picLinkInput, cardContainer, popupPicEdit } from './constants';
import { closePopup, openFullscreenPopup } from './modal';
import {  } from './validate';

export function createCard(name, link) {
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

export const addCardElement = (name, link, cardContainer) => {
  cardContainer.prepend(createCard(name, link));
};

export function addNewCard(evt) {
  evt.preventDefault();
  addCardElement(picNameInput.value, picLinkInput.value, cardContainer);
  closePopup(popupPicEdit);
};
