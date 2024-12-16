/// <reference types="cypress"/>

class homePage {
    //--------------------------------------------------Buttons----------------------------------------------
    headerBtns(text) {
        return `ul.header li a:contains(${text}):first`
    }   // I know it is not a good practice adding ":first", but in this page
    // I could not figure out a better way to make this selector and the next one.
    customerNameOptBtn() {
        return `.customer-name .action:first`
    }
    //--------------------------------------------------Inputs-----------------------------------------------
    searcherInput() {
        return `#search`
    }
    //--------------------------------------------------Asserts----------------------------------------------
    userNameAssert() {
        return `span.logged-in:first`
    }
    //--------------------------------------------------Combos-----------------------------------------------

    //--------------------------------------------------Methods----------------------------------------------

}
export default new homePage