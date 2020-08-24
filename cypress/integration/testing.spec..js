describe('Match Functionality Test', () => {
  it('Loads a teams latest match', () => {
    cy.visit('https://louisgreenhall.github.io/MS2/');

    cy.contains("Fremantle Dockers").click();
    cy.url().should('include', '#');
  })

  it('Will load a previous match', () => {

    cy.contains('11 - FRE vs HAW').click();
    cy.contains('7.6.48'); //Fremantle's score for that game
    cy.get('.vsStats').should('be.visible');

  })


  it('Loads a teams latest match', () => {
    cy.visit('https://louisgreenhall.github.io/MS2/');

    cy.contains("Fremantle Dockers").click()
    cy.url().should('include', '#');
  })


  it('will have win probabilities', () => {

    cy.contains('14 - FRE vs GWS').click();
    cy.contains('Win Probability');
    cy.get('.vsStats').should('be.hidden');
  })

  it('Checks fixtures list is populated', () => {
    cy.visit('https://louisgreenhall.github.io/MS2/');

    cy.contains('Geelong Cats').click();
    cy.get('h6').contains("Geelong Cats");
    cy.get('.matches li').should('have.length.of.at.least', 1);
  })

  it('confirms match timeline is populated', () => {

    cy.get('.period-events').should('not.be.empty')
  })

})