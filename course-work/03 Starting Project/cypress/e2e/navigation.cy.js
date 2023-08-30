/// <reference types="Cypress" />

describe('page navigation', () => {
  it('should navigate between pages', () => {
    // visit the main page
    cy.visit('http://localhost:5173/');
    // select the data-cy attribute from the devTools and simulate click
    cy.get('[data-cy="header-about-link"]').click();
    // check the current pathname and check that it equals /about as expected
    cy.location('pathname').should('equal', '/about');
    // navigate back in the browser
    cy.go('back');
    // check the current pathname and check it equals / as expected
    cy.location('pathname').should('eq', '/');
    // select the data-cy attribute from devTools and simulate click
    cy.get('[data-cy="header-about-link"]').click();  
    // select the data-cy attribute from devTools and simulate click
    cy.get('[data-cy="header-home-link"]').click();
    // check the current pathname and check it equals / as expected
    cy.location('pathname').should('eq', '/');

  })
})