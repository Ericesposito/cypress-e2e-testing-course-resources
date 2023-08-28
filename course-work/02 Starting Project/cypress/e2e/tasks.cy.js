/// <reference types="Cypress" />

describe('tasks management', () => {
  it('should open and close the new task modal', () => {
    cy.visit('http://localhost:5173/');
    cy.contains('Add Task').click();
    cy.get('.backdrop').click({ force: true });
    cy.get('.modal').should('not.exist');
    cy.get('.backdrop').should('not.exist');
    
    cy.contains('Add Task').click();
    cy.get('.modal');
    cy.contains('Cancel').click();
    cy.get('.modal').should('not.exist');
    cy.get('.backdrop').should('not.exist');
  });

  it('should create a new task', () => {
    cy.visit('http://localhost:5173/');
    cy.contains('Add Task').click();
    cy.get('#title').type('New Task');
    cy.get('#summary').type('Some description');
    cy.get('.modal').contains('Add Task').click();
    cy.get('.task').should('have.length', 1);
    cy.get('.task h2').contains('New Task');
    cy.get('.task p').contains('Some description');
    cy.get('.backdrop').should('not.exist');
    cy.get('.modal').should('not.exist');
  });

  it('should validate user input', () => {
    cy.visit('http://localhost:5173/');
    cy.contains('Add Task').click();
    cy.get('.modal').contains('Add Task').click();
    cy.contains('Please provide values');
  });

  it('should filter tasks', () => {
    // visit homepage
    cy.visit('http://localhost:5173/');
    // find and click element which contains text 'Add Task'
    cy.contains('Add Task').click();
    // type string 'New Task' into element with id of title
    cy.get('#title').type('New Task');
    // type string 'Some description' into element with id of summary
    cy.get('#summary').type('Some description');
    // select option 'urgent' for element with id of category
    cy.get('#category').select('urgent');
    // find and click element within class modal which contains text 'Add Task'
    cy.get('.modal').contains('Add Task').click();
    // confirm element with class of task has length of 1
    cy.get('.task').should('have.length', 1);
    // confirm element with class of task contains the text 'New Task'
    cy.get('.task').contains('New Task');
    // select option 'moderate' for element with id of filter
    cy.get('#filter').select('moderate');
    // confirm element with class of task has length of 0'
    cy.get('.task').should('have.length', 0);
    // select option 'urgent' for element with id of filter
    cy.get('#filter').select('urgent');
    // confirm element with class of task has length of 1'
    cy.get('.task').should('have.length', 1);
    // select option 'all' for element with id of filter
    cy.get('#filter').select('all');
    // confirm element with class of task has length of 1'
    cy.get('.task').should('have.length', 1);
  });

  it('should add multiple tasks', () => {
    cy.visit('http://localhost:5173/');
    cy.contains('Add Task').click();
    cy.get('#title').type('Task 1');
    cy.get('#summary').type('First task');
    cy.get('.modal').contains('Add Task').click();
    cy.get('.task').should('have.length', 1);
    
    cy.contains('Add Task').click();
    cy.get('#title').type('Task 2');
    cy.get('#summary').type('Second task');
    cy.get('.modal').contains('Add Task').click();
    cy.get('.task').should('have.length', 2);
    cy.get('.task').first().contains('First task');
    cy.get('.task').last().contains('Second task');
  });
});