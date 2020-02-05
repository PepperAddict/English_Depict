Cypress.Cookies.defaults({
    whitelist: ["token", "userID"]
})
describe("Teacher Sidebar", function() {

    it("teacher dashboard", () => {
        cy.url().should('include', "/dashboard")
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
