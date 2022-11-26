describe('app loads correctly', () => {
  it('on localhost', () => {
    cy.visit('http://localhost:3000');
    cy.contains('МБОУ АЛГОСОШ');
  })
})