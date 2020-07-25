Cypress.Cookies.defaults({
    whitelist: ["token", "userID"]
})
describe("Register, Login and Out, and delete", function() {

    it("visit it", function() {
        cy.visit("/")
        cy.get(".registerAccount").click()
    })
    it("register for an account", function() {
        cy.get('input[name=user]').type("test")
        cy.get('input[name=email]').type(Cypress.env("user"))
        cy.get('input[name=passwordOne]').type(`${Cypress.env("pass")}`)
        cy.get('input[name=passwordTwo]').type(`${Cypress.env("pass")}{enter}`)
    })

    it("login as teacher", () => {
        cy.get('input[name=email]').type(Cypress.env("user"))
        cy.get('input[name=password]').type(`${Cypress.env("pass")}{enter}`)
    })

    it("teacher dashboard", () => {
        cy.url().should('include', "/parent-dashboard")
    })

    it("check for cookies", () => {
        cy.getCookie("token").should("exist")
        cy.getCookie("userID").should("exist")
    })
    // it("logout of teacher", () => {
    //     cy.get("#logout").click()
    //     cy.url().should("contain", "/")
    // })
})
