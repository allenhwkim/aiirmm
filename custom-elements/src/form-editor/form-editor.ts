import { customElement } from '@elements-x/core';
import { initGrapesJs } from './init-grapejs';

import html from './form-editor.html';
import themeCSS from './form-editor-theme.css';
import stylesCSS from './form-editor-styles.css';

const FormEditor = customElement({
  // await: () => customElement.waitForScriptLoad('document', ['//unpkg.com/grapesjs/dist/css/grapes.min.css']),
  html: html,
  css: themeCSS + stylesCSS,
  props: {},
  events: {},
  attrs: {},
  render: () => {},
  debug: true,
  connectedCallback: () => {
    const formEditor = initGrapesJs('#gjs');
  },
  // constructorCallback: () => {},
  // propsChangedCallback: () => {},
  // attributeChangedCallback: () => {},
});

export { FormEditor };
