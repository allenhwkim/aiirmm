# form-flow

Mono-repo using npm workspaces with the following packages

* **dashboard**: Integrate all functionalities of form flows
  * Show form diagrams
  * Edit each form properties
  * Show form editor
  * Run(preview) form app.
  * Handles server-side activity

* **custom-elements**: Collection of custom elements including
  * form-diagram: Show steps of all forms graphically using Reactflow
  * form-stepper: Show steps of all forms in HTML

* **forms-controller**: A form application composed with;
  * form-stepper
  * form errors section
  * form section
  * buttons section(review/next/prev)

* **form-editor**: grapejs form editor with bootstrap5 style
