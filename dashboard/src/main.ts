import { ResizeDivs, FormDiagram, FormDesigner, FormStepper, InputMask, Combobox } from '@formflow/elements/src';

!customElements.get('resize-divs') && customElements.define('resize-divs', ResizeDivs);
!customElements.get('form-diagram') && customElements.define('form-diagram', FormDiagram);
!customElements.get('form-designer') && customElements.define('form-designer', FormDesigner);
!customElements.get('form-stepper') && customElements.define('form-stepper', FormStepper);
!customElements.get('input-mask') && customElements.define('input-mask', InputMask);
!customElements.get('x-combobox') && customElements.define('x-combobox', Combobox);

import App from './app.svelte';

const app = new App({target: document.body});
export default app
