import { ResizeDivs, FormDiagram, FormEditor, FormStepper, InputMask } from '@form-flow/custom-elements/src';
!customElements.get('resize-divs') && customElements.define('resize-divs', ResizeDivs);
!customElements.get('form-diagram') && customElements.define('form-diagram', FormDiagram);

import App from './app.svelte';

const app = new App({target: document.body});
export default app
