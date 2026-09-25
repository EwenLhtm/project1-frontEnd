// Regroupement des tests lies a cette fonctionnalite.
describe('Connexion et Consultation', () => {
    // Preparation ou nettoyage du contexte commun a chaque test.
    beforeEach(() => {
        cy.visit('/login');
    });

    // Verification du scenario et des assertions de ce test.
    it('should go back to the login page when try to access etudiant list page without login', () => {
        cy.visit('/etudiant');
        cy.url().should('include', '/login');
    });

    // Verification du scenario et des assertions de ce test.
    it('should display the login form', () => {
        cy.get('form').should('be.visible');
        cy.get('input[formControlName="login"]').should('be.visible');
        cy.get('input[formControlName="password"]').should('be.visible');
        cy.get('button[type="submit"]').should('be.visible');
    });

    // Verification du scenario et des assertions de ce test.
    it('should login and navigate to etudiant list page', () => {
        cy.get('input[formControlName="login"]').type('test');
        cy.get('input[formControlName="password"]').type('test');
        cy.get('button[type="submit"]').click();

        cy.url().should('include', '/');
    });

    // Verification du scenario et des assertions de ce test.
    it('should display the etudiant list', () => {
        cy.login('test','test');
        cy.visit('/etudiant');
        cy.get('table').should('be.visible');
        cy.get('tbody tr').should('be.visible');
    });
});
