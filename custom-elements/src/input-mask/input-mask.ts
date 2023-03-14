import css from './input-mask.css';

function addCss(el: HTMLElement, css: string) {
  const tagName = el.tagName.toLowerCase();
  if (!document.querySelector(`style[${tagName}]`)) {
    const styleEl = document.createElement('style');
    styleEl.setAttribute(tagName,'');
    styleEl.appendChild(document.createTextNode(css));
    document.head.appendChild(styleEl);
  }
}

function removeCss(el: HTMLElement) {
  const tagName = el.tagName.toLowerCase();
  const numXElements = document.body.querySelectorAll(`${tagName}`).length;
  const styleEl = document.querySelector(`style[${tagName}]`);
  (styleEl && numXElements < 1) && document.querySelector(`style[${tagName}]`)?.remove();
}

export class InputMask extends HTMLElement {
  maskAttr: string = ''; // mask attribute value, 'yyyy-mm-dd'
  inputEl: HTMLInputElement = document.createElement('input'); // input element, 2023-12-31
  maskEl: HTMLElement = document.createElement('div');  // mask display element. e.g. yyyy-mm-dd

  static MASK_EXPR =  {
    Y: '[0-9]', 
    M: '[0-9]', 
    D: '[0-9]',
    9: '[0-9]', 
    '#': '[0-9]',
    X: '[a-zA-Z0-9]',
    _: '[0-9]'
  } as {[key:string]: string};

  static format(value: string, mask: string) {
    let formatted = '';
    const valueArr = value.replace(/[^a-zA-Z0-9]/g, '').split('');
    const maskArr = mask.split('');

    let maskChar = maskArr.shift();
    while(maskChar) {
      const maskExpr = InputMask.MASK_EXPR[maskChar.toUpperCase()];

      if (valueArr[0]) {
        if (maskExpr) {
          const reStr = `^${maskExpr}$`; // e.g. `^[0-9]$`;
          if (valueArr[0].match(new RegExp(reStr))) {
            formatted += valueArr.shift();
          }
        } else {
          formatted += maskChar;
        }
      } else {
        break;
      }

      if (!valueArr[0]) break;
      maskChar = maskArr.shift();
    }

    maskChar = maskArr.shift();
    while(maskChar) {
      const maskExpr = InputMask.MASK_EXPR[maskChar.toUpperCase()];
      if (maskExpr) {
        break;
      } else {
        formatted += maskChar;
      }
      maskChar = maskArr.shift();
    }

    return formatted;
  }

  connectedCallback() {
    this.inputEl = this.querySelector('input') as HTMLInputElement;
    this.inputEl.insertAdjacentElement('afterend', this.maskEl);
    this.init();
    addCss(this, css);
  }

  disconnectedCallback() {
    removeCss(this);
  }

  init() {
    this.maskAttr = this.getAttribute('mask') as string;
    if (!this.maskAttr) return;

    const inputElStyle = getComputedStyle(this.inputEl);
    this.maskEl.classList.add('mask');
    this.maskEl.style.fontSize    = inputElStyle.fontSize;
    this.maskEl.style.paddingLeft = inputElStyle.paddingLeft;
    this.maskEl.style.borderWidth = inputElStyle.borderWidth; // border color is transparent
    this.maskEl.style.whiteSpace = 'pre';
    this.maskEl.innerText = this.maskAttr;

    this.inputEl.addEventListener('keydown', this.handleKeyDown.bind(this)); // determint to accept char input or not
    this.inputEl.addEventListener('input', this.setMaskElText.bind(this)); // change maskEl display
    this.inputEl.addEventListener('paste',this.handlePaste.bind(this));
    
    this.inputEl.value = InputMask.format(this.inputEl.value, this.maskAttr);
    this.setMaskElText(); // update mask el text by value of input el
  }

  setMaskElText(event? : any) {
    this.maskEl.innerText = 
      ' '.repeat(this.inputEl.value.length) + this.maskAttr.substring(this.inputEl.value.length);
  }
  
  addNextMask() {
    const maskArr = this.maskAttr.split('');

    setTimeout( () => { // to handle keydown and input event, this performs after input event
      const inputValLen = this.inputEl.value.length;
      for (let i = inputValLen; i < maskArr.length; i++) {
        const nextMask = maskArr[i];
        if (!(nextMask && !InputMask.MASK_EXPR[nextMask.toUpperCase()])) { break; }
        this.inputEl.value += nextMask;
      }
    });
  }

  handlePaste(event: ClipboardEvent) {
    this.inputEl.value = InputMask.format(event.clipboardData?.getData('text') as string, this.maskAttr);
    this.setMaskElText();
    event.preventDefault(); // not to fire another input event
  }

  handleKeyDown(event: any) {
    const inputChar = event.key;
    const matchingMask = this.maskAttr.split('')[this.inputEl.value.length];

    const isCharInput = inputChar.match(/^\S$/);
    const altOrctrlOrMeta = event.altKey || event.ctrlKey || event.metaKey;
    if (isCharInput && !matchingMask) {
      event.preventDefault(); // when too many input, ignore input
    } else if (isCharInput && (event.metaKey || event.ctrlKey)) { // allow copy/paste
      // console.log('.............. meta keydown', event)
    } else if (isCharInput) { // character input
      const reStr = `^${InputMask.MASK_EXPR[matchingMask.toUpperCase()]}$`; // e.g. `^[0-9]$`;
      const isCharAcceptable = inputChar.match(new RegExp(reStr));
      if (isCharAcceptable) {
        this.addNextMask(); //  // if next mask needed, add to input value
      } else {
        event.preventDefault(); // ignore input
      }
    } else { // for special char. e.g. backspace key
      // console.log('space char', {event, inputChar});
    }
  }
}