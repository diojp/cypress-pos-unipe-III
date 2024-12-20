/// <reference types="cypress"/>

describe("Testes de Back - ProjetoWebCom", () => {

    it("TC01 - Requisição GET - Testar se site está disponível", () => {
        cy.request("https://automationexercise.com")
            .should(function (response) {
                const { status, statusText } = response;
                expect(status).to.be.equal(200);
                expect(statusText).to.be.equal('OK');                
            })
    })

    it("TC02 - Requisição POST - Procurando um Produto", () => {
        cy.request({
            method: 'POST',
            url: 'https://automationexercise.com/api/searchProduct',
            body: {
                search_product: 'Top'
            }
        }).should(function (response) {
            const { status, statusText } = response;
            expect(status).to.be.equal(200);
            expect(statusText).to.be.equal('OK');
        })
    })

    
})