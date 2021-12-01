describe('Login specs', () => {
  it('visit the login page', () => {
    cy.visit('/');
  });

  it('should name input has the focus when it clicks on it', () => {
    // Arrange

    // Act
    cy.visit('/');
    cy.findByRole('textbox').click();

    // Assert
    cy.findByRole('textbox').should('have.focus');
  });

  it('should show an alert with a message when type invalid credentials', () => {
    // Arrange
    const user = 'admin';
    const password = '1234';
    cy.on('window:alert', cy.stub().as('alertStub'));

    // Act
    cy.visit('/');
    cy.findByRole('textbox').as('userInput');
    cy.findByLabelText('Password').as('passwordInput');
    cy.get('@userInput').type(user);
    cy.get('@passwordInput').type(password);
    cy.findByRole('button').click();

    // Assert
    cy.get('@userInput').should('have.value', user);
    cy.get('@passwordInput').should('have.value', password);
    cy.get('@alertStub').should(
      'have.been.calledWith',
      'invalid credentials, use admin/test, excercise: display a mui snackbar instead of this alert.'
    );
  });

  it('should go to main url using valid credentials', () => {
    // Arrange
    const user = 'admin';
    const password = 'test';
    cy.on('window:alert', cy.stub().as('alertStub'));

    // Act
    cy.visit('/');
    cy.findByRole('textbox').as('userInput');
    cy.findByLabelText('Password').as('passwordInput');
    cy.get('@userInput').type(user);
    cy.get('@passwordInput').type(password);
    cy.findByRole('button').click();

    // Assert
    cy.url().should('eq', 'http://localhost:8080/#/hotel-collection');
  });
});

//1.00
