describe("Campus tour screens", () => {
  beforeEach(() => {
    cy.viewport(390, 844);
  });

  it("shows the welcome screen and opens the library tour", () => {
    cy.visit("/");

    cy.contains("Welcome to UCLL").should("be.visible");
    cy.get('[data-testid="start-tour-button"]').click();
    cy.contains("Campus tour").should("be.visible");
    cy.get('[role="tab"][aria-selected="true"]').should("contain", "Tour");
    cy.contains("Library").should("be.visible");
    cy.get('[data-testid="tour-next-button"]').click();
    cy.contains("Find your study spot").should("be.visible");
    cy.get('[data-testid="tour-back-button"]').click();
    cy.contains("Library").should("be.visible");
    cy.get('[data-testid="tour-back-button"]').click();
    cy.contains("Welcome to UCLL").should("be.visible");
  });

  it("shows the profile in guest mode", () => {
    cy.visit("/profile");

    cy.contains("Hello, explorer").should("be.visible");
    cy.contains("You’re exploring in guest mode.").should("be.visible");
    cy.get('[data-testid="profile-login-button"]').should("be.visible");
    cy.get('[data-testid="dark-mode-switch"]').should("exist");
  });
});
