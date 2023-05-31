import morphdom from 'morphdom/dist/morphdom-esm';
import { loadScript, waitFor, addCss, removeCss, fixIndent, debounce, getReactProp } from "./util";

export function customElement(opts: {[key:string]: any}) {
  const reservedProps = [
    'props', 'css', 'tagName',
    'constructorCallback', 'observedAttributes', 'adoptedCallback', 
    'connectedCallback', 'disconnectedCallback', 'attributeChangedCallback', 
  ];

  const shouldUpdateDom = opts.observedAttributes || opts.render || opts.props;

  class PagejsCustomElement extends HTMLElement {
    props = {};
    attrs = {};
    host: HTMLElement | ShadowRoot | undefined;

    static get observedAttributes() {
      return opts.observedAttributes || [];
    }

    constructor() { 
      super();

      this.props = {...opts.props};
      for (let key in this['props']) {  //  getter and setters of all reactive props
        Object.defineProperty(this, key, {
          get() { return this.props[key]; },
          set(value) {
            if (this.props[key] === value) return;
            this.props[key] = value;
            this.#updateDOM.call(this, 'prop-setter'); // react to props change
          }
        });
      }

      opts.constructorCallback?.call(this);
    }
  
    async connectedCallback() {
      if (opts.shadow) {
        this.host = this.attachShadow({ mode: 'open'});
        const template = document.createElement('template')
        template.innerHTML = this.innerHTML; // this should not be in a constructor
        this.host.appendChild(template.content.cloneNode(true));
      } else {
        this.host = this;
      }

      if (!this.isConnected) return; ///  connected(directly or indirectly) to DOM
      if (opts.css) {
        if (opts.shadow) {
          const styleEl = document.createElement('style');
          styleEl.textContent = opts.css;
          this.host.appendChild(styleEl);
        } else {
          addCss(this.tagName, opts.css);
        }
      }
      if (shouldUpdateDom) {
        this.#updateDOM.call(this, 'connectedCallback');
      } else {
        await opts.connectedCallback?.call(this);
      }
    }

    disconnectedCallback() {
      opts.disconnectedCallback?.call(this);
      opts.css && removeCss(this.tagName);
    }

    async attributeChangedCallback(name:string, oldValue:string, newValue:string) {
      if (oldValue !== newValue) {
        opts.attributeChangedCallback?.call(this, name, oldValue, newValue);
        shouldUpdateDom && this.#updateDOM.call(this, 'attributeChangedCallback');
      }
    }

    // called when attribute/props changes and connectedCallback
    #timer: any;
    #updateDOM(caller: string) { 
      clearTimeout(this.#timer);
      // run as debounced since it's called from many places and often
      this.#timer = setTimeout(async () => { 
        if (opts.render) {
          this.attrs = [...this.attributes as any]
            .reduce( (acc, attr) => {
              const attrVar = attr.name.replace(/-([a-z])/g, (m, w) => w.toUpperCase());
              const attrVal = !isNaN(attr.value as any) ? +attr.value : attr.value;
              return { ...acc, [attrVar]: attrVal };
            }, {})

          if (caller === 'connectedCallback') {
            await opts.connectedCallback?.call(this);
          }

          const newHTML = await opts.render.bind(this)({attrs: this.attrs, props: this.props});
          if (typeof newHTML === 'string') {
            const updated = document.createElement('div');
            if (opts.css && opts.shadow) { // when shadow, always render with css
              updated.innerHTML += `<style>${opts.css}</style>`;
            }
            updated.innerHTML += newHTML;
            morphdom( this.host /*fromNode*/, updated /*toNode*/, { childrenOnly: true }); 
          }
        } else if (caller === 'connectedCallback') { // in case !opts.render
          await opts.connectedCallback?.call(this);
        }
      }, 50);
    }
  }

  if (opts.adoptedCallback) {
    (PagejsCustomElement.prototype as any)['adoptedCallback'] = function() {
      opts.adoptedCallback.call(this);
    }
  }

  Object.keys(opts).forEach(key => {
    if ((reservedProps.indexOf(key) === -1) && (opts.props?.[key] === undefined)) {
      (PagejsCustomElement.prototype as any)[key] = opts[key]
    }
  });

  if (opts.tagName && !customElements.get(opts.tagName)) {
    customElements.define(opts.tagName, PagejsCustomElement);
  }

  return PagejsCustomElement;
}