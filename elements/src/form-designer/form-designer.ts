import { customElement } from '../../lib';

import { initGrapesJs } from './init-grapejs';
import themeCSS from './theme.css';
import stylesCSS from './styles.css';

const FormDesigner = customElement({
  css: themeCSS + stylesCSS,
  connectedCallback: function() { // called before the first render()
    setTimeout(function(this: any) { 
      this.editor = initGrapesJs('#gjs');
    }.bind(this)); // so that it's called after render() is called
  },
  render: () => `
    <link rel="stylesheet" href="//unpkg.com/grapesjs/dist/css/grapes.min.css" />

    <div class="panel__top">
      <div class="panel__basic-actions"></div>
      <div class="panel__devices"></div>
    </div>

    <div class="editor-row">
      <div class="side-bar">
        <div class="tabs panel__switcher"></div>
        <div>
          <div class="layers-container"></div>
          <div class="styles-container"></div>
          <div class="traits-container"></div>
          <div class="blocks-container"></div>
        </div>
      </div>

      <div class="editor-canvas">
        <div id="gjs">
          <form-stepper class="pb-4"></form-stepper> 

          <div class="form-flow form-errors error">
          </div>
          <form class="form-flow p-2" style="min-height: 320px">
            Form goes here.
          </form>
          <div class="form-flow form-buttons container">
            <button class="btn btn-primary me-2 form-prev">Prev</button>
            <button class="btn btn-primary me-2 form-next">Next</button>
            <button class="btn btn-primary me-2 form-review">Review</button>
            <button class="btn btn-primary me-2 form-submit">Submit</button>
          </div>
        </div>
      </div>
    </div>`
});

export { FormDesigner };
