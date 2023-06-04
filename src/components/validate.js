
export const showInputError = (formSelector, inputSelector, errorMessage, config) => {
  const errorElement = formSelector.querySelector(`#${inputSelector.id}-error`);
  inputSelector.classList.add(config.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(config.errorClass);
};

export const hideInputError = (formSelector, inputSelector, config) => {
  const errorElement = formSelector.querySelector(`#${inputSelector.id}-error`);
  inputSelector.classList.remove(config.inputErrorClass);
  errorElement.classList.remove(config.errorClass);
  errorElement.textContent = '';
};

export const checkInputValidity = (formSelector, inputSelector, config) => {
  if (!inputSelector.validity.valid) {
    showInputError(formSelector, inputSelector, inputSelector.validationMessage, config);
  } else {
    hideInputError(formSelector, inputSelector, config);
  }
};

export const setEventListeners = (formSelector, config) => {
  const inputList = Array.from(formSelector.querySelectorAll(config.inputSelector));
  const buttonElement = formSelector.querySelector(config.submitButtonSelector);

  toggleButtonState(inputList, buttonElement, config);

  inputList.forEach((inputSelector) => {
    inputSelector.addEventListener('input', function () {
      checkInputValidity(formSelector, inputSelector, config);
      toggleButtonState(inputList, buttonElement, config);
    });
  });
};

export const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formSelector) => {
    formSelector.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    setEventListeners(formSelector, config);
});
  };

export const hasInvalidInput = (inputList) => {
  return inputList.some((inputSelector) => {
    return !inputSelector.validity.valid;
  })
};

export const toggleButtonState = (inputList, buttonElement, config) => {
  if (hasInvalidInput(inputList)) {
        buttonElement.disabled = true;
    buttonElement.classList.add(config.inactiveButtonClass);
  } else {
        buttonElement.disabled = false;
    buttonElement.classList.remove(config.inactiveButtonClass);
  }
};

