export {};

declare CustomElementType: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'x-combobox': CustomElementType;
      'form-stepper': CustomElementType;
      'form-designer': CustomElementType;
      'form-diagram': CustomElementType;
      'input-mask': CustomElementType;
      'resize-divs': CustomElementType;
      'resize-handle': CustomElementType;
    }
  }
}

