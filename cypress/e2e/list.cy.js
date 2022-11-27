import { SHORT_DELAY_IN_MS } from "../../src/constants/delays";
import {CHANGING_COLOR, DEFAULT_COLOR, MODIFIED_COLOR} from "../../src/constants/colors";

describe('list page works correctly', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/list');
    cy.contains('Добавить в head').as('addHead');
    cy.contains('Добавить в tail').as('addTail');
    cy.contains('Удалить из head').as('removeHead');
    cy.contains('Удалить из tail').as('removeTail');
    cy.contains('Добавить по индексу').as('addByIndex');
    cy.contains('Удалить по индексу').as('removeByIndex');
    cy.get('input').first().as('inputNumber');
    cy.get('input').last().as('inputIndex');
  });

  it('should have 5 starting elements', () => {
    cy.get('.circle-container').children().should('have.length', 5);
    cy.get('[data-cy="circle-0"]').invoke('text').should((text) => expect(text).not.to.eq(''));
    cy.get('[data-cy="circle-1"]').invoke('text').should((text) => expect(text).not.to.eq(''));
    cy.get('[data-cy="circle-2"]').invoke('text').should((text) => expect(text).not.to.eq(''));
    cy.get('[data-cy="circle-3"]').invoke('text').should((text) => expect(text).not.to.eq(''));
    cy.get('[data-cy="circle-4"]').invoke('text').should((text) => expect(text).not.to.eq(''));
  })

  it('add button is disabled when input is incorrect or empty', () => {
    cy.get('@addHead').should('be.disabled');
    cy.get('@addTail').should('be.disabled');
    cy.get('@addByIndex').should('be.disabled');
    cy.get('@removeByIndex').should('be.disabled');
    cy.get('@removeHead').should('not.be.disabled');
    cy.get('@removeTail').should('not.be.disabled');

    cy.get('@inputNumber').type('5').should('have.value', '5');
    cy.get('@addHead').should('not.be.disabled');
    cy.get('@addTail').should('not.be.disabled');
    cy.get('@addByIndex').should('be.disabled');
    cy.get('@removeByIndex').should('be.disabled');

    cy.get('@inputIndex').type('2').should('have.value', '2');
    cy.get('@addHead').should('not.be.disabled');
    cy.get('@addTail').should('not.be.disabled');
    cy.get('@addByIndex').should('not.be.disabled');
    cy.get('@removeByIndex').should('not.be.disabled');

    cy.get('@inputNumber').clear();
    cy.get('@addHead').should('be.disabled');
    cy.get('@addTail').should('be.disabled');
    cy.get('@addByIndex').should('not.be.disabled');
    cy.get('@removeByIndex').should('not.be.disabled');

    cy.get('@inputIndex').clear();
    cy.get('@addHead').should('be.disabled');
    cy.get('@addTail').should('be.disabled');
    cy.get('@addByIndex').should('be.disabled');
    cy.get('@removeByIndex').should('be.disabled');
  });

  it('limits the input length to 4 characters', () => {
    cy.get('@inputNumber').type('string').should('have.value', 'stri');
    cy.get('@addHead').should('not.be.disabled');
    cy.get('@addTail').should('not.be.disabled');
  })

  it('can add an element to the stack head', () => {
    cy.clock();
    cy.get('@inputNumber').type('1');
    cy.get('@addHead').click();
    cy.tick(SHORT_DELAY_IN_MS);
    cy.get('[data-cy="circle-100"]').should('contain', '1').should('have.css', 'border-color', CHANGING_COLOR);
    cy.get('[data-cy="circle-100"]').should('not.exist');
    cy.debug(cy.get('[data-cy="circle-0"]'))
    cy.get('[data-cy="circle-0"]').should('contain', '1').should('have.css', 'border-color', MODIFIED_COLOR)
      .prev().should('have.text', 'head');
    cy.tick(SHORT_DELAY_IN_MS);
    cy.get('[data-cy="circle-0"]').should('have.css', 'border-color', DEFAULT_COLOR);
    cy.get('@inputNumber').should('have.value', '');
  })

  it('can add an element to the stack tail', () => {
    cy.clock();
    cy.get('@inputNumber').type('1');
    cy.get('@addTail').click();
    cy.tick(SHORT_DELAY_IN_MS);
    cy.get('[data-cy="circle-100"]').should('contain', '1').should('have.css', 'border-color', CHANGING_COLOR);
    cy.get('[data-cy="circle-100"]').should('not.exist');
    cy.get('[data-cy="circle-5"]').should('contain', '1').should('have.css', 'border-color', MODIFIED_COLOR);
    cy.tick(SHORT_DELAY_IN_MS);
    cy.get('[data-cy="circle-5"]').should('have.css', 'border-color', DEFAULT_COLOR).next().next().should('have.text', 'tail');
    cy.get('@inputNumber').should('have.value', '');
  })

  it('remove add an element from the stack head', () => {
    cy.clock();
    let text1 = '';
    let text2 = '';
    cy.get('[data-cy="circle-0"]').should(($text) => text1 = $text.text());
    cy.get('[data-cy="circle-1"]').should(($text) => text2 = $text.text());
    cy.get('@removeHead').click();
    cy.tick(SHORT_DELAY_IN_MS);
    cy.get('[data-cy="circle-100"]').should('have.css', 'border-color', CHANGING_COLOR)
        .invoke('text').should((text) => expect(text).to.eq(text1));
    cy.get('[data-cy="circle-100"]').should('not.exist');
    cy.get('[data-cy="circle-0"]').should('contain', text2).should('have.css', 'border-color', DEFAULT_COLOR)
      .prev().should('have.text', 'head');
    cy.tick(SHORT_DELAY_IN_MS);
  })

  it('remove add an element from the stack tail', () => {
    cy.clock();
    let text1 = '';
    let text2 = '';
    cy.get('[data-cy="circle-4"]').should(($text) => text1 = $text.text());
    cy.get('@removeTail').click();
    cy.tick(SHORT_DELAY_IN_MS);
    cy.get('[data-cy="circle-100"]').should('have.css', 'border-color', CHANGING_COLOR)
      .invoke('text').should((text) => expect(text).to.eq(text1));
    cy.get('[data-cy="circle-100"]').should('not.exist');
    cy.get('[data-cy="circle-3"]')
      .next().next().should('have.text', 'tail');
    cy.tick(SHORT_DELAY_IN_MS);
  })

  it('can add an element to the stack by index', () => {
    let text1 = '';
    let text2 = '';
    cy.get('[data-cy="circle-0"]').should(($text) => text1 = $text.text());
    cy.get('[data-cy="circle-1"]').should(($text) => text2 = $text.text());
    cy.clock();
    cy.get('@inputNumber').type('1');
    cy.get('@inputIndex').type('1');
    cy.get('@addByIndex').click();
    cy.tick(SHORT_DELAY_IN_MS);
    cy.get('[data-cy="circle-100"]').should('contain', '1').should('have.css', 'border-color', CHANGING_COLOR);
    cy.get('[data-cy="circle-0"]').should('have.css', 'border-color', CHANGING_COLOR)
    cy.get('[data-cy="circle-0"]').prev().invoke('text').should((text) => expect(text).to.eq('1'));
    cy.get('[data-cy="circle-0"]').prev().invoke('text').should((text) => expect(text).not.to.eq('1'));
    cy.get('[data-cy="circle-1"]').prev().invoke('text').should((text) => expect(text).to.eq('1'));
    cy.tick(SHORT_DELAY_IN_MS);
    cy.get('[data-cy="circle-1"]').should('contain', '1').should('have.css', 'border-color', MODIFIED_COLOR);
    cy.get('[data-cy="circle-2"]').should('contain', text2).should('have.css', 'border-color', CHANGING_COLOR);
    cy.get('[data-cy="circle-100"]').should('not.exist');
    cy.tick(SHORT_DELAY_IN_MS);
    cy.get('[data-cy="circle-0"]').should('have.css', 'border-color', DEFAULT_COLOR);
    cy.get('[data-cy="circle-1"]').should('have.css', 'border-color', DEFAULT_COLOR);
    cy.get('[data-cy="circle-2"]').should('have.css', 'border-color', DEFAULT_COLOR);
    cy.get('@inputNumber').should('have.value', '');
  })

  it('can add an element to the stack by index', () => {
    let text1 = '';
    cy.get('[data-cy="circle-1"]').should(($text) => text1 = $text.text());
    cy.clock();
    cy.get('@inputIndex').type('1');
    cy.get('@removeByIndex').click();
    cy.tick(SHORT_DELAY_IN_MS);
    cy.get('[data-cy="circle-0"]').should('have.css', 'border-color', CHANGING_COLOR);
    cy.get('[data-cy="circle-1"]').should('have.css', 'border-color', CHANGING_COLOR);
    cy.tick(SHORT_DELAY_IN_MS);
    cy.get('[data-cy="circle-1"]').next().next().should('contain', text1);
    cy.get('[data-cy="circle-100"]').should('contain', text1).should('have.css', 'border-color', CHANGING_COLOR);
    cy.tick(SHORT_DELAY_IN_MS);
    cy.get('[data-cy="circle-100"]').should('not.exist');
    cy.tick(SHORT_DELAY_IN_MS);
    cy.get('[data-cy="circle-0"]').should('have.css', 'border-color', DEFAULT_COLOR);
    cy.get('[data-cy="circle-1"]').should('have.css', 'border-color', DEFAULT_COLOR);
    cy.get('[data-cy="circle-2"]').should('have.css', 'border-color', DEFAULT_COLOR);
    cy.get('@inputIndex').should('have.value', '');
  })

})