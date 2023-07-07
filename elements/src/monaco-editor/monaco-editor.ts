import { customElement, loadScript, waitFor, fixIndent, getReactProp } from '../../lib';

export const MonacoEditor = customElement({
  css: `
    :host {
      display: block;
      min-height: 200px;
    }
  `,
  props : { data: {} },
  async connectedCallback() {
    const el = document.createElement('link');
    el.setAttribute('rel', 'stylesheet');
    el.setAttribute('data-name', 'vs/editor/editor.main');
    el.setAttribute('href', 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.39.0/min/vs/editor/editor.main.min.css');
    loadScript(el, 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.39.0/min/vs/loader.min.js');

    await waitFor('window.require');
    const attrPropName = this.getAttribute('data');
    this.data = getReactProp(this as any, 'data') || this.data || globalThis[attrPropName];
    this.innerHTML = '';

    // require is provided by loader.min.js.
    (window as any).require.config({ 
      paths: { 
        'vs': 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.39.0/min/vs' 
      }
    });
    (window as any).require(["vs/editor/editor.main"], () => {
      this.monacoEditor = (window as any).monaco.editor.create(this.host, {
        language: this.getAttribute('language') || 'javascript',
        theme: this.getAttribute('theme')
      });
      this.monacoEditor.setValue(this.data);
      this.monacoEditor.onDidBlurEditorText(() => {
        const updated = this.monacoEditor.getValue();
        if (this.data !== updated) {
          this.data = updated;
          const customEvent = new CustomEvent('monaco-change', {detail: updated, bubbles: true});
          this.dispatchEvent( customEvent );
        }
      })
    });
  },
  render() {
    this.monacoEditor?.setValue(this.data);
  }
});