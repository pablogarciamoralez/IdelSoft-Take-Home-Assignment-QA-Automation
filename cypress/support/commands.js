const asserts = require('../fixtures/asserts.json')
const data = require('../fixtures/data.json')
import homePage from './Pages/homePage'
import customerLoginPage from "../support/Pages/customerLoginPage"

Cypress.Commands.add('login', (user, password) => {
    cy.visit(asserts.urls.home)
    cy.doWait(homePage.headerBtns('Sign In'))
    cy.doClick(homePage.headerBtns('Sign In'))
    cy.urlValidator(asserts.urls.sign_in)
    cy.doType(customerLoginPage.emailInput(), user)
    cy.doType(customerLoginPage.passwordInput(), password)
    cy.doClick(customerLoginPage.signInBtn())
    cy.urlValidator(asserts.urls.home)
    cy.textValidator(homePage.userNameAssert(), `Welcome, ${data.credentials.firstname} ${data.credentials.lastname}!`)
})

Cypress.Commands.add('doWait', (locator, timeout = 35000) => {
    cy.get(locator, { timeout }).should('be.visible')
})

Cypress.Commands.add('doClick', (locator) => {
    cy.get(locator).should('be.visible').click()
})

Cypress.Commands.add('doForceClick', (locator) => {
    cy.get(locator).click({ force: true })
})

Cypress.Commands.add('doType', (locator, text) => {
    cy.get(locator).trigger('mouseover').should('be.visible').clear().type(text)
})

Cypress.Commands.add('doForceType', (locator, text) => {
    cy.get(locator).type(text, { force: true })
})

Cypress.Commands.add('doTypeSimple', (locator, text) => {
    cy.get(locator).trigger('mouseover').should('be.visible').type(text)
})

Cypress.Commands.add('textValidator', (locator, text) => {
    cy.get(locator).should('be.visible').invoke('text').then((etiq) => {
        expect(etiq.trim()).to.deep.equal(text.trim())
    })
})

Cypress.Commands.add('urlValidator', (url, query = '') => {
    const fullUrl = `${Cypress.config('baseUrl')}${url}${query}`
    cy.url().should('eq', fullUrl)
});

Cypress.Commands.add('beVisible', (locator) => {
    cy.get(locator).should('be.visible').and('exist')
})

Cypress.Commands.add('notVisible', (locator) => {
    cy.get(locator).should('not.be.visible')
})

Cypress.Commands.add('doSelect', (locator, value) => {
    cy.get(locator).should('be.visible').select(value)
})