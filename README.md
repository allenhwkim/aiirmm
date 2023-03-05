# form-flow

Mono-repo using npm workspaces with the following packages

* **dashboard**: Integrate all functionalities of form flows
  1. Show form diagrams
  2. Edit each form properties
  3. Show form editor
  4. Run(preview) form app.
  5. Handles server-side activity

* **custom-elements**: Collection of custom elements including
  1. form-diagram: Show steps of all forms graphically using Reactflow
  2. form-stepper: Show steps of all forms in HTML

* **forms-controller**: A form application composed with;
  1. form-stepper
  2. form errors section
  3. form section
  4. buttons section(review/next/prev)

* **form-editor**: grapejs form editor with bootstrap5 style
