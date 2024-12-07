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
})