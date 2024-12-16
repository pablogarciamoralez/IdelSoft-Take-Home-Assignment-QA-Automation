/// <reference types="cypress"/>

class searchResultsPage {
    //--------------------------------------------------Buttons----------------------------------------------
    productLinkBtn(position) {
        return `li[class="item product product-item"] a[class="product photo product-item-photo"]:eq(${position})`
    }
    sorterBtn() {
        return `#sorter`
    }
    sorterOptBtn(option) {
        return `#sorter option:contains(${option})`
    }
    sorterOrderBtn() {
        return `.sorter-action:first`
    }
    //--------------------------------------------------Inputs-----------------------------------------------

    //--------------------------------------------------Asserts----------------------------------------------
    productNameAssert(position) {
        return `div .product-item-info div strong a:eq(${position})`
    }

    productPriceAssert(position) {
        return `div.product span.price:eq(${position})`
    }
    //--------------------------------------------------Combos-----------------------------------------------

    //--------------------------------------------------Methods----------------------------------------------
    saveProductName(position) {
        cy.get(this.productNameAssert(position))
            .invoke('text')
            .then((productName) => {
                const cleanName = productName.trim();
                cy.get('@savedProductNames').then((names) => {
                    names.push(cleanName)
                    cy.wrap(names).as('savedProductNames')
                })
            })
    }

    saveProductPrice(position) {
        cy.get(this.productPriceAssert(position))
            .invoke('text')
            .then((productPrice) => {
                const cleanPrice = productPrice.trim()
                cy.get('@savedProductPrices').then((prices) => {
                    prices.push(cleanPrice)
                    cy.wrap(prices).as('savedProductPrices')
                })
            })
    }

    transformProductNameToSlug(position) {
        cy.get('@savedProductNames').then((names) => {
            const productName = names[position]
            const slug = productName
                .toLowerCase()
                .replace(/\s+/g, '-')
                .replace(/[^a-z0-9-]/g, '')

            cy.get('@productSlugs').then((slugs) => {
                slugs.push(slug)
                cy.wrap(slugs).as('productSlugs')
            })
        })
    }

    validatePricesOrder(order = 'asc') {
        cy.get('div.product span.price')
            .then((elements) => {
            
                const prices = [...elements].map((el) =>
                    parseFloat(el.innerText.replace('$', '').trim())
                )
    
                prices.forEach((price, index) => {
                    cy.log(`Price ${index + 1}: ${price}`)
                })
    
                const sortedPrices = [...prices].sort((a, b) =>
                    order === 'asc' ? a - b : b - a
                )
    
                expect(prices).to.deep.eq(sortedPrices)
    
                cy.log(`Prices are correctly sorted in ${order} order`)
            })
    }

    validateProductNamesOrder(order = 'asc') {
        cy.get('div .product-item-info div strong a')
            .should('have.length.gt', 0, 'No product names were found on the page')
            .then((elements) => {
                const names = [...elements].map((el) =>
                    el.innerText.trim()
                )
    
                cy.log('Captured product names:')
                cy.log(JSON.stringify(names, null, 2))
    
                const sortedNames = [...names].sort((a, b) =>
                    order === 'asc' ? a.localeCompare(b) : b.localeCompare(a)
                )
    
                cy.log('Expected sorted order:')
                cy.log(JSON.stringify(sortedNames, null, 2))
    
                let mismatchFound = false
                for (let i = 0; i < names.length; i++) {
                    if (names[i] !== sortedNames[i]) {
                        cy.log(`Mismatch at position ${i + 1}: Original="${names[i]}", Expected="${sortedNames[i]}"`)
                        mismatchFound = true
                    }
                }
    
                if (mismatchFound) {
                    throw new Error(`Product names are NOT sorted in ${order} order. Check logs for details.`)
                } else {
                    cy.log(`✅ Product names are correctly sorted in ${order} order`)
                }
            })
    }
}
export default new searchResultsPage