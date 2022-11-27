import { SHORT_DELAY_IN_MS } from "../../src/constants/delays";
import {CHANGING_COLOR, DEFAULT_COLOR, MODIFIED_COLOR} from "../../src/constants/colors";

describe('queue page works correctly', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/queue');
    cy.contains('Добавить').as('add');
    cy.contains('Удалить').as('remove');
    cy.contains('Очистить').as('clear');
    cy.get('input').first().as('input');
  });

  it('add button is disabled when input is incorrect or empty', () => {
    cy.get('@add').should('be.disabled');

    cy.get('@input').type('5').should('have.value', '5');
    cy.get('@add').should('not.be.disabled');

    cy.get('@input').clear();
    cy.get('@add').should('be.disabled');
  });

  it('limits the input length to 4 characters', () => {
    cy.get('@input').type('string').should('have.value', 'stri');
    cy.get('@add').should('not.be.disabled');
  })

  it('can add an element to the stack', () => {
    cy.clock();
    cy.get('@input').type('1');
    cy.get('@add').click();
    cy.tick(SHORT_DELAY_IN_MS);
    cy.get('[data-cy="circle-0"]').should('contain', '1').should('have.css', 'border-color', CHANGING_COLOR)
      .prev().should('have.text', 'head').next().next().next().should('have.text', 'tail');
    cy.tick(SHORT_DELAY_IN_MS);
    cy.get('[data-cy="circle-0"]').should('contain', '1').should('have.css', 'border-color', DEFAULT_COLOR);
    cy.get('@input').should('not.have.value');

    cy.get('@input').type('2');
    cy.get('@add').click();
    cy.tick(SHORT_DELAY_IN_MS);
    cy.get('[data-cy="circle-1"]').should('contain', '2').should('have.css', 'border-color', CHANGING_COLOR)
      .prev().should('not.have.text', 'head').next().next().next().should('have.text', 'tail');
    cy.get('[data-cy="circle-0"]').prev().should('have.text', 'head')
      .next().next().next().should('not.have.text', 'tail');
  })

  it('can remove an element from the stack', () => {
    cy.clock();
    cy.get('@input').type('1');
    cy.get('@add').click();
    cy.tick(SHORT_DELAY_IN_MS);
    cy.get('@input').type('2');
    cy.get('@add').click();
    cy.tick(SHORT_DELAY_IN_MS);
    cy.get('@remove').click();
    cy.get('[data-cy="circle-0"]').should('contain', '1').should('have.css', 'border-color', CHANGING_COLOR);
    cy.tick(SHORT_DELAY_IN_MS);
    cy.get('[data-cy="circle-0"]').should('contain', '').should('have.css', 'border-color', DEFAULT_COLOR)
      .prev().should('not.have.text', 'head');
    cy.get('[data-cy="circle-1"]').should('contain', '2')
      .prev().should('have.text', 'head').next().next().next().should('have.text', 'tail');
  })

  it('clear button clears the stack', () => {
    cy.clock();
    cy.get('@input').type('1');
    cy.get('@add').click();
    cy.tick(SHORT_DELAY_IN_MS);
    cy.get('@input').type('2');
    cy.get('@add').click();
    cy.tick(SHORT_DELAY_IN_MS);

    cy.get('@clear').click();
    cy.get('[data-cy="circle-0"]').should('contain', '');
    cy.get('[data-cy="circle-1"]').should('contain', '');
  })

})