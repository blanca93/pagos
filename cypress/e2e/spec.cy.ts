describe('Test del panel de pagos', () => {

  it('Cuando navegamos a la página principal, debe aparecer una tabla con cuatro columnas mostrando la información', () => {
    cy.visit('http://localhost:3000');

    cy.get('[data-cy="links"]').children().first().should('have.text', 'Tabla de pagos')
      .next().should('have.text', 'Añadir un pago')
      .next().should('have.text', 'Ver balance');

    cy.get('[data-cy="panel"]').children().first().should('have.text', 'PERSONA')
      .next().should('have.text', 'IMPORTE')
      .next().should('have.text', 'FECHA')
      .next().should('have.text', 'DESCRIPCIÓN');

  });

  it('Navegamos a la página para añadir un pago, no debe dejar guardar una persona con nombre vacío', () => {
    cy.get('[data-cy="pagolink"]').click();
    cy.url().should('include', 'pago');

    cy.get('[data-cy="newpersonabutton"]').click();
    cy.on('window:alert',(t)=>{
      expect(t).to.contain('Debe introducir un nombre de persona');
   })
  });

  it('Debe dejar guardar una persona nueva', () => {
    cy.get('[data-cy="newpersonainput"]').type('Ana Durán').should('have.value', 'Ana Durán');
    cy.get('[data-cy="newpersonabutton"]').click();

    cy.on('window:alert',(t)=>{
      expect(t).to.contain('Los datos se han guardado correctamente');
    })
  });

  it('No debe dejar guardar un pago si algún campo obligatorio está vacío. Todo vacío', () => {
    cy.get('[data-cy="newpagobutton"]').click();
    cy.on('window:alert',(t)=>{
      expect(t).to.contain('Los campos persona, fecha e importe son obligatorios');
   })
  });

  it('No debe dejar guardar un pago si algún campo obligatorio está vacío. Importe y fecha vacíos', () => {
    cy.get('[data-cy="newpagopersona"]').select('Ana Durán');
    cy.get('[data-cy="newpagobutton"]').click();
    cy.on('window:alert',(t)=>{
      expect(t).to.contain('Los campos persona, fecha e importe son obligatorios');
   })
  });

  it('No debe dejar guardar un pago si algún campo obligatorio está vacío. Fecha vacía', () => {
    cy.get('[data-cy="newpagoimporte"]').clear().type('30').should('have.value', '30');
    cy.get('[data-cy="newpagobutton"]').click();
    cy.on('window:alert',(t)=>{
      expect(t).to.contain('Los campos persona, fecha e importe son obligatorios');
   })
  });

  it('Debe dejar guardar un pago nuevo', () => {
    cy.get('[data-cy="newpagofecha"]').type('2022-10-12T20:17:00').should('have.value', '2022-10-12T20:17');
    cy.get('[data-cy="newpagobutton"]').click();

    cy.on('window:alert',(t)=>{
      expect(t).to.contain('Los datos se han guardado correctamente');
    })
  });

});
