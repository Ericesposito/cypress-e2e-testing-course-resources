/// <reference types="Cypress" />

describe('Auth', () => {
  beforeEach(() => {
    cy.task('seedDatabase')
  })
  it('should signup', () => {
    cy.visit('/signup');
    cy.get('[data-cy="auth-email"]').click();
    cy.get('[data-cy="auth-email"]').type('mytest6@test.com');
    cy.get('[data-cy="auth-password"]').type('password1234');
    cy.get('[data-cy="auth-submit"]').click();
    cy.location('pathname').should('eq', '/takeaways');
    cy.url().should('include', 'takeaways');
    cy.getCookie('__session').should('exist');
    cy.getCookie('__session').its('value').should('not.be.empty');
  });
  it('should login properly', () => {
    cy.login();
  });
  it('should logout', () => {
    cy.login();
    
    cy.contains('Logout').click();
    cy.location('pathname').should('eq', '/');
    cy.getCookie('__session').its('value').should('be.empty');
  });
});