export const showInputError = (form, inputSelector, errorMessage, config) => {
  const errorElement = form.querySelector(`#${inputSelector.id}-error`);
  inputSelector.classList.add(config.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(config.errorClass);
};

export const hideInputError = (form, inputSelector, config) => {
  const errorElement = form.querySelector(`#${inputSelector.id}-error`);
  inputSelector.classList.remove(config.inputErrorClass);
  errorElement.classList.remove(config.errorClass);
  errorElement.textContent = "";
};

export const checkInputValidity = (form, inputSelector, config) => {
  if (!inputSelector.validity.valid) {
    showInputError(
      form,
      inputSelector,
      inputSelector.validationMessage,
      config
    );
  } else {
    hideInputError(form, inputSelector, config);
  }
};

export const setEventListeners = (form, config) => {
  const inputList = Array.from(form.querySelectorAll(config.inputSelector));
  const buttonElement = form.querySelector(config.submitButtonSelector);

  toggleButtonState(inputList, buttonElement, config);

  inputList.forEach((inputSelector) => {
    inputSelector.addEventListener("input", function () {
      checkInputValidity(form, inputSelector, config);
      toggleButtonState(inputList, buttonElement, config);
    });
  });
};

export const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.form));
  formList.forEach((form) => {
    //form.addEventListener('submit', function (evt) {
    //evt.preventDefault();
    //});
    setEventListeners(form, config);
  });
};

export const hasInvalidInput = (inputList) => {
  return inputList.some((inputSelector) => {
    return !inputSelector.validity.valid;
  });
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
