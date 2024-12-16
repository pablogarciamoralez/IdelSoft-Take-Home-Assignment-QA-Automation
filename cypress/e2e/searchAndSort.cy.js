let data
let asserts
import homePage from "../support/Pages/homePage"
import searchResultsPage from "../support/Pages/searchResultsPage"

describe('search and sort @searchingSorting', () => {
  beforeEach(() => {
    cy.fixture("data.json").then((pageData) => {
      data = pageData;
    })
    cy.fixture("asserts.json").then((pageAsserts) => {
      asserts = pageAsserts;
    })
  })

  it('Search and sort by price asc', () => {
    cy.visit(asserts.urls.home)
    cy.doType(homePage.searcherInput(), `${data.articles.article_1}{enter}`)
    cy.urlValidator(asserts.urls.catalogsearch, `?q=${data.articles.article_1}`)
    cy.doSelect(searchResultsPage.sorterBtn(), "price")
    cy.wait(1500)
    cy.doForceClick(searchResultsPage.sorterOrderBtn())
    cy.wait(1500)
    searchResultsPage.validatePricesOrder('asc')
  })

  it('Search and sort by price desc', () => {
    cy.visit(asserts.urls.home)
    cy.doType(homePage.searcherInput(), `${data.articles.article_1}{enter}`)
    cy.urlValidator(asserts.urls.catalogsearch, `?q=${data.articles.article_1}`)
    cy.doSelect(searchResultsPage.sorterBtn(), "price")
    cy.wait(1000)
    searchResultsPage.validatePricesOrder('desc')
  })

  it('Search and sort by name asc', () => {
    cy.visit(asserts.urls.home)
    cy.doType(homePage.searcherInput(), `${data.articles.article_1}{enter}`)
    cy.urlValidator(asserts.urls.catalogsearch, `?q=${data.articles.article_1}`)
    cy.doSelect(searchResultsPage.sorterBtn(), "name")
    cy.wait(1000)
    cy.doForceClick(searchResultsPage.sorterOrderBtn())
    cy.wait(1000)
    searchResultsPage.validateProductNamesOrder('asc')
})

  it('Search and sort by name desc', () => {
    cy.visit(asserts.urls.home)
    cy.doType(homePage.searcherInput(), `${data.articles.article_1}{enter}`)
    cy.urlValidator(asserts.urls.catalogsearch, `?q=${data.articles.article_1}`)
    cy.doSelect(searchResultsPage.sorterBtn(), "name")
    cy.wait(1000)
    searchResultsPage.validateProductNamesOrder('desc')
  })
})