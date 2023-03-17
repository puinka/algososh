describe("App routs function properly", () => {
  it("should open start page", () => {
    cy.visit("/");
    cy.contains("МБОУ АЛГОСОШ");
  });

  it("should open String page", () => {
    cy.visit("/recursion");
    cy.contains("Строка");
  });

  it("should open Fibonacci page", () => {
    cy.visit("/fibonacci");
    cy.contains("Последовательность Фибоначчи");
  });

  it("should open Sorting page", () => {
    cy.visit("/sorting");
    cy.contains("Сортировка массива");
  });

  it("should open Stack page", () => {
    cy.visit("/stack");
    cy.contains("Стек");
  });

  it("should open Queue page", () => {
    cy.visit("/queue");
    cy.contains("Очередь");
  });

  it("should open Linked List page", () => {
    cy.visit("/list");
    cy.contains("Связный список");
  });
});
