import {
  changingState,
  CIRCLES_SELECTOR,
  defaultState,
  FORM_SELECTOR,
  INPUT_SELECTOR,
  modifiedState,
  SUBMIT_SELECTOR,
} from "./constants";
import { DELAY_IN_MS } from "../../src/constants/delays";

const testData = [
  {
    testString: "1234",
    testStates: [defaultState, defaultState, defaultState, defaultState],
  },
  {
    testString: "1234",
    testStates: [changingState, defaultState, defaultState, changingState],
  },
  {
    testString: "4231",
    testStates: [modifiedState, defaultState, defaultState, modifiedState],
  },
  {
    testString: "4231",
    testStates: [modifiedState, changingState, changingState, modifiedState],
  },
  {
    testString: "4321",
    testStates: [modifiedState, modifiedState, modifiedState, modifiedState],
  },
];

describe("String component functions properly", () => {
  beforeEach(() => {
    cy.visit("/recursion");
  });

  it("the button should be disabled, if the input is empty", () => {
    cy.get(FORM_SELECTOR).within(() => {
      cy.get(INPUT_SELECTOR).should("have.value", "");
      cy.get(SUBMIT_SELECTOR).should("be.disabled");
    });
  });

  it("string reverse aimation works correctly", () => {
    cy.get(FORM_SELECTOR).within(() => {
      cy.get(INPUT_SELECTOR).type("1234");
      cy.get(SUBMIT_SELECTOR).as("button");
      cy.get("@button").click();
      cy.get("@button").should("be.disabled");
    });

    cy.get(CIRCLES_SELECTOR).each(($circle, index) => {
      cy.get($circle).contains(testData[0].testString[index]);
      cy.get($circle).should(
        "have.css",
        "border-color",
        testData[0].testStates[index]
      );
    });

    cy.wait(DELAY_IN_MS);

    cy.get(CIRCLES_SELECTOR).each(($circle, index) => {
      cy.get($circle).contains(testData[1].testString[index]);
      cy.get($circle).should(
        "have.css",
        "border-color",
        testData[1].testStates[index]
      );
    });

    cy.wait(DELAY_IN_MS);

    cy.get(CIRCLES_SELECTOR).each(($circle, index) => {
      cy.get($circle).contains(testData[2].testString[index]);
      cy.get($circle).should(
        "have.css",
        "border-color",
        testData[2].testStates[index]
      );
    });

    cy.wait(DELAY_IN_MS);

    cy.get(CIRCLES_SELECTOR).each(($circle, index) => {
      cy.get($circle).contains(testData[3].testString[index]);
      cy.get($circle).should(
        "have.css",
        "border-color",
        testData[3].testStates[index]
      );
    });

    cy.wait(DELAY_IN_MS);

    cy.get(CIRCLES_SELECTOR).each(($circle, index) => {
      cy.get($circle).contains(testData[4].testString[index]);
      cy.get($circle).should(
        "have.css",
        "border-color",
        testData[4].testStates[index]
      );
    });
  });

  afterEach(() => {
    cy.get(INPUT_SELECTOR).should("be.empty");
    cy.get(SUBMIT_SELECTOR).should("be.disabled");
  });
});
