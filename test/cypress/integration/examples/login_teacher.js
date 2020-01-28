Cypress.Cookies.defaults({
    whitelist: ["token", "userID"]
})
describe("Login and Out", function() {

    it("visit it", function() {
        cy.visit("/")
        cy.get(".teacherLogin").click()
    })
    it("login as teacher", () => {
        cy.get('input[name=email]').type(Cypress.env("user"))
        cy.get('input[name=password]').type(`${Cypress.env("pass")}{enter}`)

    })

    it("teacher dashboard", () => {
        cy.url().should('include', "/dashboard")
    })

    it("check for cookies", () => {
        cy.getCookie("token").should("exist")
        cy.getCookie("userID").should("exist")
    })
    it("logout of teacher", () => {
        cy.get("#logout").click()
        cy.url().should("contain", "/")
    })
})
