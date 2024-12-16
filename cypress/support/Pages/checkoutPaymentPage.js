/// <reference types="cypress"/>

class checkoutPaymentPage {
    //--------------------------------------------------Buttons----------------------------------------------
    placeOrderBtn() {
        return `button[class="action primary checkout"]`
    }
    //--------------------------------------------------Inputs-----------------------------------------------

    //--------------------------------------------------Asserts----------------------------------------------
    totalPriceAssert() {
        return `strong .price`
    }
    //--------------------------------------------------Combos-----------------------------------------------

    //--------------------------------------------------Methods----------------------------------------------
    validateTotal() {
        cy.get('@savedProductPrices').then((prices) => {
            const numericPrices = prices.map((price) => parseFloat(price.replace('$', '').trim()))
            const total = numericPrices.reduce((acc, curr) => acc + curr, 0)
            cy.get(this.totalPriceAssert())
                .invoke('text')
                .then((subtotalText) => {
                    const subtotal = parseFloat(subtotalText.replace('$', '').trim())
                    expect(subtotal).to.eq(total)
                })
        })
    }

}

export default new checkoutPaymentPage