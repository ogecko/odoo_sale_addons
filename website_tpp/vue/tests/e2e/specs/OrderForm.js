// https://docs.cypress.io/api/introduction/api.html

describe('Order Form Integration Tests', () => {
  it('Visits the app root url', () => {
    cy.visit('/')
    cy.contains('h1', 'Harness for Vue in Odoo')
  })
})
