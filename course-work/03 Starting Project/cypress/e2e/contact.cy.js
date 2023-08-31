/// <reference types="Cypress" />

describe('contact form', () => {
  it('should should submit the form', () => {
    cy.visit('http://localhost:5173/');
    cy.get('[data-cy="header-about-link"]').click();
    cy.get('header.center > h1');
    cy.get('[data-cy="contact-input-message"]').type('this is a test message');
    cy.get('[data-cy="contact-input-name"]').type('Eric Esposito');
    cy.get('[data-cy="contact-btn-submit"]').then((el) => {
      expect(el.attr('disabled')).to.be.undefined;
      expect(el.text()).to.equal('Send Message');
    })
    cy.get('[data-cy="contact-btn-submit"]').should('not.have.attr', 'disabled');
    cy.get('[data-cy="contact-input-email"]').type('eespo93@optonline.net{enter}');
    cy.get('[data-cy="contact-btn-submit"]').as('submitBtn');
    cy.get('@submitBtn').contains('Sending...');
    cy.get('@submitBtn').and('have.attr', 'disabled');
  });

  it('should validate the form input', () => {
    cy.visit('http://localhost:5173/about');
    cy.get('[data-cy="contact-btn-submit"]').click();
    cy.get('[data-cy="contact-btn-submit"]').then(el => {
      expect(el).to.not.have.attr('disabled');
      expect(el.text()).to.not.equal('Sending...')
    });
    cy.get('[data-cy="contact-btn-submit"]').contains('Send Message');
    cy.get('[data-cy="contact-input-message"]').as('msgInput');
    cy.get('@msgInput').blur();
    cy.get('@msgInput').parent().should((el) => {
      expect(el.attr('class')).to.not.be.undefined;
      expect(el.attr('class')).to.contain('invalid');
});
    cy.get('[data-cy="contact-input-name"]').as('nameInput');
    cy.get('@nameInput').focus().blur();
    cy.get('@nameInput').parent().should('have.attr', 'class').and('match', /invalid/);
    cy.get('[data-cy="contact-input-email"]').as('emailInput');
    cy.get('@emailInput').focus().blur();
    cy.get('@emailInput').parent().should('have.attr', 'class').and('match', /invalid/);
  });
});