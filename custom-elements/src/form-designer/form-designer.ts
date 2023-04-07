import { customElement } from '@elements-x/core';
import { initGrapesJs } from './init-grapejs';

import html from './html';
import themeCSS from './theme.css';
import stylesCSS from './styles.css';

const FormDesigner = customElement({
  // await: () => customElement.waitForScriptLoad('document', ['//unpkg.com/grapesjs/dist/css/grapes.min.css']),
  html: html,
  css: themeCSS + stylesCSS,
  props: {},
  events: {},
  attrs: {},
  render: () => {},
  debug: true,
  connectedCallback: () => {
    const FormDesigner = initGrapesJs('#gjs');
  },
  // constructorCallback: () => {},
  // propsChangedCallback: () => {},
  // attributeChangedCallback: () => {},
});

export { FormDesigner };
