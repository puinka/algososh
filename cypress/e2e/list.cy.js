import { SHORT_DELAY_IN_MS } from "../../src/constants/delays";
import {
  ADD_BY_INDEX_SELECTOR,
  ADD_TO_HEAD_SELECTOR,
  ADD_TO_TAIL_SELECTOR,
  changingState,
  CIRCLES_SELECTOR,
  defaultState,
  FORM_SELECTOR,
  INDEX_INPUT_SELECTOR,
  modifiedState,
  REMOVE_BY_INDEX_SELECTOR,
  SMALL_CIRCLE_SELECTOR,
  VALUE_INPUT_SELECTOR,
} from "./constants";

describe("List component functions properly", () => {
  beforeEach(() => {
    cy.visit("/list");
  });

  it("buttons should be disabled, if inputs are empty", () => {
    cy.get(FORM_SELECTOR).within(() => {
      cy.get(VALUE_INPUT_SELECTOR).should("have.value", "");
      cy.get(INDEX_INPUT_SELECTOR).should("have.value", "");
      cy.get(ADD_TO_HEAD_SELECTOR).should("be.disabled");
      cy.get(ADD_TO_TAIL_SELECTOR).should("be.disabled");
      cy.get(ADD_BY_INDEX_SELECTOR).should("be.disabled");
      cy.get(REMOVE_BY_INDEX_SELECTOR).should("be.disabled");
    });
  });

  it("default list render correctly", () => {
    cy.get(CIRCLES_SELECTOR).should("have.css", "border-color", defaultState);
    cy.get(CIRCLES_SELECTOR).first().prev().contains("head");
    cy.get(CIRCLES_SELECTOR).last().next().next().contains("tail");
  });

  it("adding to head works correctly", () => {
    cy.get(VALUE_INPUT_SELECTOR).type("abc");
    cy.get(ADD_TO_HEAD_SELECTOR).click();
    cy.get(SMALL_CIRCLE_SELECTOR).contains("abc");
    cy.get(SMALL_CIRCLE_SELECTOR).should(
      "have.css",
      "border-color",
      changingState
    );
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get(CIRCLES_SELECTOR)
      .first()
      .should("have.css", "border-color", modifiedState);
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get(CIRCLES_SELECTOR)
      .first()
      .should("have.css", "border-color", defaultState);
  });

  it("adding to tail works correctly", () => {
    cy.get(VALUE_INPUT_SELECTOR).type("xyz");
    cy.get(ADD_TO_TAIL_SELECTOR).click();
    cy.get(SMALL_CIRCLE_SELECTOR).contains("xyz");
    cy.get(SMALL_CIRCLE_SELECTOR).should(
      "have.css",
      "border-color",
      changingState
    );
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get(CIRCLES_SELECTOR)
      .last()
      .should("have.css", "border-color", modifiedState);
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get(CIRCLES_SELECTOR)
      .last()
      .should("have.css", "border-color", defaultState);
  });

  it("adding by index works correctly", () => {
    cy.get(VALUE_INPUT_SELECTOR).type("qwe");
    cy.get(INDEX_INPUT_SELECTOR).type("1");
    cy.get(ADD_BY_INDEX_SELECTOR).click();
    cy.get(SMALL_CIRCLE_SELECTOR).contains("qwe");
    cy.get(SMALL_CIRCLE_SELECTOR).should(
      "have.css",
      "border-color",
      changingState
    );
    cy.wait(SHORT_DELAY_IN_MS);
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get(CIRCLES_SELECTOR).eq(1).contains("qwe");
    cy.get(CIRCLES_SELECTOR)
      .eq(1)
      .should("have.css", "border-color", modifiedState);
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get(CIRCLES_SELECTOR)
      .eq(1)
      .should("have.css", "border-color", defaultState);
  });

  it("removing from the head works correctly", () => {
    cy.get("[test-id='removeFromHead']").click();
    cy.get(CIRCLES_SELECTOR).first().should("not.have.text");
    cy.get(SMALL_CIRCLE_SELECTOR).should(
      "have.css",
      "border-color",
      changingState
    );
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get(CIRCLES_SELECTOR).first().should("not.be.empty");
  });

  it("removing from the tail works correctly", () => {
    cy.get("[test-id='removeFromTail']").click();
    cy.get(CIRCLES_SELECTOR).last().should("not.have.text");
    cy.get(SMALL_CIRCLE_SELECTOR).should(
      "have.css",
      "border-color",
      changingState
    );
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get(CIRCLES_SELECTOR).last().should("not.be.empty");
  });

  it("removing by index works correctly", () => {
    cy.get(INDEX_INPUT_SELECTOR).type("1");
    cy.get(REMOVE_BY_INDEX_SELECTOR).click();
    cy.get(CIRCLES_SELECTOR)
      .eq(0)
      .should("have.css", "border-color", changingState);
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get(CIRCLES_SELECTOR)
      .eq(1)
      .should("have.css", "border-color", changingState);
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get(CIRCLES_SELECTOR).eq(1).should("not.have.text");
    cy.get(SMALL_CIRCLE_SELECTOR).should(
      "have.css",
      "border-color",
      changingState
    );
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get(CIRCLES_SELECTOR).each(($circle) => {
      cy.get($circle).should("have.css", "border-color", defaultState);
    });
  });
});
