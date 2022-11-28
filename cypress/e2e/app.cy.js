describe('app loads correctly', () => {
  it('on localhost', () => {
    cy.visit('/');
    cy.contains('МБОУ АЛГОСОШ');
  })
})