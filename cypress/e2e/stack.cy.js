import { SHORT_DELAY_IN_MS } from "../../src/constants/delays";
import {
  ADD_BUTTON_SELECTOR,
  changingState,
  CIRCLES_SELECTOR,
  CLEAR_BUTTON_SELECTOR,
  FORM_SELECTOR,
  INPUT_SELECTOR,
  REMOVE_BUTTON_SELECTOR,
} from "./constants";

const testData = ["1", "2", "3"];

describe("Stack component functions properly", () => {
  const addToStack = (item) => {
    cy.get(INPUT_SELECTOR).type(item);
    cy.get(ADD_BUTTON_SELECTOR).click();
    cy.get(ADD_BUTTON_SELECTOR).should("be.disabled");
    cy.get(CIRCLES_SELECTOR).last().as("lastCircle");
    cy.get("@lastCircle").contains(item);
    cy.get("@lastCircle").should("have.css", "border-color", changingState);
    cy.get("@lastCircle").prev().contains("top");
  };

  beforeEach(() => {
    cy.visit("/stack");
  });

  it("buttons should be disabled, if the input is empty", () => {
    cy.get(FORM_SELECTOR).within(() => {
      cy.get(INPUT_SELECTOR).should("have.value", "");
      cy.get(ADD_BUTTON_SELECTOR).should("be.disabled");
      cy.get(REMOVE_BUTTON_SELECTOR).should("be.disabled");
    });
  });

  it("adding and element to Stack works correctly", () => {
    cy.get(INPUT_SELECTOR).should("have.value", "");
    testData.forEach((item) => addToStack(item));
  });

  it("removing an element from the Stack works correctly", () => {
    cy.get(INPUT_SELECTOR).should("have.value", "");
    testData.forEach((item) => addToStack(item));
    cy.get(REMOVE_BUTTON_SELECTOR).click();
    cy.get(CIRCLES_SELECTOR).should("have.length", testData.length - 1);
    cy.get(CIRCLES_SELECTOR).last().as("lastCircle");
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get("@lastCircle").should("have.css", "border-color", changingState);
    cy.get("@lastCircle").prev().contains("top");
  });

  it("clearing the Stack works correctly", () => {
    cy.get(INPUT_SELECTOR).should("have.value", "");
    testData.forEach((item) => addToStack(item));
    cy.get(CLEAR_BUTTON_SELECTOR).click();
    cy.get(CIRCLES_SELECTOR).should("have.length", 0);
    cy.get(INPUT_SELECTOR).should("have.value", "");
    cy.get(ADD_BUTTON_SELECTOR).should("be.disabled");
    cy.get(REMOVE_BUTTON_SELECTOR).should("be.disabled");
    cy.get(CLEAR_BUTTON_SELECTOR).should("be.disabled");
  });
});
