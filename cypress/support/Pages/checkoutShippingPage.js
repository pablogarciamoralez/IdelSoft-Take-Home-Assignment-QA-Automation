/// <reference types="cypress"/>

class checkoutShippingPage {
    //--------------------------------------------------Buttons----------------------------------------------
    shippingMethodBtns(position) {
        return `input[type=radio]:eq(${position})`
    }
    netxBtn() {
        return `.button`
    }
    showItemsBtn() {
        return `.block .title`
    }
    //--------------------------------------------------Inputs-----------------------------------------------

    //--------------------------------------------------Asserts----------------------------------------------
    shippingAdressAssert() {
        return `.shipping-address-item`
    }

    productsNameAssert(position) {
        return `.minicart-items-wrapper .product-item-details .product-item-name-block strong:eq(${position})`
    }

    productPriceAssert(position) {
        return `.minicart-items-wrapper .product-item-details .cart-price:eq(${position})`
    }
    //--------------------------------------------------Combos-----------------------------------------------

    //--------------------------------------------------Methods----------------------------------------------
    cleanShippingAddress() {
        cy.get(this.shippingAdressAssert())
            .invoke('text')
            .then((text) => {
                const cleanedText = text.replace(/\s+/g, ' ').trim()
                cy.wrap(cleanedText).as('cleanedShippingAddress')
            })
    }

    validateProductNameAndPrice(position, nameAlias, priceAlias) {
        cy.get(nameAlias).then((names) => {
            const productName = names[position]
            cy.textValidator(this.productsNameAssert(position), productName)
        })
        cy.get(priceAlias).then((prices) => {
            const productPrice = prices[position]
            cy.textValidator(this.productPriceAssert(position), productPrice)
        })
    }

    ensureProductsVisible(position = 0) {
        const productSelector = this.productsNameAssert(position)
        const showItemsButton = this.showItemsBtn()

        cy.get('body').then(($body) => {
            if ($body.find(productSelector).is(':visible')) {
                cy.log('Products are already visible, no action needed')
            } else {
                cy.log('Products not visible, clicking to expand the list')
                cy.get(showItemsButton).click()
            }
        })
    }
}

export default new checkoutShippingPage