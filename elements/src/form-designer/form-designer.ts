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
          <form-stepper></form-stepper> 

          <div className="form-flow form-errors error">
            Error goes here
          </div>
          <form className="form-flow">
            Form goes here.
          </form>
          <div className="form-flow form-buttons">
            <button className="form-prev">Prev</button>
            <button className="form-next">Next</button>
            <button className="form-review">Review</button>
            <button className="form-submit">Submit</button>
          </div>
        </div>
      </div>
    </div>`
});

export { FormDesigner };
