This application adopts event-driven architecture.
The following events are handled internally

Custom event from custom elements
  * formflow : 
    - fired from `<x-formflow>` custom element
    - Indicates a chart is initialized, a node is selected, or change occurred
    - event.detail : {action, type, node, edge, nodes, edges}
  * monaco-change: 
    - fired from `<x-monaco>` custom element
    - Indicates text value is changed with Monaco editor
    - event.detail: text value of monaco editor

Custom event from this application
  * designer: 
    - fired from `<Chart />`
    - Indicates `<FormDesigner />` needs to take an action with the selected node.
    - event.detail : {chartData, selectedNode}
  * text-editor: 
    - fired from `<Chart />`
    - Indicates `<MonacoEditor />` needs to take an action with data provided
    - event.detail: chart data as an object