/// <reference types="cypress"/>

class customerAccountPage {
    //--------------------------------------------------Buttons----------------------------------------------
    changePasswordBtn() {
        return `.change-password`
    }
    saveBtn() {
        return `.save`
    }
    //--------------------------------------------------Inputs-----------------------------------------------
    currentPasswordInput() {
        return `#current-password`
    }
    newPasswordInput() {
        return `#password`
    }
    passwordConfirmationInput() {
        return `#password-confirmation`
    }
    //--------------------------------------------------Asserts----------------------------------------------
    userInformationAssert() {
        return `.box-content p`
    }

    successMessageAssert() {
        return `.message-success`
    }
    //--------------------------------------------------Combos-----------------------------------------------

    //--------------------------------------------------Methods----------------------------------------------
    validateCustomerInformation() {
        cy.fixture('data.json').then((data) => {
            const expectedName = `${data.credentials.firstname} ${data.credentials.lastname}`

            cy.get('@generatedEmail').then((generatedEmail) => {
                cy.get(this.userInformationAssert()).invoke('text').then((infoText) => {
                    const cleanInfoText = infoText.trim()
                    expect(cleanInfoText).to.include(expectedName)
                    expect(cleanInfoText).to.include(generatedEmail)
                })
            })
        })
    }
}
export default new customerAccountPage