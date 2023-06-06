export const openPopup = (popup) => {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", handleEscapeKey);
  popup.addEventListener("click", handleClick);
};

export function handleClick(evt) {
  if (evt.target.classList.contains("popup_opened")) {
    closePopup(evt.target);
  }
}

export function handleEscapeKey(evt) {
  if (evt.key === "Escape") {
    const activePopup = document.querySelector(".popup_opened");
    closePopup(activePopup);
  }
}

export const closePopup = (popup) => {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", handleEscapeKey);
  document.removeEventListener("click", handleClick);
};
