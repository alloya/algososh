import { CHANGING_COLOR, DEFAULT_COLOR, MODIFIED_COLOR } from "../../src/constants/colors";
import { getCircle } from "./utils";

describe('string page works correctly', () => {
  beforeEach(() => {
    cy.visit('/recursion');
    cy.get('button').last().as('startButton');
    cy.get('input').first().as('input');
  });

  it('start button is disabled when input is empty', () => {
    cy.get('@startButton').should('be.disabled');

    cy.get('@input').type('string').should('have.value', 'string');
    cy.get('@startButton').should('not.be.disabled');

    cy.get('@input').clear();
    cy.get('@startButton').should('be.disabled');
  });

  it('recursion works correctly', () => {
    cy.get('@input').type('string');
    cy.get('@startButton').click();
    cy.get('@startButton').should('be.disabled');
    cy.get(getCircle(0)).should('contain', 's').should('have.css', 'border-color', DEFAULT_COLOR);
    cy.get(getCircle(1)).should('contain', 't').should('have.css', 'border-color', DEFAULT_COLOR);
    cy.get(getCircle(2)).should('contain', 'r').should('have.css', 'border-color', DEFAULT_COLOR);
    cy.get(getCircle(3)).should('contain', 'i').should('have.css', 'border-color', DEFAULT_COLOR);
    cy.get(getCircle(4)).should('contain', 'n').should('have.css', 'border-color', DEFAULT_COLOR);
    cy.get(getCircle(5)).should('contain', 'g').should('have.css', 'border-color', DEFAULT_COLOR);

    cy.get(getCircle(0)).should('contain', 'g').should('have.css', 'border-color', CHANGING_COLOR);
    cy.get(getCircle(1)).should('contain', 't').should('have.css', 'border-color', DEFAULT_COLOR);
    cy.get(getCircle(2)).should('contain', 'r').should('have.css', 'border-color', DEFAULT_COLOR);
    cy.get(getCircle(3)).should('contain', 'i').should('have.css', 'border-color', DEFAULT_COLOR);
    cy.get(getCircle(4)).should('contain', 'n').should('have.css', 'border-color', DEFAULT_COLOR);
    cy.get(getCircle(5)).should('contain', 's').should('have.css', 'border-color', CHANGING_COLOR);

    cy.get(getCircle(0)).should('contain', 'g').should('have.css', 'border-color', MODIFIED_COLOR);
    cy.get(getCircle(1)).should('contain', 'n').should('have.css', 'border-color', CHANGING_COLOR);
    cy.get(getCircle(2)).should('contain', 'r').should('have.css', 'border-color', DEFAULT_COLOR);
    cy.get(getCircle(3)).should('contain', 'i').should('have.css', 'border-color', DEFAULT_COLOR);
    cy.get(getCircle(4)).should('contain', 't').should('have.css', 'border-color', CHANGING_COLOR);
    cy.get(getCircle(5)).should('contain', 's').should('have.css', 'border-color', MODIFIED_COLOR);

    cy.get(getCircle(0)).should('contain', 'g').should('have.css', 'border-color', MODIFIED_COLOR);
    cy.get(getCircle(1)).should('contain', 'n').should('have.css', 'border-color', MODIFIED_COLOR);
    cy.get(getCircle(2)).should('contain', 'i').should('have.css', 'border-color', CHANGING_COLOR);
    cy.get(getCircle(3)).should('contain', 'r').should('have.css', 'border-color', CHANGING_COLOR);
    cy.get(getCircle(4)).should('contain', 't').should('have.css', 'border-color', MODIFIED_COLOR);
    cy.get(getCircle(5)).should('contain', 's').should('have.css', 'border-color', MODIFIED_COLOR);

    cy.get(getCircle(0)).should('contain', 'g').should('have.css', 'border-color', MODIFIED_COLOR);
    cy.get(getCircle(1)).should('contain', 'n').should('have.css', 'border-color', MODIFIED_COLOR);
    cy.get(getCircle(2)).should('contain', 'i').should('have.css', 'border-color', MODIFIED_COLOR);
    cy.get(getCircle(3)).should('contain', 'r').should('have.css', 'border-color', MODIFIED_COLOR);
    cy.get(getCircle(4)).should('contain', 't').should('have.css', 'border-color', MODIFIED_COLOR);
    cy.get(getCircle(5)).should('contain', 's').should('have.css', 'border-color', MODIFIED_COLOR);
    cy.get('@startButton').should('not.be.disabled');
  })
})