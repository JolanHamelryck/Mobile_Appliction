describe('Progressive web app setup', () => {
  it('links the manifest and serves every declared install icon', () => {
    cy.request('/manifest.json').then(({ body: manifest }) => {
      expect(manifest.name).to.equal('UCLL tour app');
      expect(manifest.display).to.equal('standalone');
      expect(manifest.icons).to.have.length.greaterThan(0);

      manifest.icons.forEach((icon: { src: string }) => {
        cy.request(icon.src).its('status').should('equal', 200);
      });
    });

    cy.visit('/');
    cy.get('link[rel="manifest"]').should('have.attr', 'href', '/manifest.json');
    cy.request('/').its('body').should('include', 'navigator.serviceWorker.register("/sw.js")');
    cy.request('/sw.js').its('status').should('equal', 200);
  });
});
