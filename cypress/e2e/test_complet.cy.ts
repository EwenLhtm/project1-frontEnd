// Inscription → connexion → ajout → consultation → modification → suppression

describe('test du parcours complet', () => {
    beforeEach(() => {
        cy.login('test', 'test');
    });

    it('should display the registration form', () => {
        cy.visit('/register');
        cy.get('form').should('be.visible');
        cy.get('input[formControlName="firstName"]').should('be.visible');
        cy.get('input[formControlName="lastName"]').should('be.visible');
        cy.get('input[formControlName="login"]').should('be.visible');
        cy.get('input[formControlName="password"]').should('be.visible');
        cy.get('button[type="submit"]').should('be.visible');
    });

    it('should display required error when required field is empty wwhen creating a user', () => {
        cy.visit('/register');
        cy.get('button[type="submit"]').click();

        cy.get('input[formControlName="lastName"]')
            .parent()
            .find('.invalid-feedback')
            .should('be.visible')
            .and('contain', 'Last Name is required');
        cy.get('input[formControlName="firstName"]')
            .parent()
            .find('.invalid-feedback')
            .should('be.visible')
            .and('contain', 'First Name is required');
        
        cy.get('input[formControlName="login"]')
            .parent()
            .find('.invalid-feedback')
            .should('be.visible')
            .and('contain', 'Login is required');

        cy.get('input[formControlName="password"]')
            .parent()
            .find('.invalid-feedback')
            .should('be.visible')
            .and('contain', 'password is required');
    });

    it('should reset the registration form when reset button is clicked', () => {
        cy.visit('/register');
        cy.get('input[formControlName="firstName"]').type('John');
        cy.get('input[formControlName="lastName"]').type('Doe');
        cy.get('input[formControlName="login"]').type('johndoe');
        cy.get('input[formControlName="password"]').type('password');

        cy.get('button[type="reset"]').click();

        cy.get('input[formControlName="firstName"]').should('have.value', '');
        cy.get('input[formControlName="lastName"]').should('have.value', '');
        cy.get('input[formControlName="login"]').should('have.value', '');
        cy.get('input[formControlName="password"]').should('have.value', '');
    });

    it('should register a new user and navigate to login page', () => {
        cy.visit('/register');
        // Remplir le formulaire d'inscription
        cy.get('input[formControlName="firstName"]').type('John');
        cy.get('input[formControlName="lastName"]').type('Doe');
        cy.get('input[formControlName="login"]').type('johndoe');
        cy.get('input[formControlName="password"]').type('password');
        cy.get('button[type="submit"]').click();

        //en cas d'erreur, affiche le message d'erreur
        cy.on('window:alert', (str) => {
            expect(str).to.equal(`Registration failed: User with login johndoe already exists`);
        });

        cy.url().should('include', '/login');
    });

    it('should display required error when required field is empty when logging in', () => {
        cy.visit('/login');
        cy.get('button[type="submit"]').click();

        cy.get('input[formControlName="login"]')
            .parent()
            .find('.alert-danger')
            .should('be.visible')
            .and('contain', 'Please enter a valid login.');
        cy.get('input[formControlName="password"]')
            .parent()
            .find('.alert-danger')
            .should('be.visible')
            .and('contain', 'Please enter a valid password.');
    });

    it('should display the login form and login', () => {
        cy.visit('/login');

        // Vérifier que le formulaire de connexion est visible
        cy.get('form').should('be.visible');
        cy.get('input[formControlName="login"]').should('be.visible');
        cy.get('input[formControlName="password"]').should('be.visible');
        cy.get('button[type="submit"]').should('be.visible');

        // Remplir le formulaire de connexion
        cy.get('input[formControlName="login"]').type('johndoe');
        cy.get('input[formControlName="password"]').type('password');

        // tester le reset
        cy.get('button[type="reset"]').click();
        cy.get('input[formControlName="login"]').should('have.value', '');
        cy.get('input[formControlName="password"]').should('have.value', '');

        // Remplir à nouveau le formulaire de connexion
        cy.get('input[formControlName="login"]').type('johndoe');
        cy.get('input[formControlName="password"]').type('password');
        cy.get('button[type="submit"]').click();

        cy.url().should('include', '/');
    });

    it('should display the etudiant list', () => {
        cy.visit('/etudiant');
        cy.get('table').should('be.visible');
        cy.get('tbody tr').should('be.visible');
        cy.get('button[name="createEtudiant"]').should('be.visible');
    });

    it('should display required error when required field is empty when creating an etudiant', () => {
    cy.visit('/etudiant');
    cy.get('button[name="createEtudiant"]').click();

    cy.url().should('include', '/etudiant/create');

    // Remplir aucun champ et soumettre le formulaire
    cy.get('button[type="submit"]').click();

    // Vérifier le message de validation
    cy.get('input[formControlName="lastName"]')
        .parent()
        .find('.invalid-feedback')
        .should('be.visible')
        .and('contain', 'Last Name is required');

    cy.get('input[formControlName="firstName"]')
        .parent()
        .find('.invalid-feedback')
        .should('be.visible')
        .and('contain', 'First Name is required');

    cy.get('input[formControlName="email"]')
        .parent()
        .find('.invalid-feedback')
        .should('be.visible')
        .and('contain', 'Email is required');
    });

    it('should create a new etudiant and view its details', () => {
        cy.visit('/etudiant');
        cy.get('button[name="createEtudiant"]').click();

        cy.url().should('include', '/etudiant/create');
        cy.get('input[formControlName="firstName"]').should('be.visible');
        cy.get('input[formControlName="lastName"]').should('be.visible');
        cy.get('input[formControlName="email"]').should('be.visible');
        cy.get('button[type="submit"]').should('be.visible');

        cy.get('input[formControlName="firstName"]').type('Jane');
        cy.get('input[formControlName="lastName"]').type('Smith');
        cy.get('input[formControlName="email"]').type('jane.smith@example.com');
        cy.get('button[type="submit"]').click();

        cy.url().should('include', '/etudiant');
        cy.get('table').should('be.visible');
        cy.get('tbody tr').contains('Jane').should('be.visible');
        cy.get('tbody tr').contains('Smith').should('be.visible');

        cy.get('tbody tr').contains('Jane').parent('tr').within(() => {
            cy.get('button[name="detailEtudiant"]').click();
        });
        cy.url().should('include', '/etudiant/');
        cy.get('h5').contains('Détails de l\'étudiant').should('be.visible');
        cy.get('td[name="firstName"]').contains('Jane').should('be.visible');
        cy.get('td[name="lastName"]').contains('Smith').should('be.visible');
        cy.get('td[name="email"]').contains('jane.smith@example.com').should('be.visible');
    });

    it('should display required error when required field is empty when updating an etudiant', () => {
        cy.visit('/etudiant');
        cy.get('tbody tr').contains('Jane').parent('tr').within(() => {
            cy.get('button[name="editEtudiant"]').click();
        });

        cy.url().should('include', '/etudiant/update');

        // Vider les champs et soumettre le formulaire
        cy.get('input[formControlName="firstName"]').clear();
        cy.get('input[formControlName="lastName"]').clear();
        cy.get('input[formControlName="email"]').clear();
        cy.get('button[type="submit"]').click();

        // Vérifier le message de validation
        cy.get('input[formControlName="lastName"]')
            .parent()
            .find('.invalid-feedback')
            .should('be.visible')
            .and('contain', 'Last Name is required');

        cy.get('input[formControlName="firstName"]')
            .parent()
            .find('.invalid-feedback')
            .should('be.visible')
            .and('contain', 'First Name is required');

        cy.get('input[formControlName="email"]')
            .parent()
            .find('.invalid-feedback')
            .should('be.visible')
            .and('contain', 'Email is required');
    });

    it('should update the etudiant details', () => {
        cy.visit('/etudiant');
        cy.get('tbody tr').contains('Jane').parent('tr').within(() => {
            cy.get('button[name="editEtudiant"]').click();
        });

        cy.url().should('include', '/etudiant/update');

        cy.get('input[formControlName="firstName"]').clear().type('John');
        cy.get('input[formControlName="lastName"]').clear().type('Doe');
        cy.get('input[formControlName="email"]').clear().type('john.doe@example.com');
        cy.get('button[type="submit"]').click();

        cy.url().should('include', '/etudiant');
        cy.get('tbody tr').contains('John').should('be.visible');
        cy.get('tbody tr').contains('Doe').should('be.visible');
    });

    it('should delete the etudiant', () => {
        cy.visit('/etudiant');
        cy.get('tbody tr').contains('John').parent('tr').within(() => {
            cy.get('button[name="deleteEtudiant"]').click();
        });

        cy.url().should('include', '/etudiant/delete');
        cy.get('td[name="firstName"]').contains('John').should('be.visible');
        cy.get('td[name="lastName"]').contains('Doe').should('be.visible');
        cy.get('td[name="email"]').contains('john.doe@example.com').should('be.visible');

        cy.get('button[name="deleteEtudiant"]').click();

        cy.url().should('include', '/etudiant');
        cy.get('tbody tr').contains('John').should('not.exist');
        cy.get('tbody tr').contains('Doe').should('not.exist');
    });
}); 