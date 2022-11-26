describe('routing works correctly', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  })

  it('opens string page', () => {
    cy.get('a[href*="/recursion"]').click();
    cy.contains('Строка');
  });

  it('opens fibonacci page', () => {
    cy.get('a[href*="/fibonacci"]').click();
    cy.contains('Последовательность Фибоначчи');
  });

  it('opens sorting page', () => {
    cy.get('a[href*="/sorting"]').click();
    cy.contains('Сортировка массива');
  });

  it('opens stack page', () => {
    cy.get('a[href*="/stack"]').click();
    cy.contains('Стек');
  });

  it('opens queue page', () => {
    cy.get('a[href*="/queue"]').click();
    cy.contains('Очередь');
  });

  it('opens list page', () => {
    cy.get('a[href*="/list"]').click();
    cy.contains('Связанный список');
  });
})