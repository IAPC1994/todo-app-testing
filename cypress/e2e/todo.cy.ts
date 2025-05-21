describe("Todo App", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("should add a new task", () => {
    //Add task
    cy.get('[data-testid="todo-input"]').type("Learn Cypress");
    cy.get('[data-testid="add-button"]').click();

    //Task Alias
    cy.contains("Learn Cypress").as("task");

    // Verify the task is displayed
    cy.get("@task").should("exist");

    cy.get("@task")
      .parent()
      .within(() => {
        cy.get('input[type="checkbox"]').check();
        cy.get('input[type="checkbox"]').should("be.checked");
      });

    // Verify task marked as completed
    cy.get("@task").should("have.class", "line-through");

    // Delete the task
    cy.get("@task")
      .parent()
      .within(() => {
        cy.get("button").click();
      });

    cy.get("@task").should("not.exist");
  });
});
