let data
let asserts
import homePage from "../support/Pages/homePage"
import searchResultsPage from "../support/Pages/searchResultsPage"
import productInformationPage from "../support/Pages/productInformationPage"
import shoppingCartPage from "../support/Pages/shoppingCartPage"
import checkoutShippingPage from "../support/Pages/checkoutShippingPage"
import checkoutPaymentPage from "../support/Pages/checkoutPaymentPage"

describe('Shopping process @shopping', () => {
  beforeEach(() => {
    cy.fixture("data.json").then((pageData) => {
      data = pageData;
    })
    cy.fixture("asserts.json").then((pageAsserts) => {
      asserts = pageAsserts;
    })
    cy.wrap([]).as('savedProductNames')
    cy.wrap([]).as('savedProductPrices')
    cy.wrap([]).as('productSlugs')
  })

  it.only('Full Shopping Flow', () => {
    cy.intercept('POST', asserts.urls.payment_info_request).as('paymentInfoRequest')
    cy.login(data.credentials.email, data.credentials.password)

    // Save and validate the first product
    cy.doType(homePage.searcherInput(), `${data.articles.article_1}{enter}`)
    cy.urlValidator(asserts.urls.catalogsearch, `?q=${data.articles.article_1}`)
    searchResultsPage.saveProductName(0)
    searchResultsPage.saveProductPrice(0)
    cy.doClick(searchResultsPage.productLinkBtn(0))

    searchResultsPage.transformProductNameToSlug(0)
    cy.get('@productSlugs').then((slugs) => {
      cy.urlValidator(`/${slugs[0]}.html`)
    })

    // Validate product name and price
    cy.get('@savedProductNames').then((names) => {
      cy.textValidator(productInformationPage.productNameAssert(), names[0])
    })
    cy.get('@savedProductPrices').then((prices) => {
      cy.textValidator(productInformationPage.productPriceAssert(), prices[0])
    })

    // Add to cart
    cy.doClick(productInformationPage.sizeBtn(data.product_options.size))
    cy.doClick(productInformationPage.colorBtn(data.product_options.color_1))
    cy.doClick(productInformationPage.addToCartBtn())
    productInformationPage.validateCounterNumber(1)

    // Save and validate the second product
    cy.doType(homePage.searcherInput(), `${data.articles.article_1}{enter}`)
    cy.urlValidator(asserts.urls.catalogsearch, `?q=${data.articles.article_1}`)
    searchResultsPage.saveProductName(1)
    searchResultsPage.saveProductPrice(1)
    cy.doClick(searchResultsPage.productLinkBtn(1))

    searchResultsPage.transformProductNameToSlug(1)
    cy.get('@productSlugs').then((slugs) => {
      cy.urlValidator(`/${slugs[1]}.html`)
    })

    // Validate product name and price
    cy.get('@savedProductNames').then((names) => {
      cy.textValidator(productInformationPage.productNameAssert(), names[1])
    })
    cy.get('@savedProductPrices').then((prices) => {
      cy.textValidator(productInformationPage.productPriceAssert(), prices[1])
    })

    // Add to cart
    cy.doClick(productInformationPage.sizeBtn(data.product_options.size))
    cy.doClick(productInformationPage.colorBtn(data.product_options.color_2))
    cy.doClick(productInformationPage.addToCartBtn())
    productInformationPage.validateCounterNumber(2)

    // Validate shopping cart
    cy.doClick(shoppingCartPage.showcartBtn())
    shoppingCartPage.validateProductDetailsInCart(0, 1, '@savedProductNames', '@savedProductPrices') // First product in the array, second in the front
    shoppingCartPage.validateProductDetailsInCart(1, 0, '@savedProductNames', '@savedProductPrices') // Second product in the array, first in the front
    shoppingCartPage.validateCartSubtotal()
    cy.doClick(shoppingCartPage.proceedCheckoutBtn())

    // Validate shipping details
    cy.urlValidator(asserts.urls.checkout_shipping)
    checkoutShippingPage.cleanShippingAddress()
    cy.get('@cleanedShippingAddress').then((cleanedAddress) => {
      expect(cleanedAddress).to.eq(`${data.credentials.firstname} ${data.credentials.lastname} ${data.credentials.street} ${data.credentials.state} ${data.credentials.country} ${data.credentials.phone} Edit`)
    })

    // Validate products in the shipping step
    // cy.doClick(checkoutShippingPage.showItemsBtn())
    checkoutShippingPage.ensureProductsVisible(0)
    checkoutShippingPage.validateProductNameAndPrice(0, '@savedProductNames', '@savedProductPrices')
    checkoutShippingPage.validateProductNameAndPrice(1, '@savedProductNames', '@savedProductPrices')

    // Validate payment
    cy.doClick(checkoutShippingPage.shippingMethodBtns(0))
    cy.doClick(checkoutShippingPage.netxBtn())
    cy.urlValidator(asserts.urls.checkout_payment)
    checkoutPaymentPage.validateTotal()
    cy.doClick(checkoutPaymentPage.placeOrderBtn())

    //Validate successs and back end
    cy.urlValidator(asserts.urls.checkout_success)
    cy.wait('@paymentInfoRequest').then((interception) => {
      expect(interception.response.statusCode).to.eq(200)
  
      const requestBody = interception.request.body
      expect(requestBody.billingAddress.city).to.eq('Cordoba')
      expect(requestBody.billingAddress.countryId).to.eq('US')
      expect(requestBody.billingAddress.customerAddressId).to.eq('10815')
      expect(requestBody.billingAddress.customerId).to.eq('75018')
      expect(requestBody.billingAddress.firstname).to.eq('Canis')
      expect(requestBody.billingAddress.lastname).to.eq('Malbec')
      expect(requestBody.billingAddress.postcode).to.eq('12345')
      expect(requestBody.billingAddress.region).to.eq('Alabama')
      expect(requestBody.billingAddress.telephone).to.eq('123123123')
  })
  })

})