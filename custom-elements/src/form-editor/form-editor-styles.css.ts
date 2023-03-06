/*
  +--------------------------------------------+
  |  .panel__top                               |
  +--------------------------------------------+
  +--------------------------------------------+
  |  .editor-row                               | 
  | +-----------+ +--------------------------+ |
  | | .side-bar | | .editor-canvas           | |
  | |           | |                          | |
  | +-----------+ +--------------------------+ |
  +--------------------------------------------+
*/
// extension es6-string-css for vscode
export default /* css */ `
form-editor {
  position: relative;
  display: block;
  min-height: 600px;
  width: 800px;
  margin: 0 auto;
}
form-editor :is(.gjs-category-title, .gjs-layer-title, .gjs-block-category .gjs-title, .gjs-sm-sector-title) {
  padding: 4px;
  font-size: 14px;
}

form-editor .panel__top {
  display: flex;
  width: 100%;
  justify-content: flex-end;
  gap: 2rem;
}

form-editor .panel__top > * {
  position: initial; /* override position: absolute */
  padding: 0 4px; /* override padding: 5px */
}

form-editor .editor-row {
  display: flex;
  justify-content: flex-start;
  align-items: stretch;
  flex-wrap: nowrap;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}

form-editor .editor-row .side-bar {
  flex-basis: 230px;
  border: 2px solid #CCC;
  position: relative;
  overflow-y: auto;
}

form-editor .editor-row .side-bar .gjs-block {
  width: auto;
  height: auto;
  min-height: auto;
  margin: 4px;
  padding: 6px 12px;
}

form-editor .editor-row .side-bar .tabs.panel__switcher {
  position: initial;
  display: flex;
}

form-editor .editor-row .side-bar .tabs.panel__switcher .gjs-pn-buttons {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

form-editor .editor-row .editor-canvas {
  flex-grow: 1;
}

form-editor .editor-row .editor-canvas .gjs-cv-canvas {
  width: 100%;
}
`;