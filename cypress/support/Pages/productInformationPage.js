/// <reference types="cypress"/>

class productInformationPage {
    //--------------------------------------------------Buttons----------------------------------------------
    sizeBtn(size) {
        return `#option-label-size-143-item-${size}`
    }
    colorBtn(color) {
        return `#option-label-color-93-item-${color}`
    }
    addToCartBtn() {
        return `#product-addtocart-button`
    }
    //--------------------------------------------------Inputs-----------------------------------------------

    //--------------------------------------------------Asserts----------------------------------------------
    productNameAssert() {
        return `.base`
    }
    productPriceAssert() {
        return `span.price:first`
    }
    counterNumberAssert() {
        return `.counter-number`
    }
    //--------------------------------------------------Combos-----------------------------------------------

    //--------------------------------------------------Methods----------------------------------------------
    validateCounterNumber(expectedNumber) {
        cy.get(this.counterNumberAssert(), { timeout: 10000 })
            .should('have.text', expectedNumber.toString())
    }
}
export default new productInformationPage