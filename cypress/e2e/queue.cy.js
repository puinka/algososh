import { changingState } from "./constants";

const testData = ["1", "2", "3"];

describe("Queue component functions properly", () => {
  const prepareQueue = () => {
    testData.forEach((item) => {
      cy.get("[test-id='input']").type(item);
      cy.get("[test-id='add-button']").click();
    });
  };

  beforeEach(() => {
    cy.visit("/queue");
  });

  it("buttons should be disabled, if the input is empty", () => {
    cy.get("[test-id='form']").within(() => {
      cy.get("[test-id='input']").should("have.value", "");
      cy.get("[test-id='add-button']").should("be.disabled");
    });
  });

  it("adding an element to Queue works correctly", () => {
    cy.get("[test-id='input']").should("have.value", "");

    //step 0
    cy.get("[test-id='input']").type(testData[0]);
    cy.get("[test-id='add-button']").click();
    cy.get("[test-id='circle']").eq(0).contains(testData[0]);
    cy.get("[test-id='circle']")
      .eq(0)
      .should("have.css", "border-color", changingState);
    cy.get("[test-id='circle']").eq(0).prev().contains("head");
    cy.get("[test-id='circle']").eq(0).next().next().contains("tail");

    //step 1
    cy.get("[test-id='input']").type(testData[1]);
    cy.get("[test-id='add-button']").click();
    cy.get("[test-id='circle']").eq(1).contains(testData[1]);
    cy.get("[test-id='circle']")
      .eq(1)
      .should("have.css", "border-color", changingState);
    cy.get("[test-id='circle']").eq(0).prev().contains("head");
    cy.get("[test-id='circle']").eq(1).next().next().contains("tail");

    //step 2
    cy.get("[test-id='input']").type(testData[2]);
    cy.get("[test-id='add-button']").click();
    cy.get("[test-id='circle']").eq(2).contains(testData[2]);
    cy.get("[test-id='circle']")
      .eq(2)
      .should("have.css", "border-color", changingState);
    cy.get("[test-id='circle']").eq(0).prev().contains("head");
    cy.get("[test-id='circle']").eq(2).next().next().contains("tail");
  });

  it("removing an element from the Queue works correctly", () => {
    prepareQueue();

    cy.get("[test-id='remove-button']").click();
    cy.get("[test-id='circle']").eq(1).contains(testData[1]);
    cy.get("[test-id='circle']").eq(1).prev().contains("head");
    cy.get("[test-id='circle']").eq(2).contains(testData[2]);
    cy.get("[test-id='circle']").eq(2).next().next().contains("tail");

    cy.get("[test-id='remove-button']").click();
    cy.get("[test-id='circle']").eq(2).contains(testData[2]);
    cy.get("[test-id='circle']").eq(2).prev().contains("head");
    cy.get("[test-id='circle']").eq(2).next().next().contains("tail");
  });

  it("clearing the Queue works correctly", () => {
    prepareQueue();
    cy.get("[test-id='clear-button']").click();
    cy.get("[test-id='circle']").each(($circle) => {
      cy.get($circle).should("not.have.text");
    });
  });
});
