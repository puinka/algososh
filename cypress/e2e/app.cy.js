describe("App launched", () => {
  it("App is launching at the base URL", () => {
    cy.visit("/");
    cy.contains("МБОУ АЛГОСОШ");
  });
});
