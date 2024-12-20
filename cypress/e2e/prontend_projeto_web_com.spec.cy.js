/// <reference types="cypress"/>

describe("Registro de Usuário", () => {
    beforeEach (() => cy.visit("https://automationexercise.com"))

    it("pwc-2: Login de Usuário", () => {
        const email = "dio_jp@hotmail.com";
        const password = "123456";

        //Clica no Menu para realizar o Login
        cy.contains('a', 'Signup / Login').click();

        //Insere os dados de email e senha
        cy.get('input[data-qa="login-email"]').type(email);
        cy.get('input[data-qa="login-password"]').type(password);

        //Clica no botão de login
        cy.get('button[data-qa="login-button"]').click();

        //verifica se o botão de Logout existe no menu
        cy.get('a[href="/logout"]').should('exist').should('be.visible');

        //verifica se o botão de deletar a conta existe no menu
        cy.get('a[href="/delete_account"]').should('exist').should('be.visible');

        //verificar se a frase "Logged in" as aparece no menu
        cy.contains('a', 'Logged in as').should('be.visible').should('contain.text', 'Logged in as');
    })

    it("pwc-3: Login de Usuário com senha incorreta", () => {
        const email = "dio_jp@hotmail.com";
        const password = "12356";
        //Clica no Menu para realizar o Login
        cy.contains('a', 'Signup / Login').click();

        //Insere os dados de email e senha errado e confirma no botão
        cy.get('input[data-qa="login-email"]').type(email);
        cy.get('input[data-qa="login-password"]').type(password);
        cy.get('button[data-qa="login-button"]').click();

        //verifica se mostra a frase de "Your email or password is incorrect!"
        cy.contains('p', 'Your email or password is incorrect!').should('be.visible');
    })


})

describe("Pesquisar e Visualização de Produtos", () => {
    beforeEach(() => cy.visit("https://automationexercise.com"))
    it("pwc-5: Pesquisa por Produtos Existentes", () => {
        const pesquisa = "Top";
        //Clica no Menu em Produtos 
        cy.contains('a', 'Products').click();
        //Insere na barra de pesquisa o valor Top definido na constante 
        cy.get("#search_product").type(pesquisa);
        //clica no botão para efetuar a pesquisa
        cy.get("#submit_search").click();
        //verifica se os itens apresentado possue como parte do seu no o valor definido na constante
        cy.get('.features_items .productinfo').each(($product) => {
            cy.wrap($product).find('p').should('contain.text', `${pesquisa}`);
        });
    })


    it("pwc-6: Filtrar Produtos por Categoria", () => { 
        //Clica no Menu em Produtos 
        cy.contains('a', 'Products').click();

        //Clica na Categoria Women e em seguida na Subcategoria Tops
        cy.get('a[data-parent="#accordian"][href="#Women"]').click();
        cy.get('#Women').find('a').contains('Tops').click();

        //Verifica se aparere o título com a frase "Women - Tops Products"
        cy.get('h2.title.text-center').should('contain.text', 'Women - Tops Products');
        //Verifica se todos os produtos filtrados possuem o nome Top
        cy.get('.features_items .productinfo').each(($product) => {
            cy.wrap($product).find('p').should('contain.text', 'Top');
        });
    })
})



describe("Carrinho de Compras", () => {
    beforeEach(() => cy.visit("https://automationexercise.com"))
    it("pwc-9: Adição de Produtos no carrinho", () => {
        //Clica no Menu em Produtos 
        cy.contains('a', 'Products').click();

        //seleciona o produto 1 e adiciona no carrinho e vai pra tela de carrinho de compras
        cy.get('.product-image-wrapper').contains('a', 'View Product').should('have.attr', 'href', '/product_details/1').click(); // Clica no botão
        cy.contains('button', 'Add to cart').click();        
        cy.contains('a', 'View Cart').click();

        //Verifica se o primeiro Item consta no carrinho de compras (Item Top)
        cy.contains('p', 'Top', { matchCase: false }).should('be.visible');

    })

    it("pwc-10: Remoção de item do carrinho", () => {
        //Clica no Menu em Produtos 
        cy.contains('a', 'Products').click();

        //seleciona o produto 1 e adiciona no carrinho e vai pra tela de carrinho de compras
        cy.get('.product-image-wrapper').contains('a', 'View Product').should('have.attr', 'href', '/product_details/1').click(); // Clica no botão
        cy.contains('button', 'Add to cart').click();        
        cy.contains('a', 'View Cart').click();

        //clica no seta do item para efetuar a remoção
        cy.get('a[data-product-id="1"]').click();
        //Verifica se o item realmente foi excluído
        cy.contains('p', 'shirt', { matchCase: false }).should('not.exist');

    })
})

describe("Carrinho de Compras", () => {
    beforeEach(() => cy.visit("https://automationexercise.com"))
    it("pwc-13: Pagamento sem estar logado", () => {
        //Clica no Menu em Produtos 
        cy.contains('a', 'Products').click();

        //seleciona o produto 1 e adiciona no carrinho e vai pra tela de carrinho de compras
        cy.get('.product-image-wrapper').contains('a', 'View Product').should('have.attr', 'href', '/product_details/1').click(); // Clica no botão
        cy.contains('button', 'Add to cart').click();        
        cy.contains('a', 'View Cart').click();        
        //clica no botão para efetuar a compra
        cy.get('a.btn.btn-default.check_out').click();
        //Verifica se aparece a mensagem solicitando para proceder com o Login
        cy.contains('p.text-center', 'Register / Login account to proceed on checkout.').should('be.visible');

    })   

    it("pwc-15: Pagamento", () => {
        const email = "dio_jp@hotmail.com";
        const password = "123456";
        //Clica no Menu para realizar o Login
        cy.contains('a', 'Signup / Login').click();

        //Insere os dados de email e senha
        cy.get('input[data-qa="login-email"]').type(email);
        cy.get('input[data-qa="login-password"]').type(password);
        cy.get('button[data-qa="login-button"]').click();

        //Clica no Menu em Produtos 
        cy.contains('a', 'Products').click();

        //seleciona o produto 1 e adiciona no carrinho e vai pra tela de carrinho de compras
        cy.get('.product-image-wrapper').contains('a', 'View Product').should('have.attr', 'href', '/product_details/1').click(); // Clica no botão
        cy.contains('button', 'Add to cart').click();
        cy.contains('a', 'View Cart').click();

        //clica no botão para efetuar a compra
        cy.get('a.btn.btn-default.check_out').click();

        //clica no botão para efetuar o pagamento
        cy.get('a[href="/payment"]').click()

        // Preencher as informações de pagamento
        cy.get('input[name="name_on_card"]').type('Teste')
        cy.get('input[name="card_number"]').type('1234 5678 9987 6543')
        cy.get('input[name="cvc"]').type('111')
        cy.get('input[name="expiry_month"]').type('10')
        cy.get('input[name="expiry_year"]').type('2028')

        // Confirmar a finalização da compra
        cy.get('button[data-qa="pay-button"]').click()

        // Verificar a confirmação da compra
        cy.contains('Congratulations! Your order has been confirmed!').should('be.visible')
    })
})

