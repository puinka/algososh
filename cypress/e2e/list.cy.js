import { SHORT_DELAY_IN_MS } from "../../src/constants/delays";
import { changingState, defaultState, modifiedState } from "./constants";

describe("List component functions properly", () => {
  beforeEach(() => {
    cy.visit("/list");
  });

  it("buttons should be disabled, if inputs are empty", () => {
    cy.get("[test-id='form']").within(() => {
      cy.get("[test-id='valueInput']").should("have.value", "");
      cy.get("[test-id='indexInput']").should("have.value", "");
      cy.get("[test-id='addToHead']").should("be.disabled");
      cy.get("[test-id='addToTail']").should("be.disabled");
      cy.get("[test-id='addByIndex']").should("be.disabled");
      cy.get("[test-id='removeByIndex']").should("be.disabled");
    });
  });

  it("default list render correctly", () => {
    cy.get("[test-id='circle']").should(
      "have.css",
      "border-color",
      defaultState
    );
    cy.get("[test-id='circle']").first().prev().contains("head");
    cy.get("[test-id='circle']").last().next().next().contains("tail");
  });

  it("adding to head works correctly", () => {
    cy.get("[test-id='valueInput']").type("abc");
    cy.get("[test-id='addToHead']").click();
    cy.get("[class*='circle_small']").contains("abc");
    cy.get("[class*='circle_small']").should(
      "have.css",
      "border-color",
      changingState
    );
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get("[test-id='circle']")
      .first()
      .should("have.css", "border-color", modifiedState);
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get("[test-id='circle']")
      .first()
      .should("have.css", "border-color", defaultState);
  });

  it("adding to tail works correctly", () => {
    cy.get("[test-id='valueInput']").type("xyz");
    cy.get("[test-id='addToTail']").click();
    cy.get("[class*='circle_small']").contains("xyz");
    cy.get("[class*='circle_small']").should(
      "have.css",
      "border-color",
      changingState
    );
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get("[test-id='circle']")
      .last()
      .should("have.css", "border-color", modifiedState);
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get("[test-id='circle']")
      .last()
      .should("have.css", "border-color", defaultState);
  });

  it("adding by index works correctly", () => {
    cy.get("[test-id='valueInput']").type("qwe");
    cy.get("[test-id='indexInput']").type("1");
    cy.get("[test-id='addByIndex']").click();
    cy.get("[class*='circle_small']").contains("qwe");
    cy.get("[class*='circle_small']").should(
      "have.css",
      "border-color",
      changingState
    );
    cy.wait(SHORT_DELAY_IN_MS);
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get("[test-id='circle']").eq(1).contains("qwe");
    cy.get("[test-id='circle']")
      .eq(1)
      .should("have.css", "border-color", modifiedState);
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get("[test-id='circle']")
      .eq(1)
      .should("have.css", "border-color", defaultState);
  });

  it("removing from the head works correctly", () => {
    cy.get("[test-id='removeFromHead']").click();
    cy.get("[test-id='circle']").first().should("not.have.text");
    cy.get("[class*='circle_small']").should(
      "have.css",
      "border-color",
      changingState
    );
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get("[test-id='circle']").first().should("not.be.empty");
  });

  it("removing from the tail works correctly", () => {
    cy.get("[test-id='removeFromTail']").click();
    cy.get("[test-id='circle']").last().should("not.have.text");
    cy.get("[class*='circle_small']").should(
      "have.css",
      "border-color",
      changingState
    );
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get("[test-id='circle']").last().should("not.be.empty");
  });

  it("removing by index works correctly", () => {
    cy.get("[test-id='indexInput']").type("1");
    cy.get("[test-id='removeByIndex']").click();
    cy.get("[test-id='circle']")
      .eq(0)
      .should("have.css", "border-color", changingState);
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get("[test-id='circle']")
      .eq(1)
      .should("have.css", "border-color", changingState);
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get("[test-id='circle']").eq(1).should("not.have.text");
    cy.get("[class*='circle_small']").should(
      "have.css",
      "border-color",
      changingState
    );
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get("[test-id='circle']").each(($circle) => {
      cy.get($circle).should("have.css", "border-color", defaultState);
    });
  });
});
