let data
let asserts
import homePage from "../support/Pages/homePage"
import createAccountPage from "../support/Pages/createAccountPage"
import customerAccountPage from "../support/Pages/customerAccountPage"
import customerLoginPage from "../support/Pages/customerLoginPage"

describe('User Operations @userOperation', () => {
  beforeEach(() => {
    cy.fixture("data.json").then((pageData) => {
      data = pageData;
    })
    cy.fixture("asserts.json").then((pageAsserts) => {
      asserts = pageAsserts;
    })
  })

  it('User creation', () => {
    cy.visit(asserts.urls.home)
    cy.doWait(homePage.headerBtns('Create an Account'))
    cy.doClick(homePage.headerBtns('Create an Account'))
    cy.urlValidator(asserts.urls.customer_account_creation)
    cy.doType(createAccountPage.firstNameInput(), data.credentials.firstname)
    cy.doType(createAccountPage.lastNameInput(), data.credentials.lastname)
    createAccountPage.typeEmail()
    cy.get('@generatedEmail').then((userEmail) => {
      cy.log(userEmail)
    })
    cy.doType(createAccountPage.passwordInput(), data.credentials.password)
    cy.doType(createAccountPage.passwordConfirmationInput(), data.credentials.password)
    cy.doClick(createAccountPage.createAccountBtn())
    cy.urlValidator(asserts.urls.customer_account)
    cy.textValidator(customerAccountPage.successMessageAssert(), asserts.messages.registration_success)
    customerAccountPage.validateCustomerInformation()
  })

  it('Change password', () => {
    cy.login(data.credentials.email, data.credentials.password)
    cy.doClick(homePage.customerNameOptBtn())
    cy.doClick(homePage.headerBtns('My Account'))
    cy.urlValidator(asserts.urls.customer_account)
    cy.doClick(customerAccountPage.changePasswordBtn())
    cy.urlValidator(asserts.urls.customer_account_changepass)
    cy.doType(customerAccountPage.currentPasswordInput(), data.credentials.password)
    cy.doType(customerAccountPage.newPasswordInput(), data.credentials.new_password)
    cy.doType(customerAccountPage.passwordConfirmationInput(), data.credentials.new_password)
    cy.doClick(customerAccountPage.saveBtn())
    cy.textValidator(customerAccountPage.successMessageAssert(), asserts.messages.password_changed)
    cy.login(data.credentials.email, data.credentials.new_password)
    //Now we reset the password so that the test is reusable
    cy.doClick(homePage.customerNameOptBtn())
    cy.doClick(homePage.headerBtns('My Account'))
    cy.doClick(customerAccountPage.changePasswordBtn())
    cy.doType(customerAccountPage.currentPasswordInput(), data.credentials.new_password)
    cy.doType(customerAccountPage.newPasswordInput(), data.credentials.password)
    cy.doType(customerAccountPage.passwordConfirmationInput(), data.credentials.password)
    cy.doClick(customerAccountPage.saveBtn())
  }),

  it('failed login', () => {
    cy.visit(asserts.urls.home)
    cy.doWait(homePage.headerBtns('Sign In'))
    cy.doClick(homePage.headerBtns('Sign In'))
    cy.urlValidator(asserts.urls.sign_in)
    cy.doType(customerLoginPage.emailInput(), data.credentials.email)
    cy.doType(customerLoginPage.passwordInput(), data.credentials.bad_password)
    cy.doClick(customerLoginPage.signInBtn())
    cy.textValidator(customerLoginPage.messageErrorAssert(), asserts.messages.failed_login)
  }) 
})