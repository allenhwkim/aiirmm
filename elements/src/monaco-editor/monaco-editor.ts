import { customElement, loadScript, waitFor, getReactProp, addCss, removeCss } from '../../lib';

export class MonacoEditor extends HTMLElement {
  value: string = '';
  monacoEditor: any;

  async connectedCallback() {
    addCss(this.tagName, `${this.tagName.toLowerCase()} { display: block;  min-height: 200px;}`)
    await this.loadLibrary();

    this.innerHTML = '';

    // require is provided by loader.min.js.
    (window as any).require.config({ 
      paths: { 
        'vs': 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.39.0/min/vs' 
      }
    });
    (window as any).require(["vs/editor/editor.main"], () => {
      this.monacoEditor = (window as any).monaco.editor.create(this, {
        language: this.getAttribute('language') || 'javascript',
        theme: this.getAttribute('theme')
      });
      this.value = getReactProp(this as any, 'value') || this.value;
      this.setValue(this.value);
      this.monacoEditor.onDidBlurEditorText(() => {
        const editorValue = this.monacoEditor.getValue();
        if (this.value !== editorValue) {
          this.value = editorValue;
          const customEvent = new CustomEvent('monaco-change', {detail: editorValue, bubbles: true});
          this.dispatchEvent( customEvent );
        }
      })
    });
  }

  disconnectedCallback() {
    removeCss(this.tagName);
  }

  getValue(data: string) {
    return this.monacoEditor?.getValue();
  }

  setValue(data: string) {
    this.monacoEditor?.setValue(data);
  }

  async loadLibrary() {
    const el = document.createElement('link');
    el.setAttribute('rel', 'stylesheet');
    el.setAttribute('data-name', 'vs/editor/editor.main');
    el.setAttribute('href', 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.39.0/min/vs/editor/editor.main.min.css');
    loadScript(el, 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.39.0/min/vs/loader.min.js');

    return await waitFor('window.require');
  }

}