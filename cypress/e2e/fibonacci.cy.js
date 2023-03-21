import { SHORT_DELAY_IN_MS } from "../../src/constants/delays";

const testData = ["1", "1", "2", "3", "5", "8"];

describe("Fibonacci component functions properly", () => {
  beforeEach(() => {
    cy.visit("/fibonacci");
  });

  it("the button should be disabled, if the input is empty", () => {
    cy.get("[test-id='form']").within(() => {
      cy.get("[test-id='input']").should("have.value", "");
      cy.get("[test-id='submit']").should("be.disabled");
    });
  });

  it("fibonacci aimation works correctly", () => {
    cy.get("[test-id='form']").within(() => {
      cy.get("[test-id='input']").type("5");
      cy.get("[test-id='submit']").as("button");
      cy.get("@button").click();
      cy.get("@button").should("be.disabled");
    });

    cy.get("[test-id='circle']").as("circles");

    cy.get("@circles").should("have.length", "1");
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get("@circles").should("have.length", "2");
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get("@circles").should("have.length", "3");
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get("@circles").should("have.length", "4");
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get("@circles").should("have.length", "5");
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get("@circles").should("have.length", "6");

    cy.get("@circles").each(($circle, index) => {
      cy.get($circle).contains(testData[index]);
    });
  });

  afterEach(() => {
    cy.get("[test-id='input']").should("be.empty");
    cy.get("[test-id='submit']").should("be.disabled");
  });
});
