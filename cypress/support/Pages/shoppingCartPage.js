/// <reference types="cypress"/>

class shoppingCartPage {
    //--------------------------------------------------Buttons----------------------------------------------
    showcartBtn() {
        return `.showcart`
    }

    proceedCheckoutBtn() {
        return `#top-cart-btn-checkout`
    }
    //--------------------------------------------------Inputs-----------------------------------------------

    //--------------------------------------------------Asserts----------------------------------------------
    productItemNameAssert(position) {
        return `#mini-cart .product-item-name:eq(${position})`
    }

    productItemPriceAssert(position) {
        return `#mini-cart .price:eq(${position})`
    }

    subTotalAssert() {
        return `.subtotal .price`
    }
    //--------------------------------------------------Combos-----------------------------------------------

    //--------------------------------------------------Methods----------------------------------------------
    validateProductDetailsInCart(arrayPosition, frontPosition, nameAlias, priceAlias) {
        // Validar nombre del producto
        cy.get(nameAlias).then((names) => {
            const productName = names[arrayPosition]; // Toma el nombre desde el array
            cy.textValidator(this.productItemNameAssert(frontPosition), productName); // Valida en el front
        });
    
        // Validar precio del producto
        cy.get(priceAlias).then((prices) => {
            const productPrice = prices[arrayPosition]; // Toma el precio desde el array
            cy.textValidator(this.productItemPriceAssert(frontPosition), productPrice); // Valida en el front
        });
    }
    
    validateCartSubtotal() {
        cy.get('@savedProductPrices').then((prices) => {
            const numericPrices = prices.map((price) => parseFloat(price.replace('$', '').trim()))
            const total = numericPrices.reduce((acc, curr) => acc + curr, 0)
    
            cy.get(this.subTotalAssert())
                .invoke('text')
                .then((subtotalText) => {
                    const subtotal = parseFloat(subtotalText.replace('$', '').trim())
                    expect(subtotal).to.eq(total)
                })
        })
    }
}
export default new shoppingCartPage