describe('Connexion et Consultation', () => {
    beforeEach(() => {
        cy.login('test', 'test');
        cy.visit('/login');
    });

    it('should display the login form', () => {
        cy.get('form').should('be.visible');
        cy.get('input[formControlName="login"]').should('be.visible');
        cy.get('input[formControlName="password"]').should('be.visible');
        cy.get('button[type="submit"]').should('be.visible');
    });

    it('should login and navigate to etudiant list page', () => {
        cy.get('input[formControlName="login"]').type('test');
        cy.get('input[formControlName="password"]').type('test');
        cy.get('button[type="submit"]').click();

        cy.url().should('include', '/');
    });

    it('should display the etudiant list', () => {
        cy.visit('/etudiant');
        cy.get('table').should('be.visible');
        cy.get('tbody tr').should('be.visible'); 
    });
});