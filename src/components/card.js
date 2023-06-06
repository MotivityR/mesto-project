import { elementTemplate } from "./constants";
import { openFullscreenPopup } from "../index";

export function createCard(name, link, alt) {
  const cardElement = elementTemplate.querySelector(".element").cloneNode(true);
  cardElement.querySelector(".element__photo").src = link;
  cardElement.querySelector(".element__title").textContent = name;
  cardElement.querySelector(".element__photo").textContent = alt;
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
