import { ResizeDivs} from '@form-flow/custom-elements/src';
!customElements.get('resize-divs') && customElements.define('resize-divs', ResizeDivs);

import App from './app.svelte';

const app = new App({
  target: document.body,
})

export default app
