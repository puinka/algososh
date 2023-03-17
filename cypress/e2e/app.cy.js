describe("App launched", () => {
  it("App is launching at http://localhost:3000", () => {
    cy.visit("http://localhost:3000");
  });
});
