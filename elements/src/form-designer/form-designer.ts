import  grapesjs from 'grapesjs';
import { customElement, addCss, removeCss } from '../../lib';

import { initGrapesJs } from './init-grapejs';
import themeCSS from './theme.css';
import stylesCSS from './styles.css';
import { FormController } from '../form-stepper/form-controller';

const html = /*html*/`
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
      <div id="gjs"></div>
    </div>
  </div>
`;

export class FormDesigner extends HTMLElement {
  editor: grapesjs.Editor = undefined as any;
  formController: FormController = undefined as any;

  connectedCallback() {
    addCss('form-designer', themeCSS + stylesCSS);

    this.innerHTML = html;
    this.editor = initGrapesJs('#gjs');
    this.editor.Commands.add('set-forms-steps', 
      (_editor, _sendor, opts: any) => {
        const iframe: any = document.querySelector('form-designer iframe');
        const formStepper = iframe.contentWindow.document.querySelector('form-stepper');
        this.formController = formStepper.closest('form-controller');
        this.formController.forms = opts.forms;
        this.formController.steps = opts.steps;
        this.formController.showStep(opts.currentStepId);
      }
    );
  }

  disconnectedCallback() {
    removeCss('form-designer');
  }

  runCommand(command: string, options: any) {
    this.editor.runCommand(command, options); 
  }
  
  on(eventName: grapesjs.GrapesEvent, eventListener: any) {
    this.editor.on(eventName, eventListener);
  }

  /* utility functions */
  getCurrentForm() { return this.formController.currentForm; }
  getHtml() { return this.editor.getHtml(); }
  setStyle(css: string) { this.editor.setStyle(css); }
  setHtml(html: string) { 
    this.editor.setComponents(html); 
    // <form> element is losing its innerHTML by grapesjs, donno why
    const formHTML = html.match(/<form.*?>(.*?)<\/form>/)?.[1] || '';
    if (this.formController) {
      this.formController.getFormEl().innerHTML = formHTML;
    }
  }
}