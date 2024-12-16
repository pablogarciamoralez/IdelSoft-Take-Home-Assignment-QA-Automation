/// <reference types="cypress"/>

class createAccountPage {
    //--------------------------------------------------Buttons----------------------------------------------
    createAccountBtn() {
        return `#form-validate button`
    }
    //--------------------------------------------------Inputs-----------------------------------------------
    firstNameInput() {
        return `#firstname`
    }

    lastNameInput() {
        return `#lastname`
    }

    emailInput() {
        return `#email_address`
    }

    passwordInput() {
        return `#password`
    }

    passwordConfirmationInput() {
        return `#password-confirmation`
    }
    //--------------------------------------------------Asserts----------------------------------------------

    //--------------------------------------------------Combos-----------------------------------------------

    //--------------------------------------------------Methods----------------------------------------------
    generateRandomEmail() {
        const timestamp = Date.now()
        return `testuser_${timestamp}@automation.com`
    }

    typeEmail() {
        const email = this.generateRandomEmail()
        cy.doType(this.emailInput(), email)
        cy.wrap(email).as('generatedEmail')
    }
}
export default new createAccountPage