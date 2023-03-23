import { SHORT_DELAY_IN_MS } from "../../src/constants/delays";
import { changingState } from "./constants";

const testData = ["1", "2", "3"];

describe("Stack component functions properly", () => {
  const addToStack = (item) => {
    cy.get("[test-id='input']").type(item);
    cy.get("[test-id='add-button']").click();
    cy.get("[test-id='add-button']").should("be.disabled");
    cy.get("[test-id='circle']").last().as("lastCircle");
    cy.get("@lastCircle").contains(item);
    cy.get("@lastCircle").should("have.css", "border-color", changingState);
    cy.get("@lastCircle").prev().contains("top");
  };

  beforeEach(() => {
    cy.visit("/stack");
  });

  it("buttons should be disabled, if the input is empty", () => {
    cy.get("[test-id='form']").within(() => {
      cy.get("[test-id='input']").should("have.value", "");
      cy.get("[test-id='add-button']").should("be.disabled");
      cy.get("[test-id='remove-button']").should("be.disabled");
    });
  });

  it("adding and element to Stack works correctly", () => {
    cy.get("[test-id='input']").should("have.value", "");
    testData.forEach((item) => addToStack(item));
  });

  it("removing an element from the Stack works correctly", () => {
    cy.get("[test-id='input']").should("have.value", "");
    testData.forEach((item) => addToStack(item));
    cy.get("[test-id='remove-button']").click();
    cy.get("[test-id='circle']").should("have.length", testData.length - 1);
    cy.get("[test-id='circle']").last().as("lastCircle");
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get("@lastCircle").should("have.css", "border-color", changingState);
    cy.get("@lastCircle").prev().contains("top");
  });

  it("clearing the Stack works correctly", () => {
    cy.get("[test-id='input']").should("have.value", "");
    testData.forEach((item) => addToStack(item));
    cy.get("[test-id='clear-button']").click();
    cy.get("[test-id='circle']").should("have.length", 0);
    cy.get("[test-id='input']").should("have.value", "");
    cy.get("[test-id='add-button']").should("be.disabled");
    cy.get("[test-id='remove-button']").should("be.disabled");
    cy.get("[test-id='clear-button']").should("be.disabled");
  });
});
