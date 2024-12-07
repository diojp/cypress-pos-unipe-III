/// <reference types="cypress"/>

describe("Testes de Back", () => {

    it("TC01 - Requisição GET", () => {
      cy.request("https://httpbin.org/get")
        .should(function(response){
            const { status, statusText } = response;
            expect(status).to.be.equal(200);
            expect(statusText).to.be.equal('OK');
        })
    })

    it("TC02 - Requisição POST", () => {
        cy.request({
            method: 'POST',
            url: 'https://httpbin.org/post',
            body: {
                name: 'Rafael',
                age: '30'
            }
        }).should(function(response){
            const { status, statusText } = response;
            expect(status).to.be.equal(200);
            expect(statusText).to.be.equal('OK');
        })
    })

    it("TC03 - Requisição POST", () => {
        cy.request({
            method: 'POST',
            url: 'https://httpbin.org/post',
            body: {
                name: 'Rafael',
                age: '30'
            }
        }).its('body').should('not.be.empty')
    })
})