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

describe("Queue component functions properly", () => {
  const prepareQueue = () => {
    testData.forEach((item) => {
      cy.get(INPUT_SELECTOR).type(item);
      cy.get(ADD_BUTTON_SELECTOR).click();
    });
  };

  beforeEach(() => {
    cy.visit("/queue");
  });

  it("buttons should be disabled, if the input is empty", () => {
    cy.get(FORM_SELECTOR).within(() => {
      cy.get(INPUT_SELECTOR).should("have.value", "");
      cy.get(ADD_BUTTON_SELECTOR).should("be.disabled");
    });
  });

  it("adding an element to Queue works correctly", () => {
    cy.get(INPUT_SELECTOR).should("have.value", "");

    //step 0
    cy.get(INPUT_SELECTOR).type(testData[0]);
    cy.get(ADD_BUTTON_SELECTOR).click();
    cy.get(CIRCLES_SELECTOR).eq(0).contains(testData[0]);
    cy.get(CIRCLES_SELECTOR)
      .eq(0)
      .should("have.css", "border-color", changingState);
    cy.get(CIRCLES_SELECTOR).eq(0).prev().contains("head");
    cy.get(CIRCLES_SELECTOR).eq(0).next().next().contains("tail");

    //step 1
    cy.get(INPUT_SELECTOR).type(testData[1]);
    cy.get(ADD_BUTTON_SELECTOR).click();
    cy.get(CIRCLES_SELECTOR).eq(1).contains(testData[1]);
    cy.get(CIRCLES_SELECTOR)
      .eq(1)
      .should("have.css", "border-color", changingState);
    cy.get(CIRCLES_SELECTOR).eq(0).prev().contains("head");
    cy.get(CIRCLES_SELECTOR).eq(1).next().next().contains("tail");

    //step 2
    cy.get(INPUT_SELECTOR).type(testData[2]);
    cy.get(ADD_BUTTON_SELECTOR).click();
    cy.get(CIRCLES_SELECTOR).eq(2).contains(testData[2]);
    cy.get(CIRCLES_SELECTOR)
      .eq(2)
      .should("have.css", "border-color", changingState);
    cy.get(CIRCLES_SELECTOR).eq(0).prev().contains("head");
    cy.get(CIRCLES_SELECTOR).eq(2).next().next().contains("tail");
  });

  it("removing an element from the Queue works correctly", () => {
    prepareQueue();

    cy.get(REMOVE_BUTTON_SELECTOR).click();
    cy.get(CIRCLES_SELECTOR).eq(1).contains(testData[1]);
    cy.get(CIRCLES_SELECTOR).eq(1).prev().contains("head");
    cy.get(CIRCLES_SELECTOR).eq(2).contains(testData[2]);
    cy.get(CIRCLES_SELECTOR).eq(2).next().next().contains("tail");

    cy.get(REMOVE_BUTTON_SELECTOR).click();
    cy.get(CIRCLES_SELECTOR).eq(2).contains(testData[2]);
    cy.get(CIRCLES_SELECTOR).eq(2).prev().contains("head");
    cy.get(CIRCLES_SELECTOR).eq(2).next().next().contains("tail");
  });

  it("clearing the Queue works correctly", () => {
    prepareQueue();
    cy.get(CLEAR_BUTTON_SELECTOR).click();
    cy.get(CIRCLES_SELECTOR).each(($circle) => {
      cy.get($circle).should("not.have.text");
    });
  });
});
