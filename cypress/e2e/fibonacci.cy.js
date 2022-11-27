import { SHORT_DELAY_IN_MS } from "../../src/constants/delays";

describe('fibonacci page works correctly', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/fibonacci');
    cy.get('button').last().as('startButton');
    cy.get('input').first().as('input');
  });

  it('start button is disabled when input is incorrect or empty', () => {
    cy.get('@startButton').should('be.disabled');

    cy.get('@input').type('5').should('have.value', '5');
    cy.get('@startButton').should('not.be.disabled');

    cy.get('@input').clear();
    cy.get('@startButton').should('be.disabled');

    cy.get('@input').type('string');
    cy.get('@startButton').should('be.disabled');
    cy.get('@input').clear();

    cy.get('@input').type('20');
    cy.get('@startButton').should('be.disabled');
    cy.get('@input').clear();

    cy.get('@input').type('0');
    cy.get('@startButton').should('be.disabled');
  });

  it('algorythm generates correct numbers', () => {
    cy.clock();
    cy.get('@input').type('19');
    cy.get('@startButton').click();
    cy.get('@startButton').should('be.disabled');
    cy.tick(SHORT_DELAY_IN_MS);
    cy.get('[data-cy="circle-0"]').should('contain', '1');
    cy.tick(SHORT_DELAY_IN_MS);
    cy.get('[data-cy="circle-1"]').should('contain', '1');
    cy.tick(SHORT_DELAY_IN_MS);
    cy.get('[data-cy="circle-2"]').should('contain', '2');
    cy.tick(SHORT_DELAY_IN_MS);
    cy.get('[data-cy="circle-3"]').should('contain', '3');
    cy.tick(SHORT_DELAY_IN_MS);
    cy.get('[data-cy="circle-4"]').should('contain', '5');
    cy.tick(SHORT_DELAY_IN_MS);
    cy.get('[data-cy="circle-5"]').should('contain', '8');
    cy.tick(SHORT_DELAY_IN_MS);
    cy.get('[data-cy="circle-6"]').should('contain', '13');
    cy.tick(SHORT_DELAY_IN_MS);
    cy.get('[data-cy="circle-7"]').should('contain', '21');
    cy.tick(SHORT_DELAY_IN_MS);
    cy.get('[data-cy="circle-8"]').should('contain', '34');
    cy.tick(SHORT_DELAY_IN_MS);
    cy.get('[data-cy="circle-9"]').should('contain', '55');
    cy.tick(SHORT_DELAY_IN_MS);
    cy.get('[data-cy="circle-10"]').should('contain', '89');
    cy.tick(SHORT_DELAY_IN_MS);
    cy.get('[data-cy="circle-11"]').should('contain', '144');
    cy.tick(SHORT_DELAY_IN_MS);
    cy.get('[data-cy="circle-12"]').should('contain', '233');
    cy.tick(SHORT_DELAY_IN_MS);
    cy.get('[data-cy="circle-13"]').should('contain', '377');
    cy.tick(SHORT_DELAY_IN_MS);
    cy.get('[data-cy="circle-14"]').should('contain', '610');
    cy.tick(SHORT_DELAY_IN_MS);
    cy.get('[data-cy="circle-15"]').should('contain', '987');
    cy.tick(SHORT_DELAY_IN_MS);
    cy.get('[data-cy="circle-16"]').should('contain', '1597');
    cy.tick(SHORT_DELAY_IN_MS);
    cy.get('[data-cy="circle-17"]').should('contain', '2584');
    cy.tick(SHORT_DELAY_IN_MS);
    cy.get('[data-cy="circle-18"]').should('contain', '4181');
    cy.tick(SHORT_DELAY_IN_MS);
    cy.get('[data-cy="circle-19"]').should('contain', '6765');
    cy.get('@startButton').should('not.be.disabled');
  });
})