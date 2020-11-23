export class FormValidator {
    constructor(object, formElement) {
        this._inputSelector = object.inputSelector
        this._submitButtonSelector = object.submitButtonSelector
        this._inactiveButtonClass = object.inactiveButtonClass
        this._inputErrorClass = object.inputErrorClass
        this._errorClass = object.errorClass
        this._formElement = formElement
        this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector))
        this._buttonElement = this._formElement.querySelector(this._submitButtonSelector)
    }

    _showError(inputElement, errorMessage) {
        const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`)
        inputElement.classList.add(this._inputErrorClass)
        errorElement.textContent = errorMessage
        errorElement.classList.add(this._errorClass)
    }

    _hideError(inputElement) {
        const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`)
        inputElement.classList.remove(this._inputErrorClass)
        errorElement.classList.remove(this._errorClass)
        errorElement.textContent = ""
    }

    _checkValidity(inputElement) {
        if (!inputElement.validity.valid) {
            this._showError(inputElement, inputElement.validationMessage)
        } else {
            this._hideError(inputElement)
        }
    }

    _hasInvalidInput(inputList) {
        return inputList.some((inputElement) => {
            return !inputElement.validity.valid
        })
    }

    _toggleButtonState(inputList, buttonElement) {
        if (this._hasInvalidInput(inputList)) {
            buttonElement.classList.add(this._inactiveButtonClass)
            buttonElement.disabled = true
        } else {
            buttonElement.classList.remove(this._inactiveButtonClass)
            buttonElement.disabled = false
        }
    }
    
    _setEventListeners() {
         this._inputList.forEach((inputElement) => {
            inputElement.addEventListener("input", () => {
                this._checkValidity(inputElement)
                this._toggleButtonState(this._inputList, this._buttonElement)
            })
        })
    }

    resetState() {
        this._inputList.forEach((inputElement) => {
            this._hideError(inputElement)
            this._toggleButtonState(this._inputList, this._buttonElement)
        })
    }

    enableValidation() {
        this._formElement.addEventListener("submit", (evt) => {
            evt.preventDefault()
        })
        this._setEventListeners()
    }
}