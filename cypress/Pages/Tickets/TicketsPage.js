class TicketsPage {

    constructor(){
        this.firstName = "#first-name";
        this.lastName = "#last-name";
        this.email = "#email";
        this.agress = "#agree";
        this.submitButton = "button[type='submit']";
        this.success = ".success"
    }

    get FirstName (){
        return  cy.get(this.firstName);
    }

    get LastName (){
        return  cy.get(this.lastName);
    }

    get Email (){
        return  cy.get(this.email);
    }

    get Agress (){
        return  cy.get(this.agress);
    }

    get SubmitButton (){
        return  cy.get(this.submitButton);
    }

    get Success (){
        return  cy.get(this.success);
    }
}

const ticketsPage = new TicketsPage();
export default ticketsPage;