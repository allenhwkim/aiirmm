import { addCss, getReactProp, removeCss } from "../../lib";
const css = `
  ul.format-json ul { border-left: 1px dashed black; padding-left: 2rem;  margin-left: -12px;}
  ul.format-json li { cursor: initial; }
  ul.format-json li small { opacity: .7; }
  ul.format-json li:has(> ul.hidden) { list-style: '⊞ ' }
  ul.format-json li:has(> ul) { list-style: '⊟ '; cursor: pointer; }
  ul.format-json li:has(> ul) sup { display: none; }
  ul.format-json li:has(> ul.hidden) sup { display: initial; opacity: .8; }
  ul.format-json.hidden { display: none; }
`;

export class JsonViewer extends HTMLElement {
  static get observedAttributes() { return ['level']; }
  #data = undefined;
  get data() { return this.#data;}
  set data(val) {
    this.#data = val;
    this.render();
  }

  connectedCallback() {
    addCss(this.tagName, css);
    this.#data = getReactProp(this as any, 'data') || this.data;
    this.render();
  }

  disconnectedCallback() {
    removeCss(this.tagName);
  }

  async attributeChangedCallback(name:string, oldValue:string, newValue:string) {
    (oldValue !== newValue) && this.render();
  }

  render() {
    this.innerHTML = '';
    this.writeDOM(this, this.data); // recursively call
  }

  writeDOM(el: HTMLElement, data: any, level=0) {
    const ul = document.createElement('ul');
    const attrLevel = +(this.getAttribute('level') as string);
    ul.classList.add('format-json');
    (level >= attrLevel) && (ul.classList.add('hidden'));

    if (typeof data === 'object') { // array is an object
      for (var key in data) {
        const item = document.createElement('li');
        const li = ul.appendChild(item);
        const values = Object.values(data[key]).filter(el => typeof el == 'string').join(' / ');
        li.innerHTML = `${key} <small>${values}</small>`;

        const toggleList = function(event) {
          const child = event.target.querySelector('ul');
          const action = child?.classList.contains('hidden') ? 'remove' : 'add';
          action && child?.classList[action]('hidden');
          event.stopPropagation();
        }

        li.addEventListener('click', toggleList);
        el.appendChild(ul);

        if (typeof data[key] === 'object') {
          this.writeDOM(li, data[key], ++level);
        } else if (typeof data[key] === 'function') {
          item.innerHTML = `${key}: function`;
        } else {
          item.innerHTML = `${key}: ${data[key]}`;
        }
      }
    }
  }
}